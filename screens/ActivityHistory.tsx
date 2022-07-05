import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Colors,
  Drawer,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useLanguageProgress from '../hooks/useLanguageProgress';
import { HomeNavProps } from './types';
import VoidSVG from '../assets/void';
import ConfirmationModal from '../components/ConfirmationModal';
import LineSeparator from '../components/LineSeparator';

function ListItem({
  item,
  onDelete,
}: {
  item: Activity;
  onDelete: () => void;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <Drawer
      rightItems={[
        {
          text: 'Delete',
          background: Colors.danger,
          onPress: () => setIsVisible(true),
        },
      ]}
    >
      <View padding-16 row backgroundColor="white">
        <View flex>
          <Text text70>{item.type.name}</Text>
          <Text text80L>{item.description}</Text>
        </View>
        <View center>
          <Text text70>{`${item.duration} min`}</Text>
        </View>
      </View>
      <ConfirmationModal
        modalVisible={isVisible}
        title="Warning"
        body="Are you sure you want to delete the activity?"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onConfirm={onDelete}
        setModalVisible={setIsVisible}
      />
    </Drawer>
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
function ActivityHistory({
  navigation,
  route: {
    params: { language },
  },
}: HomeNavProps<'ActivityHistory'>) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<moment.Moment>(moment());
  const { getProgress, remove } = useLanguageProgress(language);
  const [activities, setActivities] = useState<Activity[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setActivities(
          (await getProgress()).filter(a =>
            date.startOf('day').isSame(moment.unix(a.date || 0).startOf('day')),
          ),
        );
      })();
    }, [date, getProgress]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          paddingR-16
          onPress={() => navigation.navigate('AddEntry', { language })}
        >
          <AntDesign name="plus" size={25} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, language]);
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
            onDelete={() => {
              setActivities(prev => prev.filter(a => a.uuid !== item.uuid));
              if (item.uuid) remove(item.uuid);
            }}
          />
        )}
      />
    </View>
  );
}

export default ActivityHistory;
