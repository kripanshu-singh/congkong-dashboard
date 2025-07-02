export interface Match {
  id: string;
  participant1_id: string;
  participant2_id: string;
  match_score: number;
  matched_at: string | null;
  topics: string | null;
}

export interface MatchWithParticipants {
  id: string;
  match_score: number;
  matched_at: string | null;
  topics: string | null;

  participant1: {
    id: string;
    name: string;
    avatar_url: string | null;
    company: string | null;
  } | null;

  participant2: {
    id: string;
    name: string;
    avatar_url: string | null;
    company: string | null;
  } | null;
}
