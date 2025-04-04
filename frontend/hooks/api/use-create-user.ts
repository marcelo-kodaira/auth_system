"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser } from "@/services/api/users"
import { queryKeys } from "@/lib/query-keys"
import type { UserFormValues } from "@/lib/validations/user"
import { useToast } from "@/hooks/use-toast"

interface UseCreateUserOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

export function useCreateUser(options: UseCreateUserOptions = {}) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: UserFormValues) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      toast({
        title: "Success",
        description: "User created successfully",
        className: "bg-gradient-to-r from-green-500 to-teal-500 text-white border-none",
      })
      if (options.onSuccess) options.onSuccess()
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      })
      if (options.onError) options.onError(error)
    },
    onSettled: options.onSettled,
  })
}

