/* eslint-disable react-hooks/exhaustive-deps */
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { Colors } from 'react-native-ui-lib';
import uuid from 'react-native-uuid';
import { ActivityType } from '../models/activity_type';

const defaultTypes: ActivityType[] = [
  { uuid: `${uuid.v4()}`, name: 'Reading', color: Colors.green30 },
  { uuid: `${uuid.v4()}`, name: 'Writing', color: Colors.blue30 },
  { uuid: `${uuid.v4()}`, name: 'Listening', color: Colors.yellow30 },
  { uuid: `${uuid.v4()}`, name: 'Flashcards', color: Colors.purple30 },
];

const useActivityType = () => {
  const { getItem, setItem } = useAsyncStorage('activity_types');
  const getTypes = useCallback(async () => {
    const items = await getItem();
    const lista: ActivityType[] = JSON.parse(items || '[]');

    if (!lista.length) setItem(JSON.stringify(defaultTypes));

    return lista.length ? lista : defaultTypes;
  }, []);
  const save = useCallback(
    async (data: ActivityType): Promise<ActivityType> => {
      const items = await getItem();
      const lista: ActivityType[] = JSON.parse(items || '[]');
      const item = { ...data, uuid: `${uuid.v4()}` };

      lista.push(item);
      setItem(JSON.stringify(lista));
      return item;
    },
    [],
  );

  return { getTypes, save };
};

export default useActivityType;
