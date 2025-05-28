// components/StatCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  className?: string
}

export function StatCard({ title, value, change, changeType, icon: Icon, className = "" }: StatCardProps) {
  const changeColor =
    changeType === "positive" ? "text-emerald-600" :
    changeType === "negative" ? "text-red-500" : "text-gray-600"

  const iconBgColor =
    changeType === "positive" ? "bg-emerald-100 text-emerald-600" :
    changeType === "negative" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"

  return (
    <Card className={`hover-lift cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</CardTitle>
        <div className={`h-12 w-12 rounded-xl ${iconBgColor} flex items-center justify-center shadow-sm`}>
          <Icon className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold text-gray-900 animate-scale-in">{value}</div>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-medium ${changeColor}`}>
            {changeType === "positive" && "↗"}
            {changeType === "negative" && "↘"}
            {change}
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
