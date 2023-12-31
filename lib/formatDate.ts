import { format } from "date-fns-tz"

export const formatDate = (date: Date) => {
  return format(date, "MM/dd", { timeZone: "America/Vancouver" })
}
