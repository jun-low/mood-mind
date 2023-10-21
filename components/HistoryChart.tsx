'use client'
import { Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis } from 'recharts'
import React from 'react'

const CustomTooltip = ({ payload, label, active }: TooltipProps<number, string>) => {
  const dateLabel: string = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active && payload) {
    const analysis = payload[0].payload
    return (
      <div
        className="py-4 px-6 custom-tooltip bg-white/5 shadow-sm border border-black/10 rounded-lg backdrop-blur-sm">
        <div className="absolute right-2 top-2 w-2 h-2 rounded-full" style={ { borderColor: analysis.color } }></div>
        <p className="label text-sm text-neutral-900/30">{ dateLabel }</p>
        <p className="intro text-md uppercase">{ analysis.mood }</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={ 300 } height={ 100 } data={ data }>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={ 2 }
          activeDot={ { r: 8 } }
        />
        <XAxis dataKey="updatedAt"/>
        <Tooltip content={ <CustomTooltip /> }/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
