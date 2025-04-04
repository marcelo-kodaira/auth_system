import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
}

export function PageHeader({ title, description, backHref }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {backHref && (
          <Link href={backHref}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-2 border-brand-purple/20 hover:bg-brand-purple/10"
            >
              <ArrowLeft className="h-5 w-5 text-brand-purple" />
            </Button>
          </Link>
        )}
        <h1 className="text-3xl md:text-4xl font-bold gradient-heading">{title}</h1>
      </div>
      {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
    </div>
  )
}

