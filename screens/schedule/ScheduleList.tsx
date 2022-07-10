import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeNavProps, HomeParamList } from '../types';
import VoidSVG from '../../assets/void';

import LineSeparator from '../../components/LineSeparator';
import { Schedule } from '../../models/schedule';
import useSchedule from '../../hooks/useSchedule';

function ListItem({
  item,
  navigation,
  date,
  language,
}: {
  item: Schedule;
  date: moment.Moment;
  language: string;
  navigation: StackNavigationProp<HomeParamList, 'ScheduleList', undefined>;
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ScheduleActivity', {
          scheduleActivityUuid: `${item.uuid}`,
          date,
          language,
        })
      }
    >
      <View padding-16 row backgroundColor="white">
        <View flex>
          <Text text70>{item.activity.name}</Text>
          <Text text80L>{item.duration} min</Text>
        </View>
        <View center>
          <Text text70>{`${moment
            .unix(item.initDate)
            .format('HH:mm')} to ${moment
            .unix(item.initDate)
            .add(item.duration, 'minutes')
            .format('HH:mm')}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function EmptyList() {
  const { width, height } = useWindowDimensions();
  return (
    <View center marginT-32>
      <VoidSVG width={width - 32} height={height / 4} />
      <Text center text60L marginH-16 marginT-32>
        No activities registered
      </Text>
    </View>
  );
}
function ScheduleList({
  navigation,
  route: {
    params: { language },
  },
}: HomeNavProps<'ScheduleList'>) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<moment.Moment>(moment());
  const { getSchedule } = useSchedule();
  const [activities, setActivities] = useState<Schedule[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setActivities(await getSchedule(date));
      })();
    }, [date, getSchedule]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          paddingR-16
          onPress={() =>
            navigation.navigate('NewScheduledActivity', { language, date })
          }
        >
          <AntDesign name="plus" size={25} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, language, date]);

  return (
    <View flex backgroundColor={Colors.white}>
      <View
        row
        style={{ borderBottomWidth: 1, borderColor: Colors.grey60 }}
        center
      >
        <TouchableOpacity
          paddingH-16
          paddingV-14
          onPress={() => setDate(prev => prev.clone().add(-1, 'day'))}
        >
          <AntDesign name="left" size={18} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity flex-1 center onPress={() => setModalVisible(true)}>
          <Text text70M color={Colors.primaryDark}>
            {date.format('DD/MM/YYYY')}
          </Text>
          <DateTimePickerModal
            mode="date"
            display="inline"
            isVisible={modalVisible}
            onConfirm={d => {
              setDate(moment(d));
              setModalVisible(false);
            }}
            onCancel={() => setModalVisible(false)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          paddingH-16
          paddingV-14
          onPress={() => setDate(prev => prev.clone().add(1, 'day'))}
        >
          <AntDesign name="right" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={activities}
        keyExtractor={item => `${item.uuid}`}
        ItemSeparatorComponent={LineSeparator}
        ListEmptyComponent={EmptyList}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            navigation={navigation}
            date={date}
            language={language}
          />
        )}
      />
    </View>
  );
}

export default ScheduleList;
