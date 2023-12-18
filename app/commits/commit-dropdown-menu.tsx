"use client"

import { startTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export function CommitDropdownMenu({ id }: { id: string }) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const onDelete = async () => {
    try {
      alert("Delete commit?")
      const { error } = await supabase.from("commits").delete().eq("id", id)

      if (error) throw error

      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      alert("Error updating the data!")
    }
  }

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
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
