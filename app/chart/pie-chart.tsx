"use client"

import {
  Cell,
  Pie,
  PieChart as PieChartRecharts,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { Card } from "@/components/ui/card"

const colors = [
  "#8884d8",
  "#FA8072",
  "#AF69EE",
  "#3DED97",
  "#3AC7EB",
  "#F9A603",
]
export default function PieChart({
  data,
}: {
  data: { name: string; color: string; value: number }[]
}) {
  return (
    <Card className="h-[400px] w-full p-8">
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
          <Tooltip />
        </PieChartRecharts>
      </ResponsiveContainer>
    </Card>
  )
}
