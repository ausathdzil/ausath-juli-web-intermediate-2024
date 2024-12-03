'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
  UpdatePasswordFormSchema,
  UpdatePasswordFormState,
  UpdateProfileFormSchema,
  UpdateProfileFormState,
} from '@/lib/definitions/auth';
import { createSession, deleteSession } from '@/lib/session';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await db
    .select({ id: users.id, password: users.password })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return {
      message: 'Invalid email or password.',
    };
  }

  const { id, password: hashedPassword } = user[0];

  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    return {
      message: 'Invalid email or password.',
    };
  }

  await createSession(id);

  redirect('/profile');
}

export async function signup(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  const data = await db
    .insert(users)
    .values({
      name: name,
      email: email,
      password: hashedPassword,
    })
    .returning({ id: users.id });

  const user = data[0];

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  await createSession(user.id);

  redirect('/profile');
}

export async function logout() {
  deleteSession();
  redirect('/login');
}

export async function updateProfile(
  userId: string,
  state: UpdateProfileFormState,
  formData: FormData
) {
  const validatedFields = UpdateProfileFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email } = validatedFields.data;

  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length > 0 && user[0].id !== userId) {
    return {
      message: 'Email is already in use.',
    };
  }

  await db
    .update(users)
    .set({ name: name, email: email })
    .where(eq(users.id, userId));

  revalidatePath('/profile');

  return {
    message: 'Profile updated successfully.',
  };
}

export async function updatePassword(
  userId: string,
  state: UpdatePasswordFormState,
  formData: FormData
) {
  const validatedFields = UpdatePasswordFormSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const user = await db
    .select({ password: users.password })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (user.length === 0) {
    return {
      message: 'An error occurred while updating your password.',
    };
  }

  const { password: hashedPassword } = user[0];

  const isPasswordValid = await bcrypt.compare(currentPassword, hashedPassword);

  if (!isPasswordValid) {
    return {
      errors: {
        currentPassword: ['Incorrect password.'],
      },
    };
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ password: newHashedPassword })
    .where(eq(users.id, userId));

  return {
    message: 'Password updated successfully.',
  };
}
