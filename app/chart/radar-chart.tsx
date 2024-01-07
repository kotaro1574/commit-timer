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

import { Card, CardContent } from "@/components/ui/card"

export default function RadarChart({
  data,
}: {
  data: { name: string; value: number }[]
}) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card>
          <CardContent className="pt-6">
            {payload.map((pld: any, index: number) => (
              <div key={`${pld.dataKey}-${index}`}>
                {pld.payload.name} :
                <span className="ml-4">{pld.value} hours</span>
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
        <RadarChartRecharts
          outerRadius={90}
          width={730}
          height={250}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            name="minutes"
            dataKey="value"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChartRecharts>
      </ResponsiveContainer>
    </Card>
  )
}
