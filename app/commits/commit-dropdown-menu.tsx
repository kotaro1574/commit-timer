"use client"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export function CommitDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${buttonVariants({
          variant: "default",
          size: "icon",
        })} w-6 rounded-l-none border-l-0`}
      >
        <Icons.more className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
