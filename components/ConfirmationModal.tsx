import React from 'react';
import {
  PanningProvider,
  Colors,
  Dialog,
  Text,
  View,
  Button,
} from 'react-native-ui-lib';

type ConfirmationModalProps = {
  title: string;
  body: string;
  modalVisible: boolean;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  setModalVisible: (v: boolean) => void;
};
function ConfirmationModal({
  title,
  body,
  confirmLabel,
  cancelLabel,
  modalVisible,
  onConfirm,
  setModalVisible,
}: ConfirmationModalProps) {
  return (
    <Dialog
      visible={modalVisible}
      containerStyle={{
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 6,
      }}
      onDismiss={() => setModalVisible(false)}
      panDirection={PanningProvider.Directions.DOWN}
    >
      <Text text60 marginB-16>
        {title}
      </Text>
      <Text text70>{body}</Text>
      <View row paddingT-32>
        <View flex-1 paddingR-8>
          <Button backgroundColor={Colors.danger} onPress={onConfirm}>
            <Text text80M white>
              {confirmLabel}
            </Text>
          </Button>
        </View>
        <View flex-1 paddingL-8>
          <Button
            backgroundColor={Colors.grey30}
            onPress={() => setModalVisible(false)}
          >
            <Text text80M white>
              {cancelLabel}
            </Text>
          </Button>
        </View>
      </View>
    </Dialog>
  );
}
export default ConfirmationModal;
