"use client"

import {
  Area,
  AreaChart as AreaChartRecharts,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card } from "@/components/ui/card"

const data = [
  { week: "Mon", Iphone: 4000, Samsung: 2400 },
  { week: "Tue", Iphone: 3000, Samsung: 1398 },
  { week: "Wed", Iphone: 2000, Samsung: 9800 },
  { week: "Thu", Iphone: 2780, Samsung: 3908 },
  { week: "Fri", Iphone: 1890, Samsung: 4800 },
  { week: "Sat", Iphone: 2390, Samsung: 3800 },
  { week: "Sun", Iphone: 3490, Samsung: 4300 },
]
export default function AreaChart() {
  return (
    <Card className="h-[400px] w-full p-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChartRecharts
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Iphone"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="Samsung"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChartRecharts>
      </ResponsiveContainer>
    </Card>
  )
}
