import { ReactNode } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/supabase"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import CommitTimer from "./commit-timer"

const formSchema = z.object({
  memo: z.string(),
})

export function CommitTimerDialog({
  commit,
  start,
  children,
}: {
  commit: Omit<
    Database["public"]["Tables"]["commits"]["Row"],
    "created_at" | "user_id"
  >
  start: string
  children: ReactNode
}) {
  const supabase = createClientComponentClient<Database>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memo: "",
    },
  })

  const onComplete = async (totalElapsedTime: number) => {
    try {
      const { data, error } = await supabase
        .from("results")
        .insert({
          title: commit.title,
          description: "",
          time: totalElapsedTime,
          start: start,
          end: new Date().toISOString(),
        })
        .select("title")
        .single()

      if (error) throw error
      alert(`${data.title} Done! 💪😤`)
    } catch (error) {
      alert("Error creating the data!")
    }
  }

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // Dialogが開かれた時の処理
      console.log("Dialog opened")
    } else {
      // Dialogが閉じられた時の処理
      console.log("Dialog closed")
      //   onComplete(/* ここに経過時間を入力 */)
    }
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{commit.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex items-center space-x-2">
          <CommitTimer duration={commit.time} onComplete={onComplete} />
        </div>
        <Form {...form}>
          <FormField
            control={form.control}
            name="memo"
            render={({ field }) => (
              <FormItem className="w-full max-w-[300px]">
                <FormLabel>memo</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                {/* <FormDescription>
                    Please enter the time you wish to commit
                  </FormDescription> */}
              </FormItem>
            )}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
}
