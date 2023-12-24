"use client"

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RadarChartRecharts,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { Card } from "@/components/ui/card"

const data = [
  {
    day: "Monday",
    amount: 500,
  },
  {
    day: "Tuesday",
    amount: 300,
  },
  {
    day: "Wednesday",
    amount: 240,
  },
  {
    day: "Thursday",
    amount: 230,
  },
  {
    day: "Friday",
    amount: 150,
  },
  {
    day: "Saturday",
    amount: 300,
  },
]
export default function RadarChart() {
  return (
    <Card className="h-[400px] w-full p-8">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChartRecharts
          outerRadius={90}
          width={730}
          height={250}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="day" />
          <Radar
            name="Orders"
            dataKey="amount"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip />
        </RadarChartRecharts>
      </ResponsiveContainer>
    </Card>
  )
}
