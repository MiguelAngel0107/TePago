import React, {useState} from 'react';

import {
  Text,
  Container,
  Heading,
  VStack,
  HStack,
  View,
  Box,
  Center,
} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native';

import OptionsDetail from '../../components/home/optionsDetail';
import ListContacts from '../../components/home/listContacts';

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = [
    {id: 0, name: 'Miguel Doe', phone: '123-456-7890'},
    {id: 1, name: 'Gabriel Smith', phone: '987-654-3210'},
    {id: 2, name: 'John Doe', phone: '123-456-7890'},
    {id: 3, name: 'Jane Smith', phone: '987-654-3210'},
    {id: 4, name: 'John Doe', phone: '123-456-7890'},
    {id: 5, name: 'Jane Smith', phone: '987-654-3210'},
    {id: 6, name: 'John Doe', phone: '123-456-7890'},
    {id: 7, name: 'Jane Smith', phone: '987-654-3210'},
    {id: 8, name: 'John Doe', phone: '123-456-7890'},
    {id: 9, name: 'Jane Smith', phone: '987-654-3210'},

    // Add more contacts here...
  ];

  const handleContactPress = contact => {
    if (selectedContact && contact.id == selectedContact.id) {
      setSelectedContact(null);
    } else {
      setSelectedContact(contact);
    }
  };

  return (
    <>
      <View style={{flex: 1}} bg="bgColor.300">
        <VStack>
          {selectedContact ? (
            <OptionsDetail selectedContact={selectedContact} />
          ) : null}
          {contacts ? <ListContacts contacts={contacts} handleContactPress={handleContactPress} /> : null}
        </VStack>
      </View>
    </>
  );
}

export default Home;
