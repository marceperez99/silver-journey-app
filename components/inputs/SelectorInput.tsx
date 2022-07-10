/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {
  Colors,
  Dialog,
  Incubator,
  PanningProvider,
  Text,
  TouchableOpacity,
} from 'react-native-ui-lib';
import LineSeparator from '../LineSeparator';

type SelectorInputProps = {
  placeholder: string;
  value: string;
  data: any[];
  onSelectOption: (value: any) => void;
  addOptionLabel: string;
  selectOptionLabel: string;
  onAddOption: () => void;
};
function SelectorInput({
  value,
  data,
  onSelectOption,
  placeholder,
  addOptionLabel,
  onAddOption,
  selectOptionLabel,
}: SelectorInputProps) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Incubator.TextField
        animated
        text
        floatingPlaceholder
        padding-16
        showSoftInputOnFocus={false}
        value={value}
        onPressIn={() => setVisible(true)}
        placeholder={placeholder}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.grey50,
        }}
        style={{ fontSize: 18, color: Colors.black }}
      />
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        containerStyle={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 8,
        }}
        panDirection={PanningProvider.Directions.DOWN}
      >
        <Text text60 marginB-16>
          {selectOptionLabel}
        </Text>
        <FlatList
          data={data}
          keyExtractor={item => `${item.uuid}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.uuid}
              paddingV-16
              onPress={() => {
                setVisible(false);
                onSelectOption(item);
              }}
            >
              <Text text70L>{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={LineSeparator}
        />
        {!!addOptionLabel && (
          <TouchableOpacity
            marginT-16
            onPress={() => {
              setVisible(false);
              onAddOption();
            }}
          >
            <Text text70M blue40 center>
              {addOptionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </Dialog>
    </>
  );
}
export default SelectorInput;
