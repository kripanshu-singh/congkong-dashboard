export interface TopParticipant {
  id: string;
  name: string;
  company: string | null;
  industry: string | null;
  role: string | null;
  match_count: number;
  avg_match_score: number | null;
  avatar_url: string | null;
}
