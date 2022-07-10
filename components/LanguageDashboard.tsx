import React, { useCallback, useMemo, useState } from 'react';
import {
  Animated,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { Colors, TouchableOpacity, View, Text } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../screens/types';
import useLanguageProgress from '../hooks/useLanguageProgress';
import RecentActivity from './RecentActivity';

import { Activity } from '../models/activity';

type PieChartData = {
  name: string;
  activity: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};
type PieChartSectionProps = {
  activities: Activity[];
};
function PieChartSection({ activities }: PieChartSectionProps) {
  const { width } = useWindowDimensions();
  const activityData = useMemo<PieChartData[]>(() => {
    const activitiesMap: { [key: string]: PieChartData } = {};
    activities.forEach((activity: Activity) => {
      if (!activitiesMap[activity.type.name]) {
        activitiesMap[activity.type.name] = {
          name: activity.type.name,
          activity: activity.duration,
          color: activity.type.color,
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        };
      } else {
        activitiesMap[activity.type.name].activity += activity.duration;
      }
    });
    return Object.values(activitiesMap) || [];
  }, [activities]);
  return (
    <>
      <View
        paddingB-8
        marginV-8
        style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey40 }}
      >
        <Text text40R>My activities</Text>
      </View>
      <PieChart
        data={activityData}
        width={width - 16 * 4}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        center={[(width - 16 * 4) / 4, 0]}
        accessor="activity"
        backgroundColor="transparent"
        paddingLeft="15"
        hasLegend={false}
        absolute
      />
      <View row marginB-16 style={{ flexWrap: 'wrap' }}>
        {activityData.map(dot => (
          <View row center key={dot.name}>
            <FontAwesome
              name="circle"
              size={20}
              color={dot.color}
              style={{ paddingHorizontal: 8 }}
            />
            <Text>{dot.name}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
export type OptionProps = {
  color: string;
  // eslint-disable-next-line react/require-default-props
  style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
  children: JSX.Element | JSX.Element[];
  onPress: () => void;
};
function Option({ color, style = {}, children, onPress }: OptionProps) {
  return (
    <TouchableOpacity
      flex-1
      backgroundColor={color}
      br20
      padding-16
      style={style}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
type ButtonsProps = {
  language: string;
  navigation: StackNavigationProp<HomeParamList, 'HomeScreen'>;
};
function Buttons({ language, navigation }: ButtonsProps) {
  return (
    <View>
      <View row marginB-16>
        <Option
          color={Colors.primary}
          style={{ marginRight: 8 }}
          onPress={() => navigation.navigate('AddEntry', { language })}
        >
          <Text text60L white>
            Add
          </Text>
          <Text text60 white>
            Activity Record
          </Text>
        </Option>
        <Option
          color={Colors.primary}
          style={{ marginLeft: 8 }}
          onPress={() => navigation.navigate('ScheduleList', { language })}
        >
          <Text text60L white>
            Check
          </Text>
          <Text text60 white>
            Schedule
          </Text>
        </Option>
      </View>
      <View row marginB-16>
        <Option
          color={Colors.primaryDark}
          onPress={() => navigation.navigate('ActivityHistory', { language })}
        >
          <Text text60L white>
            Check
          </Text>
          <Text text60 white>
            Activities
          </Text>
        </Option>
      </View>
    </View>
  );
}
type LanguageDashboardProps = {
  language: string;
  navigation: StackNavigationProp<HomeParamList, 'HomeScreen'>;
};
function LanguageDashboard({ language, navigation }: LanguageDashboardProps) {
  const { getProgress } = useLanguageProgress(language);
  const [activities, setActivities] = useState<Activity[]>([]);
  useFocusEffect(
    useCallback(() => {
      (async () => setActivities(await getProgress()))();
    }, [getProgress]),
  );

  return (
    <ScrollView
      style={{ paddingHorizontal: 16 }}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      {!!activities.length && <PieChartSection activities={activities} />}
      <Buttons language={language} navigation={navigation} />
      {!!activities.length && <RecentActivity activities={activities} />}
    </ScrollView>
  );
}
export default LanguageDashboard;
