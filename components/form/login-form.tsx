"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email(),
})

const errorSchema = z.object({
  message: z.string(),
})

export default function LoginForm() {
  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL ?? "",
        },
      })

      console.log({ data, error })

      if (error) {
        throw error
      }

      toast({ description: "Check your email for the magic link 📩" })
    } catch (error) {
      const parseError = errorSchema.parse(error)
      toast({
        variant: "destructive",
        description: parseError.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder={"your email address"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="block w-full" type="submit">
          {loading ? "loading.." : "Login"}
        </Button>
      </form>
    </Form>
  )
}
