"use client"

import {
  Area,
  AreaChart as AreaChartRecharts,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card>
          <CardHeader>
            <CardTitle> {label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {payload.map((pld: any, index: number) => (
                <div
                  key={`${label}-${pld.dataKey}-${index}`}
                  style={{ color: pld.color }}
                >
                  {pld.dataKey} :
                  <span className="ml-4">{pld.value} minutes</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

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
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
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
