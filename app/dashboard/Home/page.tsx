'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/StatCard"
import { Users, DollarSign, ShoppingCart, TrendingUp, Activity } from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts"

const stats = [
  {
    title: "Total Users",
    value: "2,350",
    change: "+12% from last month",
    changeType: "positive" as const,
    icon: Users, // Pass the component, not JSX
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+8% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "1,254",
    change: "-3% from last month",
    changeType: "negative" as const,
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "12.5%",
    change: "+2% from last month",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

const monthlyData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
]

const dailyData = [
  { name: "Mon", users: 120, orders: 80 },
  { name: "Tue", users: 150, orders: 95 },
  { name: "Wed", users: 180, orders: 120 },
  { name: "Thu", users: 160, orders: 110 },
  { name: "Fri", users: 200, orders: 140 },
  { name: "Sat", users: 190, orders: 130 },
  { name: "Sun", users: 170, orders: 115 },
]

const pieData = [
  { name: "Desktop", value: 45, color: "#3B82F6" },
  { name: "Mobile", value: 35, color: "#10B981" },
  { name: "Tablet", value: 20, color: "#F59E0B" },
]

const colorClassMap: Record<string, string> = {
  Desktop: "bg-blue-500",
  Mobile: "bg-green-500",
  Tablet: "bg-yellow-500",
}


export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  {/* <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div> */}
                  <div className={`w-3 h-3 rounded-full ${colorClassMap[item.name]}`}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New user registered", time: "2 minutes ago", user: "john@example.com" },
                { action: "Order completed", time: "5 minutes ago", user: "Order #1234" },
                { action: "Payment received", time: "10 minutes ago", user: "$299.99" },
                { action: "User updated profile", time: "15 minutes ago", user: "sarah@example.com" },
                { action: "New support ticket", time: "20 minutes ago", user: "Ticket #567" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
