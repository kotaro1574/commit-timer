"use client"

import { Session } from "inspector"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
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

import Avatar from "./avatar"

const formSchema = z.object({
  full_name: z.string(),
  username: z.string(),
  website: z.string(),
  avatar_url: z.string(),
  email: z.string().email(),
})

type Props = {
  user: User
  profile: Database["public"]["Tables"]["profiles"]["Row"]
}

export default function AccountForm({ profile, user }: Props) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      full_name: profile.full_name || "",
      username: profile.username || "",
      website: profile.website || "",
      avatar_url: profile.avatar_url || "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async ({
    full_name,
    username,
    website,
    avatar_url,
  }: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert("Profile updated!")
      setLoading(false)
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
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="avatar_url">Avatar</FormLabel>
              <FormControl>
                <Avatar
                  uid={user.id}
                  url={field.value}
                  size={150}
                  onUpload={(url) => {
                    form.setValue("avatar_url", url)
                    onSubmit(form.getValues())
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="full_name">Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="website">Website</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="block w-full"
          disabled={loading || !form.formState.isValid}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </form>
    </Form>
  )
}
