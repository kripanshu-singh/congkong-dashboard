"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ChartAreaInteractive({
  data,
}: {
  data: {
    time_slot: string;
    participant_logins: number;
    meetings: number;
    participants_per_meeting: number;
  }[];
}) {
  return (
    <Card className="h-fit p-0">
      <CardHeader className="flex items-center gap-2 p=space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 space-y-1">
          <CardTitle>Participant Activity</CardTitle>
          <CardDescription>Logins and Meetings by Hour</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="-p-8">
        <ChartContainer
          config={{
            participant_logins: {
              label: "Logins",
              color: "var(--chart-1)",
            },
            meetings: {
              label: "Meetings",
              color: "var(--chart-2)",
            },
          }}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillMeetings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLogins" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time_slot"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              yAxisId="left"
              dataKey="participant_logins"
              type="natural"
              fill="url(#fillLogins)"
              stroke="var(--chart-1)"
            />
            <Area
              yAxisId="right"
              dataKey="meetings"
              type="natural"
              fill="url(#fillMeetings)"
              stroke="var(--chart-2)"
            />
            <ChartLegend
              content={<ChartLegendContent payload={data} className="" />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
