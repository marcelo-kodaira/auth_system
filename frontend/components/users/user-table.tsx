"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useUsers } from "@/hooks/api/use-users"
import { useDeleteUser } from "@/hooks/api/use-delete-user"
import type { User } from "@/types/user"
import type { ColumnDef } from "@tanstack/react-table"
import { DeleteUserDialog } from "@/components/users/delete-user-dialog"
import { UserViewDialog } from "@/components/users/user-view-dialog"
import { EmptyState } from "@/components/ui/empty-state"
import { useToast } from "@/hooks/use-toast"

export function UserTable() {
  const { toast } = useToast()
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [userToView, setUserToView] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const { data: users = [], isLoading, error, refetch } = useUsers()

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User deleted successfully",
        className: "bg-gradient-to-r from-green-500 to-teal-500 text-white border-none",
      })
      refetch()
      setIsDeleteDialogOpen(false)
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      })
    },
  })

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id)
    }
  }

  const handleViewUser = (user: User) => {
    setUserToView(user)
    setIsViewDialogOpen(true)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="badge badge-purple">Admin</Badge>
      case "manager":
        return <Badge className="badge badge-teal">Manager</Badge>
      case "user":
        return <Badge className="badge badge-orange">User</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => getRoleBadge(row.getValue("role")),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal"
              onClick={() => handleViewUser(user)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Link href={`/users/${user.id}/edit`}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-brand-purple/30 text-brand-purple hover:bg-brand-purple/10 hover:text-brand-purple"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-500"
              onClick={() => handleDeleteUser(user)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  if (error) {
    return (
      <EmptyState
        icon="alert-triangle"
        title="Error loading users"
        description="Please try again later or contact support"
        actions={
          <Button onClick={() => refetch()} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
            Try Again
          </Button>
        }
        className="border-2 border-red-200 bg-red-50 text-red-800"
      />
    )
  }

  if (users.length === 0 && !isLoading) {
    return (
      <EmptyState
        icon="users"
        title="No users found"
        description="Create your first user to get started"
        actions={
          <Link href="/users/new">
            <Button className="button-primary">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/users/new">
          <Button className="button-primary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchColumn="name"
        searchPlaceholder="Search users..."
        isLoading={isLoading}
      />

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        isPending={isDeleting}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteUser}
        user={userToDelete}
      />

      <UserViewDialog user={userToView} isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} />
    </div>
  )
}

