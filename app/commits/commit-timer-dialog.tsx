"use client"

import { ReactNode, startTransition, useState } from "react"
import { useRouter } from "next/navigation"
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
  description: z.string(),
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
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: commit.description ?? "",
    },
  })

  const onComplete = async (totalElapsedTime: number) => {
    try {
      const { error } = await supabase
        .from("commits")
        .update({
          description: form.getValues("description"),
          commit_time: commit.commit_time
            ? commit.commit_time + totalElapsedTime
            : totalElapsedTime,
        })
        .eq("id", commit.id)

      if (error) throw error
      alert(`${commit.title} Done! 💪😤`)
      setOpen(false)
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      alert("Error updating the data!")
    }
  }

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(isOpen)
    } else {
      const confirmEnd = window.confirm(
        "Are you sure you want to end the timer?"
      )
      if (confirmEnd) {
        setOpen(isOpen)
        // onComplete(commit.time)
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
          <CommitTimer commit={commit} onComplete={onComplete} />
        </div>
        <Form {...form}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>description</FormLabel>
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
