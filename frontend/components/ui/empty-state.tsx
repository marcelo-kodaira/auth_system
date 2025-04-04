import type React from "react"
import { AlertTriangle, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  actions?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, actions, className }: EmptyStateProps) {
  const getIcon = (): React.ReactNode => {
    switch (icon) {
      case "alert-triangle":
        return <AlertTriangle className="h-12 w-12 text-red-500" />
      case "users":
        return <Users className="h-12 w-12 text-brand-purple" />
      default:
        return null
    }
  }

  return (
    <div className={cn("p-6 rounded-xl text-center flex flex-col items-center gap-4", className)}>
      <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center">{getIcon()}</div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  )
}

