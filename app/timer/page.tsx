"use client"

import { useSearchParams } from "next/navigation"

import Timer from "./timer"

export default function TimerPage() {
  const searchParams = useSearchParams()
  const title = searchParams.get("title") || ""
  const duration = Number(searchParams.get("time")) || 0

  return (
    <section className="grid gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Timer
          {title && (
            <span className="mr-2 text-lg text-gray-500">{`（${title}）`}</span>
          )}
        </h1>
        <div className="mx-auto">
          <Timer duration={duration} />
        </div>
      </div>
    </section>
  )
}
