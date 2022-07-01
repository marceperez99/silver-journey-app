import React from "react";
import { ScrollView } from "react-native";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = ({}) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.white, padding: 16 }}
    >
      <View flex-1 />

      <Button
        marginV-16
        backgroundColor={Colors.grey80}
        onPress={() => AsyncStorage.clear()}
      >
        <Text text70M>Share with a friend</Text>
      </Button>
      <Button
        backgroundColor={Colors.danger}
        onPress={() => AsyncStorage.clear()}
      >
        <Text text70M white>
          Delete all data
        </Text>
      </Button>
      <Text center marginT-16>
        Warning! The following action is permanent
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
