import { z } from "zod"

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.string().min(1, { message: "Please select a role" }),
})

export type UserFormValues = z.infer<typeof userSchema>

export const userProfileSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  bio: z.string().optional(),
})

export type UserProfileFormValues = z.infer<typeof userProfileSchema>

