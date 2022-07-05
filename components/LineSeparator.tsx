import React from 'react';
import { Colors, View } from 'react-native-ui-lib';

function LineSeparator(): JSX.Element {
  return (
    <View style={{ borderBottomColor: Colors.grey60, borderBottomWidth: 1 }} />
  );
}

export default LineSeparator;
