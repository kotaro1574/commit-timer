"use client"

import { ReactNode } from "react"

import { Button } from "@/components/ui/button"

import { CommitDropdownMenu } from "./commit-dropdown-menu"

export function CommitButton({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) {
  return (
    <div className="flex">
      <Button className="rounded-r-none">{children}</Button>
      <CommitDropdownMenu id={id} />
    </div>
  )
}
