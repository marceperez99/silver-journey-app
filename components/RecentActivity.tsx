import React from 'react';
import { Colors, View, Text } from 'react-native-ui-lib';
import moment from 'moment';
import { Activity } from '../models/activity';

type RecentActivityProps = {
  activities: Activity[];
};
function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <>
      <View
        style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey40 }}
        paddingB-8
        marginV-8
      >
        <Text text40R>Recent Activity</Text>
      </View>

      {activities.slice(0, 5).map(a => (
        <View key={`${a.timestamp}`} row marginV-8>
          <View flex>
            <Text text70L>{moment.unix(a.date || 0).format('DD/MM/YYYY')}</Text>
          </View>
          <View flex-3>
            <Text text70M>{a.description}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

export default RecentActivity;
