import React from "react";
import { Colors, View, Text, TouchableOpacity } from "react-native-ui-lib";
import moment from "moment";

type RecentActivityProps = {
  language: string;
  navigation: any;
  activities: Activity[];
};
const RecentActivity = ({
  language,
  navigation,
  activities,
}: RecentActivityProps) => {
  return (
    <>
      <View
        style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey40 }}
        paddingB-8
        marginV-8
      >
        <Text text40R>Recent Activity</Text>
      </View>

      {activities.slice(0, 5).map((a) => (
        <View key={`${a.date}`} row marginV-8>
          <View flex>
            <Text text70L>{moment.unix(a.date || 0).format("DD/MM/YYYY")}</Text>
          </View>
          <View flex-3>
            <Text text70M>{a.description}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default RecentActivity;
