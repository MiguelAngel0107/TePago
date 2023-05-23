import {View, Text} from 'react-native';
import React from 'react';
import Navbar from '../components/navigation/navbar';

export default function Layout(props) {
  return (
    <>
      {props.children}
      <Navbar navigation={props.navigation} />
    </>
  );
}
