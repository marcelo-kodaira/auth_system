"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"
import type { User } from "@/types/user"

interface DeleteUserDialogProps {
  isOpen: boolean
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
  user: User | null
}

export function DeleteUserDialog({ isOpen, isPending, onClose, onConfirm, user }: DeleteUserDialogProps) {
  if (!user) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="border-2 border-red-200 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Delete User: {user.name}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user and remove their data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose()} className="button-secondary" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="button-danger" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

