import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"

import AccountForm from "./account-form"

export default async function AccountPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const user = session.user

  const { data, error, status } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", user.id)
    .single()

  if (!data) return null

  if (error && status !== 406) {
    throw error
  }

  console.log({ data, user })

  return (
    <div>
      <AccountForm user={user} profile={data} />
      <div className="mt-8">
        <form action="/auth/signout" method="post">
          <Button className="button block" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  )
}
