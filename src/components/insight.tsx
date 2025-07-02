"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon, InfoIcon, AlertTriangleIcon } from "lucide-react";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Insight } from "@/dto/Insights";

type Props = {
  insights: Insight[];
};
const getBadge = (type: Insight["type"]) => {
  switch (type) {
    case "alert":
      return (
        <Badge variant="destructive">
          <AlertTriangleIcon size={12} className="mr-1" /> Alert
        </Badge>
      );
    case "insight":
      return (
        <Badge variant="secondary">
          <InfoIcon size={12} className="mr-1" /> Insight
        </Badge>
      );
    case "link":
      return (
        <Badge variant="outline">
          <ExternalLinkIcon size={12} className="mr-1" /> Link
        </Badge>
      );
  }
};

const getGradientClass = (type: Insight["type"]) => {
  switch (type) {
    case "alert":
      return "bg-gradient-to-t from-[var(--destructive)]/10 to-[var(--card)]";
    case "insight":
      return "bg-gradient-to-t from-[#97B067]/15 to-[var(--card)]";
    case "link":
      return "bg-gradient-to-t from-[var(--primary)]/10 to-[var(--card)]";
    default:
      return "bg-gradient-to-t from-[var(--muted)]/10 to-[var(--card)]";
  }
};

export default function InsightsSection({ insights }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {insights.map((item) => {
        const isPositive = item.indicatorDirection === "up";
        return (
          <Card
            key={item.id}
            className={`@container/card ${getGradientClass(item.type)}`}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                {getBadge(item.type)}
              </div>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.value ?? "-"}
              </CardTitle>
              {item.indicator && (
                <CardAction>
                  <Badge
                    variant="outline"
                    className={
                      isPositive
                        ? "text-green-700 border-green-700"
                        : "text-red-700 border-red-700"
                    }
                  >
                    {isPositive ? (
                      <IconTrendingUp size={14} className="mr-1" />
                    ) : (
                      <IconTrendingDown size={14} className="mr-1" />
                    )}
                    {item.indicator}
                  </Badge>
                </CardAction>
              )}
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              {item.indicatorDescription && (
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {item.indicatorDescription}
                  {isPositive ? (
                    <IconTrendingUp size={16} />
                  ) : (
                    <IconTrendingDown size={16} />
                  )}
                </div>
              )}
              <div className="text-muted-foreground">{item.description}</div>
              {item.link && (
                <a
                  href={item.link}
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline mt-1"
                >
                  View More →
                </a>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
