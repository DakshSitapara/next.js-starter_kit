"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const generateVisitorData = (days: number) => {
  const data = [];
  const today = new Date("2025-06-05T14:12:00+05:30");
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0];
    data.push({
      date: formattedDate,
      desktop: Math.floor(Math.random() * 500) + 50, // Random visitors (50–550)
      mobile: Math.floor(Math.random() * 500) + 50,
    });
  }
  return data;
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const updateData = () => {
      const newData = generateVisitorData(days);
      setChartData(newData);
    };
    updateData();

    // Simulate real-time updates every 10 seconds
    const interval = setInterval(updateData, 10000);

    return () => clearInterval(interval); 
  }, [timeRange]);

  // Handle empty data
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visitor Analytics</CardTitle>
          <CardDescription>Loading visitor data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle>Visitor Analytics</CardTitle>
          <CardDescription>
            Showing total visitors for the last {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"} (updates every 10s)
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange} aria-label="Select time range">
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
            <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
            <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)" 
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)" 
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
