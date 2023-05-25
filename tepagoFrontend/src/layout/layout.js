import {useDispatch, useSelector} from 'react-redux';
import {check_authenticated, refresh, load_tokens} from '../redux/actions/auth';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';
import Navbar from '../components/navigation/navbar';
import Alert from '../components/alert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default function Layout(props) {
  const dispatch = useDispatch();
  const drawer = useRef(null);

  useEffect(() => {
    dispatch(refresh());
    dispatch(check_authenticated());
    //dispatch(load_tokens('all'))
  }, []);

  const alert = useSelector(state => state.Alert.alert);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}>
      {props.children}
      {alert && <Alert message={alert.msg} type={alert.alertType} />}
      <Navbar navigation={props.navigation} />
    </DrawerLayoutAndroid>
  );
}
