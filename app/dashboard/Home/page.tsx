'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  ArrowUpRight, DollarSign, Users, CreditCard, Activity, Calendar,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Mock data for the chart
const chartData = [
  { month: 'January', revenue: 186 },
  { month: 'February', revenue: 305 },
  { month: 'March', revenue: 237 },
  { month: 'April', revenue: 73 },
  { month: 'May', revenue: 209 },
  { month: 'June', revenue: 214 },
];

// Mock data for recent orders
const recentOrders = [
  {
    id: 'INV001',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2025-05-28',
    amount: '$250.00',
    status: 'Paid',
  },
  {
    id: 'INV002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2025-05-27',
    amount: '$150.00',
    status: 'Pending',
  },
  {
    id: 'INV003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    date: '2025-05-26',
    amount: '$350.00',
    status: 'Paid',
  },
  {
    id: 'INV004',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    date: '2025-05-25',
    amount: '$450.00',
    status: 'Paid',
  },
  {
    id: 'INV005',
    customer: 'Charlie Davis',
    email: 'charlie@example.com',
    date: '2025-05-24',
    amount: '$550.00',
    status: 'Pending',
  },
];

// ChartCard Component (Chart Area)
function ChartCard() {
  const { theme } = useTheme();
  return (
    <Card >
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
            <XAxis dataKey="month" stroke="#4B5563" className="dark:stroke-gray-400" />
            <YAxis stroke="#4B5563" className="dark:stroke-gray-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : 'white',
                border: '1px solid',
                borderColor: theme === 'dark' ? '#4B5563' : '#ccc',
                borderRadius: '4px',
                color: theme === 'dark' ? '#F3F4F6' : '#1F2937',
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fillOpacity={0.3}
              fill="#8884d8"
              className="dark:stroke-purple-400 dark:fill-purple-400/30"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function Dashboard01() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your business performance and key metrics.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$45,231.89</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">+2350</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Sales
            </CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">+12,234</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Now
            </CardTitle>
            <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">+573</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ChartCard />
        </div>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Recent Sales</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You made 265 sales this month.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  name: 'Olivia Martin',
                  email: 'olivia.martin@email.com',
                  amount: '+$1,999.00',
                },
                {
                  name: 'Jackson Lee',
                  email: 'jackson.lee@email.com',
                  amount: '+$39.00',
                },
                {
                  name: 'Isabella Nguyen',
                  email: 'isabella.nguyen@email.com',
                  amount: '+$299.00',
                },
                {
                  name: 'William Kim',
                  email: 'will@email.com',
                  amount: '+$99.00',
                },
                {
                  name: 'Sofia Davis',
                  email: 'sofia.davis@email.com',
                  amount: '+$39.00',
                },
              ].map((sale, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {sale.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {sale.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {sale.email}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {sale.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableHead className="text-gray-900 dark:text-gray-100">Invoice</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Customer</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Date</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Amount</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                <TableHead className="text-right text-gray-900 dark:text-gray-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {order.customer}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {order.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {order.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={order.status === 'Paid' ? 'default' : 'secondary'}
                      className={
                        order.status === 'Paid'
                          ? 'bg-green-600 dark:bg-green-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}