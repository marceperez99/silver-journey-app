import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  View,
  Text,
  ColorPicker,
  Colors,
  Incubator,
  Typography,
  TouchableOpacity,
} from 'react-native-ui-lib';
import useActivityType from '../../hooks/useActivityType';
import { HomeNavProps } from '../types';

function NewActivityType({
  navigation,
  route: {
    params: { onCreate },
  },
}: HomeNavProps<'NewActivityType'>) {
  const { save } = useActivityType();
  const [type, setType] = useState({ name: '', color: '' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (field: string, value: any) =>
    setType(prev => ({ ...prev, [field]: value }));

  const [colors, setColors] = useState([
    Colors.red10,
    Colors.green10,
    Colors.blue10,
    Colors.yellow10,
  ]);
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          paddingR-16
          onPress={async () => {
            const t = await save({ color: type.color, name: type.name });
            onCreate(t);
            navigation.goBack();
          }}
        >
          <Text text70M blue30>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, save, type, onCreate]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View paddingH-16 paddingT-16>
        <Incubator.TextField
          animated
          text
          label="Name"
          onChangeText={value => update('name', value)}
          containerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.grey50,
          }}
          paddingV-16
          labelStyle={Typography.text70R}
          style={{ fontSize: 18 }}
        />

        <Text text70R marginT-16>
          Choose a color
        </Text>
      </View>
      <ColorPicker
        colors={colors}
        initialColor={Colors.green10}
        value={type.color}
        onSubmit={color => setColors(prev => [...prev, color])}
        onValueChange={c => update('color', c)}
      />
    </ScrollView>
  );
}

export default NewActivityType;
