"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/services/user/types"
import { CalendarClock, Mail, UserIcon } from "lucide-react"

interface UserViewDialogProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
}

export default function UserViewDialog({ user, isOpen, onClose }: UserViewDialogProps) {
  if (!user) return null

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-2 border-brand-purple/20">
        <DialogHeader>
          <DialogTitle className="gradient-heading text-xl">User Details</DialogTitle>
          <DialogDescription>Detailed information about the user</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-4 pb-6 border-b">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <div className="mt-2">{getRoleBadge(user.role)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-brand-purple" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-brand-purple" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarClock className="h-5 w-5 text-brand-purple" />
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="button-primary w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

