"use client"

import Link from "next/link"
import { Session } from "@supabase/auth-helpers-nextjs"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import Avatar from "./ui/avatar"
import { Button, buttonVariants } from "./ui/button"

export function SiteDrawer({
  session,
  items,
  avatar_url,
}: {
  session: Session | null
  avatar_url: string | null
  items?: NavItem[]
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Icons.menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <nav className="flex items-center justify-center space-x-1">
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
        </DrawerHeader>
        <div className="px-4 pb-4">
          {items?.length ? (
            <nav className="flex flex-col items-center justify-center space-y-4">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
