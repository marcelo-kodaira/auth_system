"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "@/services/user/api"
import { queryKeys } from "@/lib/query-keys"

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => fetchUser(id),
    enabled: !!id,
  })
}

