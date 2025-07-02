export interface Participant {
  id: string;
  name: string | null;
  satisfaction: number | null;
  is_dropped_off: boolean | null;
  avatar_url: string | null;
  company: string | null;
  industry: string | null;
  role: string | null;
  last_active: string | null;
}
