import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import { ActivityType } from '../models/activity_type';

export type HomeParamList = {
  HomeScreen: undefined;
  NewActivityType: { onCreate: (value: ActivityType) => void };
  AddEntry: { language: string };
  Settings: undefined;
  ActivityHistory: { language: string };
  ScheduleList: { language: string };
  NewScheduledActivity: { language: string; date: moment.Moment };
  ScheduleActivity: {
    scheduleActivityUuid: string;
    date: moment.Moment;
    language: string;
  };
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
