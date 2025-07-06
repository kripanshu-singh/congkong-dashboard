import { Insight } from "@/dto/Insights";
import { MatchWithParticipants } from "@/dto/Match";
import { MeetingInAnticipation } from "@/dto/MeetingInAnticipation";
import { Participant } from "@/dto/Participant";
import { TopParticipant } from "@/dto/TopParticipant";
import { supabase } from "@/lib/supabaseClient";
import { time } from "console";

export async function getDashboardKpis() {
  const { data, error } = await supabase
    .from("dashboard_kpis")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching dashboard KPIs:", error);
    return null;
  }

  return data;
}

export async function getActivityLogs() {
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .order("time_slot", { ascending: true });

  if (error) {
    console.error("Error fetching activity logs:", error);
    return [];
  }

  return data;
}

export async function getTopParticipants(): Promise<TopParticipant[]> {
  const { data, error } = await supabase.from("top_5_participants").select("*");

  if (error) {
    console.error(error);
    return [];
  }
  return data as TopParticipant[];
}

export async function getMeetingsInAnticipation(): Promise<
  MeetingInAnticipation[]
> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .order("time", { ascending: true })
    .gt("time", now);

  if (error) {
    console.error(error);
    return [];
  }

  return data as MeetingInAnticipation[];
}

export async function fetchInsights() {
  const { data, error } = await supabase.from("insights").select("*");

  if (error) {
    console.error(error);
    return [];
  }
  return data.map((item) => ({
    ...item,
    indicatorDirection: item.indicator_direction,
    indicatorDescription: item.indicator_description,
  })) as Insight[];
}

export async function getAllParticipants(): Promise<Participant[]> {
  const { data, error } = await supabase.from("participants").select("*");

  if (error) {
    console.error("Error fetching participants:", error);
    return [];
  }

  return data as Participant[];
}

export async function getAllMatchesWithParticipants(): Promise<
  MatchWithParticipants[]
> {
  const { data, error } = await supabase
    .from("matches")
    .select(
      `
      id,
      match_score,
      matched_at,
      topics,
      participant1:participant1_id (
        id,
        name,
        avatar_url,
        company
      ),
      participant2:participant2_id (
        id,
        name,
        avatar_url,
        company
      )
    `,
    )
    .order("matched_at", { ascending: false });

  if (error) {
    console.error("[getAllMatchesWithParticipants] Error:", error);
    return [];
  }

  const converted: MatchWithParticipants[] = (data ?? []).map((row: any) => ({
    id: row.id,
    match_score: row.match_score,
    matched_at: row.matched_at,
    topics: row.topics,
    participant1: row.participant1,
    participant2: row.participant2,
  }));

  return converted;
}
