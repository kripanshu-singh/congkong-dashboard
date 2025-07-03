"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  IconBriefcase,
  IconBuilding,
  IconClock,
  IconMessage,
  IconMoodHappy,
  IconUser,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Participant } from "@/dto/Participant";

interface ParticipantsCardsMobileProps {
  data: Participant[];
}

export function ParticipantsCardsMobile({
  data,
}: ParticipantsCardsMobileProps) {
  return (
    <div className="md:hidden h-full overflow-y-auto space-y-4">
      {data.length ? (
        data.map((participant) => {
          const initials =
            participant.name
              ?.split(" ")
              .map((s) => s[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() ?? "?";
          const isDropped = participant.is_dropped_off;
          const satisfactionColor =
            (participant.satisfaction || 0) > 70
              ? "text-green-500"
              : (participant.satisfaction || 0) > 40
              ? "text-amber-500"
              : "text-red-500";

          return (
            <Card
              key={participant.id}
              className={`p-5 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all ${
                isDropped
                  ? "bg-gradient-to-br from-muted/30 to-background grayscale hover:grayscale-0 transition-all"
                  : "bg-gradient-to-br from-background to-background/80"
              }`}
            >
              {/* Header with avatar and status */}
              <div className="flex items-center gap-3">
                <Avatar
                  className={`h-14 w-14 rounded-full border-2 ${
                    isDropped
                      ? "border-muted grayscale hover:grayscale-0"
                      : "border-primary/10"
                  }`}
                >
                  <AvatarImage
                    src={participant.avatar_url || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-primary font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold truncate">
                      {participant.name || "Unknown"}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        isDropped
                          ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                          : "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                      }`}
                    >
                      {isDropped ? "Dropped" : "Active"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                    <IconBriefcase className="h-4 w-4" />
                    {participant.company || "No company"}
                  </div>
                </div>
              </div>

              {/* Details grid with icons */}
              <div className="mt-2 flex gap-4 items-center">
                <div className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <IconUser className="h-4 w-4" />
                      Role
                    </div>
                    <p className="text-sm font-medium">
                      {participant.role || "-"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <IconBuilding className="h-4 w-4" />
                      Industry
                    </div>
                    <p className="text-sm font-medium">
                      {participant.industry || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  <div className="space-y-1 min-w-[120px]">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <IconMoodHappy className="h-4 w-4" />
                      Satisfaction
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${satisfactionColor.replace(
                            "text-",
                            "bg-",
                          )}`}
                          style={{ width: `${participant.satisfaction || 0}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${satisfactionColor}`}
                      >
                        {participant.satisfaction?.toFixed(0) || "0"}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <IconClock className="h-4 w-4" />
                      Last Active
                    </div>
                    <p className="text-sm font-medium">
                      {participant.last_active
                        ? new Date(participant.last_active).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 bg-gradient-to-r from-default to-default/90"
                >
                  <IconMessage className="h-4 w-4" />
                  Message
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-1 bg-gradient-to-r from-primary to-primary/90"
                >
                  <IconUserPlus className="h-4 w-4" />
                  Connect
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-background/80">
          <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
            <IconUsers className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-lg">No participants found</CardTitle>
          <CardDescription className="text-center mt-2">
            {"When participants are added, they'll appear here"}
          </CardDescription>
          <Button className="mt-6" variant="outline">
            Add Participant
          </Button>
        </Card>
      )}
    </div>
  );
}
