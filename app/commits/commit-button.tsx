"use client"

import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function CommitButton({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Button className="rounded-r-none">{children}</Button>
      <Button size="icon" className="w-6 rounded-l-none border-l-0">
        <Icons.more className="h-4 w-4" />
      </Button>
    </div>
  )
}
