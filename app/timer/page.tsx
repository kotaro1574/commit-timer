"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { FormProvider } from "react-hook-form"
import { z } from "zod"

import Timer from "./timer"
import TimerForm from "./timer-form"
import { useCreateResultForm } from "./useCreateResult"

const formSchema = z.object({
  title: z.string(),
  time: z.coerce.number(),
  description: z.string(),
})

export default function TimerPage() {
  const [isStart, setIsStart] = useState(false)
  const searchParams = useSearchParams()
  const title = searchParams.get("title")
  const time = Number(searchParams.get("time"))
  const form = useCreateResultForm({ title, time })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {}

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
          {`Jot down what you're committing to and kick off the timer!`}
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
            <div className="mx-auto">
              <Timer duration={time} />
            </div>
          )}
        </FormProvider>
      </div>
    </section>
  )
}
