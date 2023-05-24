import {useDispatch, useSelector} from 'react-redux';
import {check_authenticated, refresh, load_tokens} from '../redux/actions/auth';

import React, {useEffect} from 'react';
import Navbar from '../components/navigation/navbar';
import Alert from '../components/alert';

export default function Layout(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
    dispatch(check_authenticated())
    //dispatch(load_tokens('all'))
  }, []);

  const alert = useSelector(state => state.Alert.alert);

  return (
    <>
      {props.children}
      {alert && <Alert message={alert.msg} type={alert.alertType} />}
      <Navbar navigation={props.navigation} />
    </>
  );
}
