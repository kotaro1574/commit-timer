import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

import AreaChart from "./area-chart"
import BarChart from "./bar-chart"
import LineChart from "./line-chart"
import PieChart from "./pie-chart"
import RadarChart from "./radar-chart"

export default async function ChartPage() {
  // const supabase = createServerComponentClient<Database>({ cookies })

  // const { data, error, status } = await supabase.from("results").select("*")

  // if (!data) return null

  // if (error && status !== 406) {
  //   throw error
  // }

  return (
    <section className="grid gap-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Chart
        </h1>
      </div>
      <AreaChart />
      <div className="flex gap-6">
        <PieChart />
        <RadarChart />
      </div>
      <BarChart />
      <LineChart />
    </section>
  )
}
