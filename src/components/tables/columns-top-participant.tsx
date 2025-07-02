"use client";

import { TopParticipant } from "@/dto/TopParticipant";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const topParticipantsColumns: ColumnDef<TopParticipant>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left w-full">Name</div>,
    cell: ({ row }) => {
      const { name, avatar_url } = row.original;

      // Create initials for fallback
      const initials = name
        ? name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "?";

      return (
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-8 w-8 border border-muted-foreground/20 shadow-sm">
            <AvatarImage
              title={name}
              src={avatar_url || undefined}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium truncate">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "avg_match_score",
    header: () => <div className="text-right w-full">Avg. Score</div>,
    cell: ({ row }) => (
      <div className="text-right w-full">
        {row.original.avg_match_score?.toFixed(2) ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "match_count",
    header: () => <div className="text-right w-full">Matches</div>,
    cell: ({ row }) => (
      <div className="text-right w-full">{row.original.match_count}</div>
    ),
  },
];
