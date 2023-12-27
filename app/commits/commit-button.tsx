import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"

import { CommitDropdownMenu } from "./commit-dropdown-menu"
import { CommitTimerDialog } from "./commit-timer-dialog"

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
      <CommitTimerDialog commit={commit}>
        <Button
          style={{ backgroundColor: commit.color }}
          className="rounded-r-none"
        >
          {commit.title}
        </Button>
      </CommitTimerDialog>
      <CommitDropdownMenu commit={commit} />
    </div>
  )
}
