"use client"

import {
  Cell,
  Pie,
  PieChart as PieChartRecharts,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { Card, CardContent } from "@/components/ui/card"

export default function PieChart({
  data,
}: {
  data: { name: string; color: string; value: number }[]
}) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card>
          <CardContent className="pt-6">
            {payload.map((pld: any, index: number) => (
              <div key={`${pld.dataKey}-${index}`} style={{ color: pld.color }}>
                {pld.name} :<span className="ml-4">{pld.value} hours</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <Card className="h-[330px] w-full p-4 sm:h-[400px] md:p-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChartRecharts width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChartRecharts>
      </ResponsiveContainer>
    </Card>
  )
}
