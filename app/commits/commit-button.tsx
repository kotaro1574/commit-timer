"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"

import { CommitDropdownMenu } from "./commit-dropdown-menu"

export function CommitButton({
  commit,
}: {
  commit: Omit<
    Database["public"]["Tables"]["commits"]["Row"],
    "created_at" | "user_id"
  >
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const queryString = () => {
    const params = new URLSearchParams(searchParams)

    Object.entries(commit).forEach(([key, value]) => {
      params.set(key, String(value))
    })

    return params.toString()
  }

  const onClick = () => {
    router.push(`/timer?${queryString()}`)
  }

  return (
    <div className="flex">
      <Button onClick={onClick} className="rounded-r-none">
        {commit.title}
      </Button>
      <CommitDropdownMenu id={commit.id} />
    </div>
  )
}
