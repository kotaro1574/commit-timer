import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

export default async function CommitPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error, status } = await supabase
    .from("commits")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!data) return null

  if (error && status !== 406) {
    throw error
  }

  return (
    <section className="grid gap-6">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Edit Commits
        </h1>
      </div>
      <div className="flex gap-4">{data.title}</div>
    </section>
  )
}
