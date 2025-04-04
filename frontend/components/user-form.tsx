"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save, X } from "lucide-react"
import { useCreateUser } from "@/hooks/use-create-user"
import { useUpdateUser } from "@/hooks/use-update-user"
import type { User, CreateUserRequest, UpdateUserRequest } from "@/services/user/types"

const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.string().min(1, { message: "Please select a role" }),
})

type UserFormValues = z.infer<typeof userSchema>

interface UserFormProps {
  user?: User
}

export default function UserForm({ user }: UserFormProps = {}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
        }
      : {
          name: "",
          email: "",
          role: "",
        },
  })

  const { mutate: createUser } = useCreateUser({
    onSuccess: () => {
      router.push("/users")
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const { mutate: updateUser } = useUpdateUser({
    onSuccess: () => {
      router.push("/users")
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  function onSubmit(data: UserFormValues) {
    setIsSubmitting(true)

    if (user) {
      const updateData: UpdateUserRequest = {
        id: user.id,
        ...data,
      }
      updateUser(updateData)
    } else {
      const createData: CreateUserRequest = data
      createUser(createData)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-purple font-medium">Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="input-custom" />
                </FormControl>
                <FormDescription className="text-xs">
                  The user's full name as it will appear in the system.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-purple font-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" type="email" {...field} className="input-custom" />
                </FormControl>
                <FormDescription className="text-xs">
                  The user's email address for login and notifications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-brand-purple font-medium">Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="input-custom">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin" className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-brand-purple mr-2"></span>
                    Admin
                  </SelectItem>
                  <SelectItem value="manager" className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-brand-teal mr-2"></span>
                    Manager
                  </SelectItem>
                  <SelectItem value="user" className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-brand-orange mr-2"></span>
                    User
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                The user's role determines their permissions in the system.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting} className="button-primary">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isSubmitting && <Save className="mr-2 h-4 w-4" />}
            {user ? "Update User" : "Create User"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/users")}
            disabled={isSubmitting}
            className="button-secondary"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

