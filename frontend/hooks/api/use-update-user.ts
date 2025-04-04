"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "@/services/api/users"
import { queryKeys } from "@/lib/query-keys"
import { useToast } from "@/hooks/use-toast"

interface UpdateUserData {
  id: string
  name: string
  email: string
  role: string
}

interface UseUpdateUserOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

export function useUpdateUser(options: UseUpdateUserOptions = {}) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: UpdateUserData) =>
      updateUser(data.id, {
        name: data.name,
        email: data.email,
        role: data.role,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(data.id) })
      toast({
        title: "Success",
        description: "User updated successfully",
        className: "bg-gradient-to-r from-green-500 to-teal-500 text-white border-none",
      })
      if (options.onSuccess) options.onSuccess()
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      })
      if (options.onError) options.onError(error)
    },
    onSettled: options.onSettled,
  })
}

