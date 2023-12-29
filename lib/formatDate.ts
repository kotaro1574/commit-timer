import { format as _format } from "date-fns"

//形式が増えたら追記する
type Format = "MM/dd"

export const formatDate = (date: Date, format: Format) => {
  return _format(date, format)
}
