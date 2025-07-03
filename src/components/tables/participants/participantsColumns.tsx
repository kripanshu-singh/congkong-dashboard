"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Participant } from "@/dto/Participant";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IconBriefcase, IconBuilding, IconClock } from "@tabler/icons-react";

export const participantColumns: ColumnDef<Participant>[] = [
  {
    accessorKey: "name",
    header: "Participant",
    cell: ({ row }) => {
      const { name, avatar_url, company, is_dropped_off } = row.original;
      const initials =
        name
          ?.split(" ")
          .map((s) => s[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() ?? "?";

      return (
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            className={`h-9 w-9 border-2 shadow-sm ${
              is_dropped_off ? "grayscale hover:grayscale-0 transition-all" : ""
            }`}
          >
            <AvatarImage
              src={avatar_url || undefined}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium truncate">{name || "-"}</div>
            <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
              <IconBriefcase className="h-3 w-3" />
              {company || "No company"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div>
          <div className="text-sm font-medium">{row.original.role || "-"}</div>
          <div className="text-xs text-muted-foreground">Position</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100/80 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/10">
          <IconBuilding className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <div className="text-sm font-medium">
            {row.original.industry || "-"}
          </div>
          <div className="text-xs text-muted-foreground">Field</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "satisfaction",
    header: "Satisfaction",
    cell: ({ row }) => {
      const satisfaction = row.original.satisfaction || 0;
      const color =
        satisfaction > 70
          ? "bg-green-500"
          : satisfaction > 40
          ? "bg-amber-500"
          : "bg-red-500";

      return (
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between">
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex-1">
              <div
                className={`h-full ${color}`}
                style={{ width: `${satisfaction}%` }}
              />
            </div>
            <span
              className={`text-sm font-medium ${color.replace("bg-", "text-")}`}
            >
              {satisfaction.toFixed(0)}%
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "last_active",
    header: "Last Active",
    cell: ({ row }) => {
      const lastActive = row.original.last_active;
      return (
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100/80 to-gray-50 dark:from-gray-800/20 dark:to-gray-800/10">
            <IconClock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <div className="text-sm font-medium">
              {lastActive
                ? new Date(lastActive).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "-"}
            </div>
            <div className="text-xs text-muted-foreground">
              {lastActive
                ? new Date(lastActive).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "is_dropped_off",
    header: "Status",
    cell: ({ row }) => {
      const isDropped = row.original.is_dropped_off ?? false;

      return (
        <Badge
          variant="outline"
          className={
            !isDropped
              ? "text-green-700 border-green-700"
              : "text-destructive border-destructive"
          }
        >
          {isDropped ? "Dropped" : "Active"}
        </Badge>
      );
    },
  },
];
