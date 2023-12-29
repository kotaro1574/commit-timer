"use client"

import { startTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { HexColorPicker } from "react-colorful"
import { Controller, useForm } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  time: z.coerce.number(),
  color: z.string(),
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
      description: commit.description ?? "",
      time: commit.time / 60,
      color: commit.color,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const commits = await supabase
        .from("commits")
        .update({
          title: values.title,
          description: values.description,
          time: values.time * 60,
          color: values.color,
        })
        .eq("id", commit.id)

      if (commits.error) throw commits.error

      const committedResults = await supabase
        .from("committed-results")
        .update({ title: values.title })
        .eq("commit_id", commit.id)

      if (committedResults.error) throw committedResults.error

      alert("Commit updated!")
      setLoading(false)
      router.push("/commits")
      startTransition(() => {
        router.refresh()
      })
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"time (minutes)"}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please enter the time you wish to commit
              </FormDescription>
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="color"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>color</FormLabel>
              <HexColorPicker color={value} onChange={onChange} />
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
