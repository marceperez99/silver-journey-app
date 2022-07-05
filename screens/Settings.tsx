import React, { useState } from 'react';
import { Share } from 'react-native';
import { Button, Colors, Text, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmationModal from '../components/ConfirmationModal';

function Settings() {
  const [modalVisible, setModalVisible] = useState<boolean>();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.white, padding: 16 }}
    >
      <View flex-1 />

      <Button
        marginV-16
        backgroundColor={Colors.grey80}
        onPress={() => Share.share({ message: 'Hola! jaja' })}
      >
        <Text text70M>Share with a friend</Text>
      </Button>
      <Button
        backgroundColor={Colors.danger}
        onPress={() => setModalVisible(true)}
      >
        <Text text70M white>
          Delete all data
        </Text>
      </Button>
      <ConfirmationModal
        modalVisible={!!modalVisible}
        setModalVisible={setModalVisible}
        body="Are you sure you want to delete all your data?"
        title="Warning"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onConfirm={() => {
          AsyncStorage.clear();
          setModalVisible(false);
        }}
      />
      <Text center marginT-16>
        Warning! The following action is permanent
      </Text>
    </SafeAreaView>
  );
}

export default Settings;
