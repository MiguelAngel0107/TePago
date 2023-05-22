import {Text, VStack, Box, Image, HStack, Flex} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef, useEffect} from 'react';

export default function ListContacts(props) {
  const myRefs = useRef([]);

  useEffect(() => {
    if (myRefs.current) {
      myRefs.current.forEach((ref) => {
        const styleObj = {
          borderWidth: 5,
          borderColor: '#1a1e3b',
        };
        ref?.setNativeProps({
          style: styleObj,
        });
      });
    }
  }, []);

  const contacts = props.contacts;

  return (
    <ScrollView>
      <VStack space={2} p={2}>
        {contacts.map((contact, index) => (
          <Flex key={contact.id} py={5} direction="row" alignItems="center">
            <Box px={6}>
              <Image
                source={{
                  uri: 'https://wallpaperaccess.com/full/317501.jpg',
                }}
                borderRadius={100}
                alt="Alternate Text"
                size="sm"
              />
            </Box>
            <TouchableOpacity onPress={() => props.handleContactPress(contact)}>
              <Box
                ref={(ref) => (myRefs.current[index] = ref)}
                bg="bgColor.200"
                borderRadius={8}
                px={4}
                py={2}>
                <Text
                  color="textColor.100"
                  fontSize={24}
                  fontWeight={'light'}
                  textAlign={'center'}>
                  {contact.name}
                </Text>
              </Box>
            </TouchableOpacity>
          </Flex>
        ))}
      </VStack>
    </ScrollView>
  );
}