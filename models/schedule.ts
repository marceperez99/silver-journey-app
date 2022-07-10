import { ActivityType } from './activity_type';

export enum WEEK_DAYS {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}
export const WEEK_DAY_NAMES = Object.keys(WEEK_DAYS).filter(key =>
  Number.isNaN(Number(key)),
);

export interface Schedule {
  duration: number;
  initDate: number;
  endDate?: number;
  activity: ActivityType;
  uuid?: string;
  days: WEEK_DAYS[];
}
