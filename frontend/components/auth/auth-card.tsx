import type { ReactNode } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AuthCardProps {
  title: string
  description?: string
  footer?: ReactNode
  children: ReactNode
  className?: string
}

export function AuthCard({ title, description, footer, children, className }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 py-12 px-4 sm:px-6 lg:px-8">
      <Card className={cn("w-full max-w-md border-2 border-brand-purple/20 shadow-xl", className)}>
        <CardHeader className="space-y-1">
          <Link href="/" className="mx-auto mb-4 block">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center">
                <span className="text-xl font-bold text-white">UM</span>
              </div>
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold text-center gradient-heading">{title}</CardTitle>
          {description && <CardDescription className="text-center">{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter className="flex justify-center border-t pt-6">{footer}</CardFooter>}
      </Card>
    </div>
  )
}

