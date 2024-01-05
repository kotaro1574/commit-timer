"use client"

import { startTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/supabase"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

import CommitTimer from "./commit-timer"

const formSchema = z.object({
  description: z.string(),
})
export function CommitTimerForm({
  commit,
  userId,
}: {
  commit: Omit<
    Database["public"]["Tables"]["commits"]["Row"],
    "created_at" | "user_id"
  >
  userId: string
}) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: commit.description ?? "",
    },
  })

  const onComplete = async (totalElapsedTime: number) => {
    try {
      const { error } = await supabase.from("committed-results").insert({
        title: commit.title,
        user_id: userId,
        time: totalElapsedTime,
        commit_id: commit.id,
        created_at: new Date().toLocaleString("en-US", {
          timeZone: "America/Vancouver",
          timeZoneName: "short",
        }),
      })

      if (error) throw error

      toast({ description: `${commit.title} Done! 💪😤` })

      router.push("/commits")
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      toast({ variant: "destructive", description: "Error creating the data!" })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="max-w-[700px] text-lg text-muted-foreground">
        {commit.title}
      </p>
      <div className="flex items-center space-x-2">
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
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
}
