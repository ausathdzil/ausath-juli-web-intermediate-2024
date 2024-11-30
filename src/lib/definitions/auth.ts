import { z } from 'zod';

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(1, { message: 'Please enter your password.' })
    .trim(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[A-Z]/, { message: 'Contain at least one uppercase letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
