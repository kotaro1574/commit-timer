"use client"

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
import { Textarea } from "@/components/ui/textarea"

import { useCreateResultFormContext } from "./useCreateResult"

export default function TimerForm({ onStart }: { onStart: () => void }) {
  const form = useCreateResultFormContext()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onStart)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>time</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please enter the time you wish to commit
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              {/* <FormDescription>
                Please enter the time you wish to commit
              </FormDescription> */}
            </FormItem>
          )}
        />
        <Button className="block w-full" type="submit">
          Start Timer
        </Button>
      </form>
    </Form>
  )
}
