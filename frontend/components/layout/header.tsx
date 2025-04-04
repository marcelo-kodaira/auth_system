import Link from "next/link"
import { UserNav } from "@/components/layout/user-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-purple/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center">
            <span className="text-sm font-bold text-white">UM</span>
          </div>
          <span className="font-bold gradient-heading">User Management</span>
        </Link>
        <UserNav />
      </div>
    </header>
  )
}

