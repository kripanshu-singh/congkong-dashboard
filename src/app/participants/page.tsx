import { getAllParticipants } from "@/lib/queries";
import { participantColumns } from "@/components/tables/participants/participantsColumns";
import { ParticipantsTableDesktop } from "@/components/tables/participants/ParticipantsTableDesktop";
import { ParticipantsCardsMobile } from "@/components/tables/participants/ParticipantsCardsMobile";

export default async function ParticipantsPage() {
  const participants = await getAllParticipants();

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] bg-gradient-to-b from-background/50 to-muted/10">
      {/* Header */}
      <div className="p-6 pb-3 sm:p-8 sm:pb-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            All Participants
          </h1>

          <p className="text-sm text-muted-foreground">
            {participants.length}
            {participants.length === 1 ? " participant" : " participants "} in
            your network
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1  sm:px-8 pb-6 overflow-hidden">
        <ParticipantsTableDesktop
          columns={participantColumns}
          data={participants}
        />
        <ParticipantsCardsMobile data={participants} />
      </div>
    </div>
  );
}
