"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye, Users, PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useUsers } from "@/hooks/use-users"
import { useDeleteUser } from "@/hooks/use-delete-user"
import type { User } from "@/services/user/types"
import UserViewDialog from "./user-view-dialog"

export default function UserList() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [userToView, setUserToView] = useState<User | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const { data: users, isLoading, error, refetch } = useUsers()
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User deleted successfully",
        className: "bg-gradient-to-r from-green-500 to-teal-500 text-white border-none",
      })
      refetch()
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    },
  })

  useEffect(() => {
    if (users) {
      if (searchQuery.trim() === "") {
        setFilteredUsers(users)
      } else {
        const query = searchQuery.toLowerCase()
        setFilteredUsers(
          users.filter(
            (user) =>
              user.name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query) ||
              user.role.toLowerCase().includes(query),
          ),
        )
      }
    }
  }, [users, searchQuery])

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete)
      setUserToDelete(null)
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

  if (error) {
    return (
      <div className="p-6 border-2 border-red-200 bg-red-50 rounded-xl text-red-800 text-center">
        <p className="font-semibold">Error loading users</p>
        <p className="text-sm mt-2">Please try again later or contact support</p>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="mt-4 border-red-300 text-red-600 hover:bg-red-50"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            className="pl-10 w-full sm:w-[300px] border-2 border-brand-purple/20 focus:border-brand-purple"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="/users/new">
          <Button className="button-primary w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </Link>
      </div>

      <div className="table-custom bg-white dark:bg-gray-800">
        {isLoading ? (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-9 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader className="table-header">
              <TableRow>
                <TableHead className="py-4">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="table-row-alt">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-right">
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
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-500"
                              onClick={() => setUserToDelete(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-2 border-red-200 bg-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user and remove their
                                data from the server.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setUserToDelete(null)} className="button-secondary">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteUser}
                                className="button-danger"
                                disabled={isDeleting}
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-brand-purple" />
                      </div>
                      <p className="font-medium">
                        {searchQuery ? "No users found matching your search" : "No users found"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {searchQuery ? "Try adjusting your search criteria" : "Create your first user to get started"}
                      </p>
                      {!searchQuery && (
                        <Link href="/users/new">
                          <Button className="button-primary mt-2">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add User
                          </Button>
                        </Link>
                      )}
                      {searchQuery && (
                        <Button variant="outline" className="mt-2" onClick={() => setSearchQuery("")}>
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <UserViewDialog user={userToView} isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} />
    </div>
  )
}

