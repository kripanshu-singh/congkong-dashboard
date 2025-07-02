import { KpiCard } from "@/components/kpi-card";
import { ChartAreaInteractive } from "@/components/chart";
import { DataTable } from "../components/tables/data-table";
import {
  fetchInsights,
  getActivityLogs,
  getDashboardKpis,
  getMeetingsInAnticipation,
  getTopParticipants,
} from "@/lib/queries";
import { topParticipantsColumns } from "@/components/tables/columns-top-participant";
import { meetingsAnticipationColumns } from "@/components/tables/columns-antipicant";
import InsightsSection from "@/components/insight";

export default async function Home() {
  const kpis = await getDashboardKpis();
  const activityLogs = await getActivityLogs();
  const topParticipants = await getTopParticipants();
  const meetings = await getMeetingsInAnticipation();
  const insights = await fetchInsights();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <KpiCard kpis={kpis} />
        <div className="grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-[auto_auto] gap-4">
          <div className="xl:col-span-3 xl:row-start-1">
            <ChartAreaInteractive data={activityLogs} />
          </div>

          <div className="xl:col-start-4 xl:row-start-1 flex">
            <DataTable
              columns={topParticipantsColumns}
              data={topParticipants}
              title="Top 5 Participants"
              className="flex-1"
            />
          </div>

          <div className="xl:col-start-4 xl:row-start-2 flex">
            <DataTable
              columns={meetingsAnticipationColumns}
              data={meetings}
              title="Meetings in Anticipation"
              className="flex-1"
            />
          </div>

          <div className="xl:col-span-3 xl:row-start-2">
            <InsightsSection insights={insights} />
          </div>
        </div>
      </div>
    </div>
  );
}
