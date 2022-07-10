/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Chip,
  Colors,
  Text,
  Incubator,
  TouchableOpacity,
} from 'react-native-ui-lib';
import SelectorInput from '../../components/inputs/SelectorInput';
import TimeInput from '../../components/inputs/TimeInput';
import useActivityType from '../../hooks/useActivityType';
import useSchedule from '../../hooks/useSchedule';
import { useToast } from '../../hooks/useToast';
import { ActivityType } from '../../models/activity_type';
import { Schedule, WEEK_DAYS, WEEK_DAY_NAMES } from '../../models/schedule';
import { TimeSelectorState } from '../NewEntry';
import { HomeNavProps } from '../types';

function NewScheduledActivity({
  navigation,
  route: {
    params: { date },
  },
}: HomeNavProps<'NewScheduledActivity'>) {
  const { showMessage } = useToast();
  const { save } = useSchedule();
  const wheelRef = useRef<TimeSelectorState>({
    hours: 0,
    minutes: 0,
  });
  const now = moment();
  const [schedule, setSchedule] = useState<Partial<Schedule>>({
    initDate:
      date.unix() >= now.unix()
        ? date.set({ hour: now.hour() }).unix()
        : now.unix(),
  });

  const update = (key: keyof Schedule, value: any) =>
    setSchedule(prev => ({ ...prev, [key]: value }));

  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [selectedChips, setSelectedChips] = useState<Set<string>>();

  const { getTypes } = useActivityType();
  useFocusEffect(
    useCallback(() => {
      (async () => setActivityTypes(await getTypes()))();
    }, [getTypes]),
  );

  const onChipPress = (value: string) =>
    setSelectedChips(prev => {
      const newVal = new Set<string>(prev);
      if (newVal.has(value)) newVal.delete(value);
      else newVal.add(value);
      return newVal;
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          paddingR-16
          onPress={async () => {
            if (!schedule.activity) {
              showMessage('Type of activity is required');
              return;
            }

            if (!wheelRef.current.hours && !wheelRef.current.minutes) {
              showMessage('Duration must be greater than 0');
              return;
            }
            await save({
              activity: schedule.activity,
              duration: wheelRef.current.hours * 60 + wheelRef.current.minutes,
              days: Array.from(selectedChips || []).map(d => WEEK_DAYS[d]),
              initDate: schedule.initDate || moment().unix(),
            });
            navigation.goBack();
          }}
        >
          <Text text70M blue30>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, save, schedule, selectedChips, showMessage]);
  return (
    <View padding-16 backgroundColor="white" flex>
      <SelectorInput
        placeholder="Type"
        addOptionLabel="Add type"
        onAddOption={() =>
          navigation.navigate('NewActivityType', {
            onCreate: value => update('activity', value),
          })
        }
        data={activityTypes}
        selectOptionLabel="Select a type"
        onSelectOption={value => update('activity', value)}
        value={schedule.activity?.name || ''}
      />

      <TimeInput
        placeholder="Time"
        value={moment.unix(schedule.initDate || 0)}
        setTime={d => update('initDate', d.unix())}
      />

      <Text text70BO marginV-16>
        Duration
      </Text>
      <View row center>
        <View flex-1>
          <Incubator.WheelPicker
            label="Hours"
            numberOfVisibleRows={3}
            initialValue={wheelRef.current.hours}
            onChange={value => {
              wheelRef.current.hours = Number(value);
            }}
            items={Array.from({ length: 5 }, (_, i) => i).map(i => ({
              label: `${i}`,
              value: i,
            }))}
          />
        </View>
        <View flex-1>
          <Incubator.WheelPicker
            label="Minutes"
            initialValue={wheelRef.current.minutes}
            onChange={value => {
              wheelRef.current.minutes = Number(value);
            }}
            numberOfVisibleRows={3}
            items={Array.from({ length: 6 }, (_, i) => i * 10).map(i => ({
              label: `${i}`,
              value: i,
            }))}
          />
        </View>
      </View>
      <Text text70BO marginV-16>
        Repeat on
      </Text>
      <View row style={{ flexWrap: 'wrap' }}>
        {WEEK_DAY_NAMES.map(key => (
          <View key={key} row spread marginR-8 marginV-4 style={{}}>
            <Chip
              labelStyle={{
                fontSize: 12,
                color: selectedChips?.has(key) ? Colors.white : Colors.black,
              }}
              containerStyle={{
                padding: 8,
                borderColor: selectedChips?.has(key)
                  ? Colors.primary
                  : Colors.grey50,
              }}
              backgroundColor={
                selectedChips?.has(key) ? Colors.primary : Colors.white
              }
              label={`${key}`}
              onPress={() => onChipPress(key)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default NewScheduledActivity;
