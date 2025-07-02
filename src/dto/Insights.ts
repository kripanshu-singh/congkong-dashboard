export interface Insight {
  id: string;
  type: "alert" | "insight" | "link";
  title: string;
  description: string;
  link?: string;
  value?: string;
  indicator?: string;
  indicatorDirection?: "up" | "down";
  indicatorDescription?: string;
}
