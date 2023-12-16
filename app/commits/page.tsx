import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default async function CommitsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const user = session.user

  const { data, error, status } = await supabase
    .from("commits")
    .select(`title, time`)
    .eq("user_id", user.id)

  if (!data) return null

  if (error && status !== 406) {
    throw error
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Commits
          </h1>
          <Link href={"/"} className={buttonVariants({ variant: "ghost" })}>
            <Icons.plus className="mr-2 h-4 w-4" />
            new commit
          </Link>
        </div>
        <div className="flex gap-4">
          {data.map((commit) => (
            <div className="flex flex-col items-start gap-2">
              <Button>{commit.title}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
