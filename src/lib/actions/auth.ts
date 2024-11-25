'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
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
      message: 'An account with this email already exists.',
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
