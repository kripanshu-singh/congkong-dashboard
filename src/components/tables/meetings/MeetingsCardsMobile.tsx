"use client";
import { MatchWithParticipants } from "@/dto/Match";
import {
  IconCalendar,
  IconClock,
  IconUsers,
  IconMessage,
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

interface MeetingsCardsMobileProps {
  data: MatchWithParticipants[];
}

export function MeetingsCardsMobile({ data }: MeetingsCardsMobileProps) {
  return (
    <div className="md:hidden h-full overflow-y-auto px-4 pb-6">
      <div className="space-y-4">
        {data.length ? (
          data.map((meeting) => {
            const topics = meeting.topics?.split(",") || [];
            const showGreenDot1 = Math.random() < 0.3;
            const showGreenDot2 = Math.random() < 0.3;
            const scoreColor =
              (meeting.match_score || 0) > 85
                ? "text-emerald-500"
                : (meeting.match_score || 0) > 70
                ? "text-blue-500"
                : "text-amber-500";

            const glowBgColor =
              (meeting.match_score || 0) > 85
                ? "bg-emerald-500 opacity-15"
                : (meeting.match_score || 0) > 70
                ? "bg-blue-500 opacity-15"
                : "bg-amber-500 opacity-10";

            return (
              <Card
                key={meeting.id}
                className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/90 to-background/70 shadow-sm hover:shadow-md transition-all"
              >
                {/* Glow effect for score */}
                <div
                  className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${glowBgColor} blur-xl`}
                  aria-hidden="true"
                />

                <div className="p-5">
                  {/* Header with date and score */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                        <IconCalendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium text-sm">
                          {meeting.matched_at
                            ? new Date(meeting.matched_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )
                            : "No date"}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <IconClock className="h-3 w-3" />
                          {meeting.matched_at
                            ? new Date(meeting.matched_at).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "No time"}
                        </div>
                      </div>
                    </div>

                    {/* Score circle */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-muted"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={`${meeting.match_score}, 100`}
                          className={scoreColor}
                        />
                      </svg>
                      <div
                        className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${scoreColor}`}
                      >
                        {Math.round(meeting.match_score)}%
                      </div>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="flex items-center justify-between my-5 gap-2">
                    {/* Participant 1 */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                          <AvatarImage
                            src={meeting.participant1?.avatar_url || ""}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 font-medium">
                            {meeting.participant1?.name
                              ?.slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {showGreenDot1 && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium truncate max-w-[100px]">
                          {meeting.participant1?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[100px]">
                          {meeting.participant1?.company || "No company"}
                        </p>
                      </div>
                    </div>

                    {/* Connection arrow */}
                    <div className="flex flex-col items-center justify-center px-1">
                      <div className="p-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm">
                        <IconArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Participant 2 */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                          <AvatarImage
                            src={meeting.participant2?.avatar_url || ""}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 font-medium">
                            {meeting.participant2?.name
                              ?.slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {showGreenDot2 && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium truncate max-w-[100px]">
                          {meeting.participant2?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[100px]">
                          {meeting.participant2?.company || "No company"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Topics */}
                  {topics.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <IconSparkles className="h-3.5 w-3.5" />
                        <span>Discussion Topics</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {topics.slice(0, 3).map((topic, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/10"
                          >
                            {topic.trim()}
                          </span>
                        ))}
                        {topics.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            +{topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1 bg-background hover:bg-muted/50"
                    >
                      <IconMessage className="h-4 w-4" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="flex flex-col items-center justify-center p-8 border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
              <IconUsers className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-lg">No meetings found</CardTitle>
            <CardDescription className="text-center mt-2">
              {"When you schedule meetings, they'll appear here"}
            </CardDescription>
            <Button className="mt-6" variant="outline">
              Schedule a Meeting
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
