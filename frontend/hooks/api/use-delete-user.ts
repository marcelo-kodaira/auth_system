"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/services/api/users"
import { queryKeys } from "@/lib/query-keys"

interface UseDeleteUserOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

export function useDeleteUser(options: UseDeleteUserOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      if (options.onSuccess) options.onSuccess()
    },
    onError: (error: Error) => {
      if (options.onError) options.onError(error)
    },
    onSettled: options.onSettled,
  })
}

