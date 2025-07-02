"use client";
import { MeetingInAnticipation } from "@/dto/MeetingInAnticipation";
import { ColumnDef } from "@tanstack/react-table";

export const meetingsAnticipationColumns: ColumnDef<MeetingInAnticipation>[] = [
  {
    id: "index",
    header: () => <div className="text-center">S.No</div>,
    cell: ({ row }) => (
      <div className="text-center w-full">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "time",
    header: () => <div className="text-center">Scheduled Time</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.time);
      return (
        <div className="text-center w-full">
          {date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      );
    },
  },
];
