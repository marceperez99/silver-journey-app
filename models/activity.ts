export interface Activity {
  uuid?: string;
  type: ActivityType;
  description: string;
  date?: number;
  user?: string;
  duration: number;
}
