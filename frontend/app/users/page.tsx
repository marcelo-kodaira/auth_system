"use client"

import { PageHeader } from "@/components/layout/page-header"
import { UserTable } from "@/components/users/user-table"

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <PageHeader title="User Management" description="View and manage all users in your system" backHref="/" />

      <UserTable />
    </div>
  )
}

