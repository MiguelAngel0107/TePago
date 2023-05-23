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

import Layout from '../../layout/layout';

function Home({navigation}) {
  const [selectedContact, setSelectedContact] = useState({
    id: 0,
    name: '',
    phone: '',
  });

  const contacts = [
    {id: 0, name: 'Miguel Doe', phone: '123-456-7890'},
    {id: 1, name: 'Gabriel Smith', phone: '987-654-3210'},
    {id: 2, name: 'Juan Doe', phone: '123-456-7890'},
    {id: 3, name: 'Jane Smith', phone: '987-654-3210'},
    {id: 4, name: 'John Doe', phone: '123-456-7890'},
    {id: 5, name: 'Jane Smith', phone: '987-654-3210'},
    {id: 6, name: 'John Doe', phone: '123-456-7890'},
    {id: 7, name: 'Jane Smith', phone: '987-654-3210'},
    {id: 8, name: 'John Doe', phone: '123-456-7890'},
    {id: 9, name: 'Jane Smith', phone: '987-654-3210'},
  ];

  const handleContactPress = contact => {
    if (selectedContact && contact.id == selectedContact.id) {
      setSelectedContact({
        id: 0,
        name: '',
        phone: '',
      });
    } else {
      setSelectedContact(contact);
    }
  };

  return (
    <Layout navigation={navigation}>
      <View style={{flex: 1}} bg="bgColor.400">
        <VStack>
          <OptionsDetail selectedContact={selectedContact} />
          {contacts ? (
            <ListContacts
              contacts={contacts}
              handleContactPress={handleContactPress}
            />
          ) : null}
        </VStack>
      </View>
    </Layout>
  );
}

export default Home;
