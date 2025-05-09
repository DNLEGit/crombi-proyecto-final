import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })    
    .trim(),
})

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Use a valid email" }).trim(),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 characters" })
    .regex(/[a-zA-Z]/, { message: "Must have at least one letter" })
    .regex(/[0-9]/, { message: "Must have at least one number." })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined