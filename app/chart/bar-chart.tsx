"use client"

import {
  Bar,
  BarChart as BarChartRecharts,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card } from "@/components/ui/card"

const data = [
  {
    name: "Jan",
    high: 4000,
    low: 2400,
  },
  {
    name: "Feb",
    high: 5000,
    low: 1500,
  },
  {
    name: "Mar",
    high: 6000,
    low: 3000,
  },
  {
    name: "Apr",
    high: 6500,
    low: 4500,
  },
  {
    name: "May",
    high: 7000,
    low: 2200,
  },
  {
    name: "Jun",
    high: 8000,
    low: 3500,
  },
  {
    name: "Jul",
    high: 7400,
    low: 5500,
  },
]
export default function BarChart() {
  return (
    <Card className="h-[400px] p-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChartRecharts width={730} height={250} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="high" fill="#82ca9d" />
          <Bar dataKey="low" fill="#FA8072" />
        </BarChartRecharts>
      </ResponsiveContainer>
    </Card>
  )
}
