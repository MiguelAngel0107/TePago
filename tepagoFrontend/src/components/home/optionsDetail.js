import {View, Text, HStack} from 'native-base';
import React from 'react';

export default function OptionsDetail(props) {
  const SelectedContact = props.selectedContact;

  return (
    <View
      style={{
        height: '30%',
        width: '100%',
        marginBottom: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      bg="bgColor.100">
      <Text>{SelectedContact.name}</Text>
      <Text>{SelectedContact.phone}</Text>
      {/* Add more detailed information here */}
    </View>
  );
}
