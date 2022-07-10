import moment from 'moment';
import React, { useState } from 'react';
import { Colors, Incubator } from 'react-native-ui-lib';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type DateInputProps = {
  value: moment.Moment;
  placeholder: string;
  setDate: (d: moment.Moment) => void;
};
const DATE_FORMAT = 'DD/MM/YYYY';
function DateInput({ value, placeholder, setDate }: DateInputProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <Incubator.TextField
        animated
        text
        floatingPlaceholder
        padding-16
        showSoftInputOnFocus={false}
        value={value.format(DATE_FORMAT)}
        onPressIn={() => setModalVisible(true)}
        placeholder={placeholder}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.grey50,
        }}
        style={{ fontSize: 18, color: Colors.black }}
      />
      <DateTimePickerModal
        mode="date"
        display="inline"
        date={value.toDate()}
        isVisible={modalVisible}
        onConfirm={d => {
          setDate(moment(d));
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
}

export default DateInput;
