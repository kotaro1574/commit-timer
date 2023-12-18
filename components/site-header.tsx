import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import Avatar from "./ui/avatar"

export async function SiteHeader() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
    )

  const user = session.user

  const { data, error, status } = await supabase
    .from("profiles")
    .select(`full_name, username, website, avatar_url`)
    .eq("id", user.id)
    .single()

  if (error && status !== 406) {
    throw error
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href={"/account"}>
              <Avatar url={data?.avatar_url ?? ""} size={35} />
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
