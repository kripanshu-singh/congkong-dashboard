// components/tables/meetings/meetings-columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  IconCalendar,
  IconClock,
  IconSparkles,
} from "@tabler/icons-react";
import { MatchWithParticipants } from "@/dto/Match";
import { HandshakeIcon } from "lucide-react";

const TopicPill = ({ topic }: { topic: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-primary/5 text-primary">
    <IconSparkles className="h-3 w-3 mr-1" />
    {topic.trim()}
  </span>
);

export const meetingColumns: ColumnDef<MatchWithParticipants>[] = [
  {
    accessorKey: "participants",
    header: "Participants",
    cell: ({ row }) => {
      const meeting = row.original;
      return (
        <div className="flex items-center gap-4 group">
          <div className="flex -space-x-2">
            <Avatar className="h-9 w-9 border-2 border-background group-hover:border-primary/20 transition-all">
              <AvatarImage
                src={meeting.participant1?.avatar_url || undefined}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600">
                {meeting.participant1?.name?.slice(0, 2).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-9 w-9 border-2 border-background group-hover:border-primary/20 transition-all">
              <AvatarImage
                src={meeting.participant2?.avatar_url || undefined}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600">
                {meeting.participant2?.name?.slice(0, 2).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="font-medium flex items-center gap-2">
              <span>{meeting.participant1?.name || "Unknown"}</span>
              <HandshakeIcon className="h-4 w-4 text-muted-foreground" />
              <span>{meeting.participant2?.name || "Unknown"}</span>
            </div>
            <div className="text-xs text-muted-foreground flex gap-2">
              <span>{meeting.participant1?.company || "No company"}</span>
              <span>•</span>
              <span>{meeting.participant2?.company || "No company"}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "matched_at",
    header: "Date & Time",
    cell: ({ row }) => {
      const meeting = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
            <IconCalendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">
              {meeting.matched_at
                ? new Date(meeting.matched_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "No date"}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <IconClock className="h-3 w-3" />
              {meeting.matched_at
                ? new Date(meeting.matched_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No time"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "topics",
    header: "Topics",
    cell: ({ row }) => {
      const topics = row.original.topics?.split(",") || [];
      return (
        <div className="flex flex-wrap gap-1.5">
          {topics.length > 0 ? (
            topics
              .slice(0, 3)
              .map((topic, index) => <TopicPill key={index} topic={topic} />)
          ) : (
            <span className="text-xs text-muted-foreground">No topics</span>
          )}
          {topics.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{topics.length - 3} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "match_score",
    header: "Match Score",
    cell: ({ row }) => {
      const score = row.original.match_score || 0;
      return (
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={
                  score > 85 ? "#10B981" : score > 70 ? "#3B82F6" : "#F59E0B"
                }
                strokeWidth="3"
                strokeDasharray={`${Math.round(score)}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
              {Math.round(score)}%
            </div>
          </div>
        </div>
      );
    },
  },
];
