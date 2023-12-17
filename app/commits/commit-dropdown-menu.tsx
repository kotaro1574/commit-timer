"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export function CommitDropdownMenu({ id }: { id: string }) {
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
        <Link href={`/commits/${id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
