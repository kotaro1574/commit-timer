import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { CommitButton } from "./commit-button"

export default async function CommitsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error, status } = await supabase
    .from("commits")
    .select("id, title, time")

  if (!data) return null

  if (error && status !== 406) {
    throw error
  }

  return (
    <section className="grid gap-6">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Commits
        </h1>
        <Link
          href={"/commits/create"}
          className={buttonVariants({ variant: "ghost" })}
        >
          <Icons.plus className="mr-2 h-4 w-4" />
          new commit
        </Link>
      </div>
      <div className="flex gap-4">
        {data.length !== 0 ? (
          data.map((commit) => (
            <div className="flex flex-col items-start gap-2">
              <CommitButton commit={commit} />
            </div>
          ))
        ) : (
          <div className="mx-auto">
            <p className="text-lg text-gray-600">
              No commits found. Start by creating your first commit!
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                className={buttonVariants({ variant: "default" })}
                href={"/commits/create"}
              >
                Create Your First Commit
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
