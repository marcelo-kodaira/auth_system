"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "@/services/api/users"
import { queryKeys } from "@/lib/query-keys"

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: fetchUsers,
  })
}

