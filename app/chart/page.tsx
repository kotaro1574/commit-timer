"use client"

import AreaChart from "./area-chart"
import BarChart from "./bar-chart"

export default function ChartPage() {
  return (
    <section className="grid gap-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Chart
        </h1>
      </div>
      <AreaChart />
      <BarChart />
    </section>
  )
}
