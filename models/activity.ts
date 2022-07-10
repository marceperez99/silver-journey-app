import { ActivityType } from './activity_type';

export interface Activity {
  uuid?: string;
  type: ActivityType;
  description: string;
  date?: number;
  user?: string;
  duration: number;
  timestamp?: number;
}
