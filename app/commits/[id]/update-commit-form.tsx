"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  title: z.string(),
  time: z.coerce.number(),
})

export default function UpdateCommitForm({
  commit,
}: {
  commit: Omit<
    Database["public"]["Tables"]["commits"]["Row"],
    "user_id" | "created_at"
  >
}) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: commit.title,
      time: commit.time,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const { error } = await supabase
        .from("commits")
        .update({
          title: values.title,
          time: values.time,
        })
        .eq("id", commit.id)

      if (error) throw error
      alert("Commit updated!")
      setLoading(false)
      router.push("/commits")
    } catch (error) {
      alert("Error updating the data!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>time</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please enter the time you wish to commit
              </FormDescription>
            </FormItem>
          )}
        />
        <Button className="block w-full" type="submit">
          {loading ? "loading.." : "Update"}
        </Button>
      </form>
    </Form>
  )
}
