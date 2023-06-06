import React, {useEffect, useState} from 'react';

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
import {useDispatch, useSelector} from 'react-redux';
import {select_contact} from '../../redux/actions/contacts';

function Home({navigation}) {
  const dispatch = useDispatch();
  const select_contact_var = useSelector(
    state => state.Contacts.contact_select,
  );
  const contacts = useSelector(state => state.Contacts.contacts);
  const [listContacts, setListContacts] = useState([
    {id: 0, nombre: 'Miguel Egocheaga', telefono: '123-456-7890'},
    {id: 1, nombre: 'Gabriel Smith', telefono: '987-654-3210'},
    {id: 2, nombre: 'Juan Doe', telefono: '123-456-7890'},
    {id: 3, nombre: 'Jane Smith', telefono: '987-654-3210'},
    {id: 4, nombre: 'John Doe', telefono: '123-456-7890'},
    {id: 5, nombre: 'Jane Smith', telefono: '987-654-3210'},
    {id: 6, nombre: 'John Doe', telefono: '123-456-7890'},
    {id: 7, nombre: 'Jane Smith', telefono: '987-654-3210'},
    {id: 8, nombre: 'John Doe', telefono: '123-456-7890'},
    {id: 9, nombre: 'Jane Smith', telefono: '987-654-3210'},
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  useEffect(() => {
    if (contacts) {
      setListContacts(contacts);
    }
  }, [contacts]);
  useEffect(() => {
    if (select_contact_var) {
      setSelectedContact(select_contact_var);
    }else{
      setSelectedContact(null)
    }
  }, [select_contact_var]);

  const handleContactPress = contact => {
    if (selectedContact && contact.id == selectedContact.id) {
      dispatch(select_contact(null));
    } else {
      dispatch(select_contact(contact));
    }
  };

  return (
    <Layout navigation={navigation}>
      <View style={{flex: 1}} bg="bgColor.400">
        <VStack>
          <OptionsDetail selectedContact={selectedContact} />
          {listContacts ? (
            <ListContacts
              contacts={listContacts}
              handleContactPress={handleContactPress}
            />
          ) : null}
        </VStack>
      </View>
    </Layout>
  );
}

export default Home;
