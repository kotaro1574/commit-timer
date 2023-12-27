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

export default function CreateCommitForm() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      time: 0,
      color: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const time = values.time * 60

      const { error } = await supabase.from("commits").insert({
        title: values.title,
        description: values.description,
        time,
        color: values.color,
      })

      if (error) throw error
      alert("Commit created!")
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
          {loading ? "loading.." : "Create"}
        </Button>
      </form>
    </Form>
  )
}
