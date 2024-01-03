import Link from "next/link"
import { Session } from "@supabase/auth-helpers-nextjs"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import Avatar from "./ui/avatar"
import { buttonVariants } from "./ui/button"

export function SiteHeader({
  session,
  avatar_url,
}: {
  session: Session | null
  avatar_url: string | null
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session && (
              <Link
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href={"/account"}
              >
                <Avatar url={avatar_url ?? ""} size={avatar_url ? 30 : 20} />
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
