"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import CountUp from "react-countup";

type KpiProps = {
  kpis: {
    total_participants: number;
    avg_satisfaction: number;
    dropped_off_percentage: number;
    total_meetings: number;
    total_matches: number;
  } | null;
};

export function KpiCard({ kpis }: KpiProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-0 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-0 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Participants</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis && (
              <CountUp
                start={0}
                end={kpis.total_participants}
                duration={1}
                separator=","
              />
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Avg Satisfaction</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis && (
              <CountUp
                start={0}
                end={kpis?.avg_satisfaction}
                duration={1}
                separator=","
              />
            )}
            %
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Dropped Off (%)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis && (
              <CountUp
                start={0}
                end={kpis?.dropped_off_percentage}
                duration={1}
                separator=","
              />
            )}
            %
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Total Matches</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis && (
              <CountUp
                start={0}
                end={kpis?.total_matches}
                duration={1}
                separator=","
              />
            )}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
