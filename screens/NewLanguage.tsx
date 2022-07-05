import React, { useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import {
  View,
  Text,
  Colors,
  Button,
  TouchableOpacity,
  PanningProvider,
  Dialog,
} from 'react-native-ui-lib';
import { ToastPresets } from 'react-native-ui-lib/src/incubator';
import NewLanguageSVG from '../assets/newLanguage';
import LineSeparator from '../components/LineSeparator';
import { LANGUAGES } from '../constants';
import { NewLanguage } from '../hooks/useLanguages';
import { useToast } from '../hooks/useToast';

function NewLanguageView({
  createLanguage,
}: {
  createLanguage: (data: NewLanguage) => void;
}) {
  const { width, height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { showMessage } = useToast();
  return (
    <View>
      <View style={{ padding: 16 }}>
        <NewLanguageSVG width={width - 32} height={height / 2} />
      </View>
      <Text center text40M marginH-16>
        Ready to learn a new Language?
      </Text>
      <Text center text70L margin-16>
        Add a new Language and start your journey
      </Text>
      <Button
        br50
        margin-16
        backgroundColor={Colors.primaryDark}
        onPress={() => setModalVisible(true)}
      >
        <Text white text70>
          Add a new Language
        </Text>
      </Button>
      <Dialog
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        containerStyle={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 8,
        }}
        panDirection={PanningProvider.Directions.DOWN}
      >
        <View>
          <Text text60M marginB-16>
            Select a Language
          </Text>

          <FlatList
            data={Object.values(LANGUAGES)}
            style={{ maxHeight: height / 2 }}
            keyExtractor={item => `${item}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                paddingV-16
                onPress={async () => {
                  try {
                    await createLanguage({ name: item });
                    setModalVisible(false);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (e: any) {
                    setModalVisible(false);
                    showMessage(e.message, { style: ToastPresets.FAILURE });
                  }
                }}
              >
                <Text text70L>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={LineSeparator}
          />
        </View>
      </Dialog>
    </View>
  );
}

export default NewLanguageView;
