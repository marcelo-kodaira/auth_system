"use client"

import { UserForm } from "@/components/users/user-form"
import { PageHeader } from "@/components/layout/page-header"
import { useParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/hooks/api/use-user"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EmptyState } from "@/components/ui/empty-state"

export default function EditUserPage() {
  const { id } = useParams()
  const userId = Array.isArray(id) ? id[0] : id

  const { data: user, isLoading, error } = useUser(userId)

  return (
    <div className="container mx-auto py-10 space-y-8">
      <PageHeader title="Edit User" backHref="/users" />

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-brand-purple/20 p-6 md:p-8 shadow-lg">
        {isLoading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        ) : error ? (
          <EmptyState
            icon="alert-triangle"
            title="Error loading user"
            description="User not found or could not be loaded"
            actions={
              <Link href="/users">
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  Back to Users
                </Button>
              </Link>
            }
            className="border-2 border-red-200 bg-red-50 text-red-800"
          />
        ) : (
          <UserForm user={user} />
        )}
      </div>
    </div>
  )
}

