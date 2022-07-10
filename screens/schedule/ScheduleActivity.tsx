/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Button,
  Colors,
  TouchableOpacity,
} from 'react-native-ui-lib';
import * as _ from 'lodash';
import moment from 'moment';
import useSchedule from '../../hooks/useSchedule';
import { Schedule, WEEK_DAYS } from '../../models/schedule';
import { HomeNavProps } from '../types';
import useLanguageProgress from '../../hooks/useLanguageProgress';

function ScheduleActivity({
  navigation,
  route: {
    params: { scheduleActivityUuid, date, language },
  },
}: HomeNavProps<'ScheduleActivity'>) {
  const [scheduledActivity, setScheduledActivity] = useState<
    Schedule | undefined
  >(undefined);
  const { bottom } = useSafeAreaInsets();
  const { getProgress, save } = useLanguageProgress(language);
  const { getByUUID } = useSchedule();
  const [markIsDoneButton, setMarkIsDoneButton] = useState<boolean | undefined>(
    false,
  );
  useEffect(() => {
    getByUUID(scheduleActivityUuid).then(setScheduledActivity);
  }, [getByUUID, scheduleActivityUuid]);
  useEffect(() => {
    getProgress().then(activities => {
      setMarkIsDoneButton(
        date.startOf('day').isSame(moment().startOf('day')) &&
          !activities.some(
            activity =>
              activity.type.uuid === scheduledActivity?.activity.uuid &&
              moment
                .unix(activity.date || 0)
                .startOf('day')
                .isSame(date.startOf('day')),
          ),
      );
    });
  }, [date, getProgress, scheduledActivity]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity paddingR-16>
          <Ionicons name="ios-trash-outline" size={24} color={Colors.danger} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View
      flex
      padding-16
      backgroundColor="white"
      style={{ paddingBottom: bottom + 16 }}
    >
      <View flex>
        <Text text80L>Activity</Text>
        <Text text60R>{scheduledActivity?.activity.name}</Text>
        <Text text80L marginT-16>
          Days
        </Text>
        <Text text60R>
          {scheduledActivity?.days
            .map(d => _.capitalize(WEEK_DAYS[d]))
            .join(', ')}
        </Text>
      </View>

      {markIsDoneButton === true && (
        <Button
          backgroundColor={Colors.primary}
          centerV
          enableShadow
          onPress={() => {
            if (scheduledActivity === undefined) return;
            save({
              type: scheduledActivity?.activity,
              date: date
                .set({
                  hour: moment.unix(scheduledActivity.initDate).hour(),
                  minute: moment.unix(scheduledActivity.initDate).minute(),
                })
                .unix(),
              duration: scheduledActivity.duration,
              description: '',
            });
            setMarkIsDoneButton(false);
          }}
        >
          <Ionicons name="checkmark-sharp" size={22} color="white" />
          <Text white text70BO marginL-4>
            Mark as Done
          </Text>
        </Button>
      )}
    </View>
  );
}

export default ScheduleActivity;
