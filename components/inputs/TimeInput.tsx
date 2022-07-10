import moment from 'moment';
import React, { useState } from 'react';
import { Colors, Incubator } from 'react-native-ui-lib';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type TimeInputProps = {
  value: moment.Moment;
  placeholder: string;
  setTime: (d: moment.Moment) => void;
};
const TIME_FORMAT = 'HH:mm';
function TimeInput({ value, placeholder, setTime }: TimeInputProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <Incubator.TextField
        animated
        text
        floatingPlaceholder
        padding-16
        showSoftInputOnFocus={false}
        value={value.format(TIME_FORMAT)}
        onPressIn={() => setModalVisible(true)}
        placeholder={placeholder}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.grey50,
        }}
        style={{ fontSize: 18, color: Colors.black }}
      />
      <DateTimePickerModal
        mode="time"
        date={value.toDate()}
        isVisible={modalVisible}
        onConfirm={d => {
          setTime(moment(d));
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
}

export default TimeInput;
