import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import { CommitTimerForm } from "./commit-timer-form"

export default async function CommitTimerPage({
  params,
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  const { data, error, status } = await supabase
    .from("commits")
    .select("id, title, time, description, color")
    .eq("id", params.id)
    .single()

  if (!data) return null

  if (error && status !== 406) {
    throw error
  }

  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Commit Timer
      </h1>
      <CommitTimerForm commit={data} userId={user?.id ?? ""} />
    </section>
  )
}
