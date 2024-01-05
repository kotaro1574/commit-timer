import Link from "next/link"

import { Database } from "@/types/supabase"
import { buttonVariants } from "@/components/ui/button"

import { CommitDropdownMenu } from "./commit-dropdown-menu"

export function CommitButton({
  commit,
}: {
  commit: Omit<
    Database["public"]["Tables"]["commits"]["Row"],
    "created_at" | "user_id"
  >
}) {
  return (
    <div className="flex">
      <Link
        href={`/commits/${commit.id}/timer`}
        style={{ backgroundColor: commit.color }}
        className={`${buttonVariants({ variant: "default" })} rounded-r-none`}
      >
        {commit.title}
      </Link>
      <CommitDropdownMenu commit={commit} />
    </div>
  )
}
