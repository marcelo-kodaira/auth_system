"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "@/services/user/api"
import { queryKeys } from "@/lib/query-keys"
import type { UpdateUserRequest } from "@/services/user/types"
import { useToast } from "@/hooks/use-toast"

interface UseUpdateUserOptions {
  onSuccess?: () => void
  onError?: () => void
  onSettled?: () => void
}

export function useUpdateUser(options: UseUpdateUserOptions = {}) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateUser(data),
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
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
      if (options.onError) options.onError()
    },
    onSettled: options.onSettled,
  })
}

