"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconUsers } from "@tabler/icons-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Participant } from "@/dto/Participant";

interface ParticipantsTableDesktopProps {
  columns: ColumnDef<Participant>[];
  data: Participant[];
}

export function ParticipantsTableDesktop({
  columns,
  data,
}: ParticipantsTableDesktopProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="hidden md:block h-full border-0 shadow-sm">
      <Table className="w-full">
        <TableHeader className="sticky top-0 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-4 text-sm font-medium whitespace-nowrap border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={`border-b border-muted/10 transition-all ${
                  row.original.is_dropped_off
                    ? "bg-muted/30 grayscale hover:grayscale-0"
                    : "hover:bg-gradient-to-r from-primary/5 to-transparent"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`px-6 py-4 ${
                      row.original.is_dropped_off
                        ? "grayscale hover:grayscale-0 transition-all"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center gap-3 py-12">
                  <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5">
                    <IconUsers className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    No participants found
                  </CardTitle>
                  <CardDescription className="text-center mt-2">
                    {"When participants are added, they'll appear here"}
                  </CardDescription>
                  <Button className="mt-4" variant="outline">
                    Add Participant
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
