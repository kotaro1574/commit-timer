"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { FormProvider } from "react-hook-form"
import { z } from "zod"

import Timer from "./timer"
import TimerForm from "./timer-form"
import { useCreateResultForm } from "./useCreateResult"

export default function TimerPage() {
  const searchParams = useSearchParams()
  const title = searchParams.get("title")
  const time = Number(searchParams.get("time"))
  const [isStart, setIsStart] = useState(false)
  const form = useCreateResultForm({ title, time })

  const isNew = !title || !time

  return (
    <section className="grid gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Timer
          {title && (
            <span className="mr-2 text-lg text-gray-500">{`（${title}）`}</span>
          )}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {isNew
            ? `Pop in what you're committing to and let's get that timer rolling!`
            : `Let's keep the ${title} vibes strong today!`}
        </p>
        <FormProvider {...form}>
          {!isStart ? (
            <div className="w-full">
              <TimerForm
                onStart={() => {
                  setIsStart(true)
                }}
              />
            </div>
          ) : (
            <div className="mx-auto mt-10">
              <Timer duration={time} onComplete={() => {}} />
            </div>
          )}
        </FormProvider>
      </div>
    </section>
  )
}
