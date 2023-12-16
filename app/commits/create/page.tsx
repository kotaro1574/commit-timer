import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import CreateCommitForm from "./create-commit-form"

export default async function CommitCreatePage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const user = session.user
  return (
    <section>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        New Commit
      </h1>
      <CreateCommitForm user={user} />
    </section>
  )
}
