import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z.string(),
  time: z.coerce.number(),
  description: z.string(),
  start: z.string(),
})

export type CreateResultInput = z.infer<typeof formSchema>

type Params = {
  title: string | null
  time: number | null
}

export const useCreateResultForm = ({ title, time }: Params) => {
  return useForm<CreateResultInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? "",
      time: time ?? 0,
      description: "",
      start: "",
    },
  })
}

export const useCreateResultFormContext = () => {
  return useFormContext<CreateResultInput>()
}
