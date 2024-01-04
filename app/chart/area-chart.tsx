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

type Props = {
  data: {
    day: string
    [key: string]: number | string
  }[]
  colors: {
    id: string
    name: string
    color: string
  }[]
}

export default function AreaChart({ data, colors }: Props) {
  return (
    <Card className="h-[330px] w-full p-4 sm:h-[400px] md:p-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChartRecharts
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {colors.map((color) => (
              <linearGradient
                key={color.id}
                id={color.id}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          {colors.map((color) => (
            <Area
              key={color.id}
              type="monotone"
              dataKey={color.name}
              stroke={color.color}
              fillOpacity={1}
              fill={`url(#${color.id})`}
            />
          ))}
        </AreaChartRecharts>
      </ResponsiveContainer>
    </Card>
  )
}
