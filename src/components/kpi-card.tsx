"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { useEffect, useMemo, useState } from "react";

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
            <AnimatedNumber value={kpis?.total_participants ?? 0} />
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Avg Satisfaction</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <AnimatedNumber value={kpis?.avg_satisfaction ?? 0} />%
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Dropped Off (%)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <AnimatedNumber value={kpis?.dropped_off_percentage ?? 0} />%
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Total Matches</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <AnimatedNumber value={kpis?.total_matches ?? 0} />
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

function AnimatedNumber({
  value,
  durationMs = 1000,
}: {
  value: number;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(0);

  const formatter = useMemo(() => {
    const decimals = Number.isInteger(value) ? 0 : 2;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, [value]);

  useEffect(() => {
    let frame = 0;
    const from = 0;
    const to = Number.isFinite(value) ? value : 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const next = from + (to - from) * progress;
      setDisplay(next);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return <span>{formatter.format(display)}</span>;
}
