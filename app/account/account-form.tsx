"use client"

import { startTransition, useState } from "react"
import { useRouter } from "next/navigation"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import AvatarUploader from "./avatar-uploader"

const formSchema = z.object({
  username: z.string(),
  avatar_url: z.string(),
  email: z.string().email(),
})

type Props = {
  user: User
  profile: Omit<
    Database["public"]["Tables"]["profiles"]["Row"],
    "updated_at" | "id"
  >
}

export default function AccountForm({ profile, user }: Props) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      username: profile.username || "",
      avatar_url: profile.avatar_url || "",
    },
  })

  const onSubmit = async ({
    username,
    avatar_url,
  }: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,

        username,

        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast({ description: "Profile updated!" })
      setLoading(false)
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      toast({ variant: "destructive", description: "Error updating the data!" })
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
                <AvatarUploader
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
              {form.formState.errors.email && (
                <FormDescription>
                  {form.formState.errors.email.message}
                </FormDescription>
              )}
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
        <Button type="submit" className="block w-full" disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </Button>
      </form>
    </Form>
  )
}
