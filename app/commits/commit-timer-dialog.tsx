"use client"

import { ReactNode, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/supabase"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import CommitTimer from "./commit-timer"

const formSchema = z.object({
  memo: z.string(),
})

export function CommitTimerDialog({
  commit,
  children,
}: {
  commit: Omit<
    Database["public"]["Tables"]["commits"]["Row"],
    "created_at" | "user_id"
  >
  children: ReactNode
}) {
  const [isOpen, setOpen] = useState(false)
  const supabase = createClientComponentClient<Database>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memo: "",
    },
  })

  const start = new Date().toLocaleString()

  const onComplete = async (totalElapsedTime: number) => {
    try {
      const { data, error } = await supabase
        .from("results")
        .insert({
          title: commit.title,
          description: form.getValues("memo"),
          time: totalElapsedTime,
          start: start,
          end: new Date().toLocaleString(),
        })
        .select("title")
        .single()

      if (error) throw error
      alert(`${data.title} Done! 💪😤`)
      setOpen(false)
    } catch (error) {
      alert("Error creating the data!")
    }
  }

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(isOpen)
      console.log("Dialog opened")
    } else {
      const confirmEnd = window.confirm(
        "Are you sure you want to end the timer?"
      )
      if (confirmEnd) {
        onComplete(commit.time)
      }
    }
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{commit.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex items-center space-x-2">
          <CommitTimer duration={commit.time} onComplete={onComplete} />
        </div>
        <Form {...form}>
          <FormField
            control={form.control}
            name="memo"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>memo</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                {/* <FormDescription>
                    Please enter the time you wish to commit
                  </FormDescription> */}
              </FormItem>
            )}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
}