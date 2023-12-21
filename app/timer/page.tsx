"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { FormProvider } from "react-hook-form"

import { Database } from "@/types/supabase"

import Timer from "./timer"
import TimerForm from "./timer-form"
import { useCreateResultForm } from "./useCreateResult"

export default function TimerPage() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isStart, setIsStart] = useState(false)
  const form = useCreateResultForm({
    title: searchParams.get("title"),
    time: Number(searchParams.get("time")),
  })

  const onComplete = async (totalElapsedTime: number) => {
    try {
      const { error } = await supabase.from("results").insert({
        title: form.getValues("title"),
        description: form.getValues("description"),
        time: totalElapsedTime,
        start: form.getValues("start"),
        end: new Date().toISOString(),
      })

      if (error) throw error
      alert(`Done!`)

      router.push("/commits")
    } catch (error) {
      alert("Error updating the data!")
    }
  }

  return (
    <section className="grid gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Timer
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {!isStart
            ? `Pop in what you're committing to and let's get that timer rolling!`
            : `Let's keep the ${form.getValues("title")} vibes strong today!`}
        </p>
        <FormProvider {...form}>
          {!isStart ? (
            <div className="w-full">
              <TimerForm
                onStart={() => {
                  setIsStart(true)
                  form.setValue("start", new Date().toISOString())
                }}
              />
            </div>
          ) : (
            <div className="mx-auto mt-10">
              <Timer
                duration={Number(form.getValues("time"))}
                onComplete={onComplete}
              />
            </div>
          )}
        </FormProvider>
      </div>
    </section>
  )
}
