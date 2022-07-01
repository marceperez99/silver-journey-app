import React, { useCallback, useMemo, useState } from "react";
import {
  Animated,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { Colors, TouchableOpacity, View, Text } from "react-native-ui-lib";
import { COLOR_RANGE } from "../colors";
import { Entypo } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HomeNavProps, HomeParamList } from "../screens/types";
import useLanguageProgress from "../hooks/useLanguageProgress";
import moment, { lang } from "moment";
import RecentActivity from "./RecentActivity";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useToast } from "../hooks/useToast";

type PieChartData = {
  name: string;
  activity: string;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};
type PieChartSectionProps = {
  activities: Activity[];
};
const PieChartSection = ({ activities }: PieChartSectionProps) => {
  const { width } = useWindowDimensions();
  const activityData = useMemo<PieChartData[]>(() => {
    const activitiesMap: { [key: string]: any } = {};
    activities.forEach((activity: Activity) => {
      if (!activitiesMap[activity.type.name]) {
        activitiesMap[activity.type.name] = {
          name: activity.type.name,
          activity: activity.duration,
          color: activity.type.color,
          legendFontColor: "#7F7F7F",
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
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
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
      <View row marginB-16 style={{ flexWrap: "wrap" }}>
        {activityData.map((dot) => (
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
};
type OptionProps = {
  color: string;
  style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
  children: any;
  onPress: () => void;
};
const Option = ({ color, style, children, onPress }: OptionProps) => {
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
};
type ButtonsProps = {
  language: string;
  navigation: StackNavigationProp<HomeParamList, "HomeScreen">;
};
const Buttons = ({ language, navigation }: ButtonsProps) => {
  const { showMessage } = useToast();
  return (
    <View row marginB-16>
      <Option
        color={Colors.primary}
        style={{ marginRight: 8 }}
        onPress={() => navigation.navigate("AddEntry", { language })}
      >
        <Text text60L white>
          Add
        </Text>
        <Text text60 white>
          Activity Record
        </Text>
      </Option>
      <Option
        color={Colors.primaryDark}
        style={{ marginLeft: 8 }}
        onPress={() => showMessage("I'm working on this. Just hang on!!")}
      >
        <Text text60L white>
          Add
        </Text>
        <Text text60 white>
          Goal
        </Text>
      </Option>
    </View>
  );
};
type LanguageDashboardProps = {
  language: string;
  navigation: StackNavigationProp<HomeParamList, "HomeScreen">;
};
const LanguageDashboard = ({
  language,
  navigation,
}: LanguageDashboardProps) => {
  const { getProgress } = useLanguageProgress(language);
  const [activities, setActivities] = useState<Activity[]>([]);
  useFocusEffect(
    useCallback(() => {
      (async () => setActivities(await getProgress()))();
    }, [])
  );

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* <TouchableOpacity
        row
        padding-16
        marginB-16
        br30
        activeOpacity={0.6}
        backgroundColor={Colors.primaryDark}
      >
        <View flex>
          <Text text50M color={Colors.textColor}>
            10-day streak! 🎉
          </Text>
        </View>
        <Entypo name="chevron-right" size={24} color={Colors.white} />
      </TouchableOpacity> */}
      {!!activities.length && <PieChartSection activities={activities} />}
      <Buttons language={language} navigation={navigation} />
      {!!activities.length && (
        <RecentActivity
          activities={activities}
          navigation={navigation}
          language={language}
        />
      )}
    </ScrollView>
  );
};
export default LanguageDashboard;
