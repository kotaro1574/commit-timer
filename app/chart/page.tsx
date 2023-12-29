import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { formatDate } from "@/lib/formatDate"

import AreaChart from "./area-chart"
import PieChart from "./pie-chart"
import RadarChart from "./radar-chart"

export default async function ChartPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const today = new Date()
  const lastWeek = new Date(today)
  lastWeek.setDate(today.getDate() - 6)

  const { data: commits } = await supabase
    .from("commits")
    .select("title, created_at, color")
  if (!commits) return null

  const { data: committedResults } = await supabase
    .from("committed-results")
    .select("*")

  if (!committedResults) return null

  const filteredResults = committedResults.filter((result) => {
    const createdAtDate = new Date(result.created_at)
    return createdAtDate >= lastWeek
  })

  const getLastWeekDates = (): {
    day: string
  }[] => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date()
      date.setDate(today.getDate() - (6 - index))
      return { day: formatDate(date, "MM/dd") }
    })
  }

  const areaChartData = commits.reduce((acc, cur) => {
    return acc.map((data) => ({
      ...data,
      [cur.title]: Math.round(
        filteredResults.reduce((_acc, _cur) => {
          if (
            formatDate(new Date(_cur.created_at), "MM/dd") === data.day &&
            _cur.title === cur.title
          ) {
            return _acc + _cur.time
          }
          return _acc
        }, 0) / 60
      ),
    }))
  }, getLastWeekDates())

  const areaChartColors = commits.map((commit, index) => {
    return {
      id: `color-${index}`,
      name: commit.title,
      color: commit.color,
    }
  })

  const chartData = commits.map((commit) => {
    return {
      name: commit.title,
      color: commit.color,
      value: Math.round(
        committedResults.reduce((acc, cur) => {
          if (cur.title === commit.title) {
            return acc + cur.time
          }
          return acc
        }, 0) / 60
      ),
    }
  })

  return (
    <section className="grid gap-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Chart
        </h1>
      </div>
      <AreaChart data={areaChartData} colors={areaChartColors} />
      <div className="flex gap-6">
        <PieChart data={chartData} />
        <RadarChart data={chartData} />
      </div>
      {/* <BarChart />
      <LineChart /> */}
    </section>
  )
}
