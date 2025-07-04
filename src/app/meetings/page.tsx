import { getAllMatchesWithParticipants } from "@/lib/queries";
import { meetingColumns } from "@/components/tables/meetings/matchColumns";
import { MeetingsTableDesktop } from "@/components/tables/meetings/MeetingsTableDesktop";
import { MeetingsCardsMobile } from "@/components/tables/meetings/MeetingsCardsMobile";

export default async function MeetingsPage() {
  const meetings = await getAllMatchesWithParticipants();

  return (
    <div className="">
      <div className="flex flex-col h-[calc(100dvh-64px)]">
        {/* Header */}
        <div className="p-6 pb-2 sm:p-8 sm:pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Recent Meetings
            </h1>
            <p className="text-sm text-muted-foreground">
              {meetings.length} {meetings.length === 1 ? "meeting" : "meetings"}
              scheduled
            </p>
          </div>
        </div>

        {/* Content Area */}
        <MeetingsTableDesktop columns={meetingColumns} data={meetings} />
        <MeetingsCardsMobile data={meetings} />
      </div>
    </div>
  );
}
