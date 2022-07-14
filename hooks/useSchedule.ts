/* eslint-disable react-hooks/exhaustive-deps */
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useCallback } from 'react';
import uuid from 'react-native-uuid';
import * as Notifications from 'expo-notifications';
import { Schedule } from '../models/schedule';

const useSchedule = () => {
  const { getItem, setItem } = useAsyncStorage(`schedule`);
  const getSchedule = useCallback(async (date: moment.Moment) => {
    const items = await getItem();
    const lista: Schedule[] = JSON.parse(items || '[]');

    return lista.filter(activity => {
      const initDate = moment.unix(activity.initDate);
      const endDate = activity.endDate && moment.unix(activity.endDate);

      if (initDate.startOf('day').isSameOrBefore(date)) {
        if (endDate && endDate.startOf('day').isAfter(date)) return false;

        if (activity.days.includes(date.day())) return true;
      }
      return false;
    });
  }, []);
  const getByUUID = useCallback(async (itemUuid: string) => {
    const items = await getItem();
    const lista: Schedule[] = JSON.parse(items || '[]');

    return lista.find(item => item.uuid === itemUuid);
  }, []);
  const save = useCallback(async (item: Schedule) => {
    const items = await getItem();
    const lista: Schedule[] = JSON.parse(items || '[]');
    lista.push({ ...item, uuid: `${uuid.v4()}` });

    await setItem(JSON.stringify(lista));
    const time = moment.unix(item.initDate);
    Promise.all(
      item.days.map(day =>
        Notifications.scheduleNotificationAsync({
          content: {
            title: `It's time to do your ${item.activity.name} 📕`,
            body: 'Remember to do your scheduled activities and save your progress',
          },
          trigger: {
            repeats: true,
            weekday: day + 1,
            hour: time.hour(),
            minute: time.minute(),
          },
        }),
      ),
    );
  }, []);
  return { getSchedule, save, getByUUID };
};

export default useSchedule;
