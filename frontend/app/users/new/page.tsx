"use client"

import { UserForm } from "@/components/users/user-form"
import { PageHeader } from "@/components/layout/page-header"

export default function NewUserPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <PageHeader title="Create New User" backHref="/users" />

      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-brand-purple/20 p-6 md:p-8 shadow-lg">
        <UserForm />
      </div>
    </div>
  )
}

