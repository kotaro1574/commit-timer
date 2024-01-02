"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useTheme } from "next-themes"

import { Database } from "@/types/supabase"

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()
  const { theme } = useTheme()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme={theme === "light" ? "default" : "dark"}
      showLinks={false}
      providers={[]}
      redirectTo={process.env.NEXT_PUBLIC_REDIRECT_URL ?? ""}
    />
  )
}
