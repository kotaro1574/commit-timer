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
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export function CommitDropdownMenu({
  commit,
}: {
  commit: Pick<Database["public"]["Tables"]["commits"]["Row"], "id" | "color">
}) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()

  const onDelete = async () => {
    try {
      const confirmEnd = window.confirm(
        "Do you really want to delete the commit?"
      )
      if (confirmEnd) {
        const { error } = await supabase
          .from("commits")
          .delete()
          .eq("id", commit.id)

        if (error) throw error

        toast({ description: "Commit deleted!" })
        startTransition(() => {
          router.refresh()
        })
      }
    } catch (error) {
      toast({ variant: "destructive", description: "Error updating the data!" })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${buttonVariants({
          variant: "default",
          size: "icon",
        })} w-6 rounded-l-none border-l-0`}
        style={{ backgroundColor: commit.color }}
      >
        <Icons.more className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/commits/${commit.id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
