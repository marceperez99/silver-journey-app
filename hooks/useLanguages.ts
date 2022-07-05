import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { useCallback, useState } from 'react';

export type NewLanguage = {
  name: string;
};

const useLanguages = (): {
  languages: Language[];
  create: (data: NewLanguage) => void;
} => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const { getItem, setItem } = useAsyncStorage('languages');

  useFocusEffect(
    useCallback(() => {
      (async () => setLanguages(JSON.parse((await getItem()) || '[]')))();
    }, [getItem]),
  );

  const create = useCallback(
    async ({ name }: NewLanguage): Promise<void> => {
      const items: Language[] = JSON.parse((await getItem()) || '[]');
      if (items.some(item => item.name === name))
        throw new Error('Language already registered');
      items.push({ name, createdAt: moment().unix() });
      setLanguages(items);
      setItem(JSON.stringify(items));
    },
    [getItem, setItem],
  );
  return { languages, create };
};

export default useLanguages;
