import z from "zod";
import { Gender, Role } from "../enums/user.enum";

export const signupSchema = z
  .object({
    first_name: z.string().min(1, { message: "First Name can't be empty" }),
    last_name: z.string().min(1, { message: "Last Name can't be empty" }),
    gender: z.enum(Gender, { message: 'Select a valid gender' }),
    phone: z.string().min(10, { message: 'Enter valid Phone no.' }),
    role: z.enum(Role, { message: 'Select a valid role' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
