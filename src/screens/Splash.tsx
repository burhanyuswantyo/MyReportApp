import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {createDatabase} from '../utils/database';
import {useUser} from '../providers/UserProvider';
import {getData} from '../utils/asyncStorage';

const Splash = ({navigation}: {navigation: NavigationProp<any>}) => {
  const logo = require('../assets/images/logo.png');
  const {signin} = useUser();

  useEffect(() => {
    createDatabase();
    setTimeout(() => {
      redirectIfAuthenticated();
    }, 2000);
  }, []);

  const redirectIfAuthenticated = async () => {
    let user = await getData('user');
    if (user) {
      signin(user);
      navigation.reset({
        index: 0,
        routes: [{name: 'home'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <ActivityIndicator />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {width: 150, height: 150, objectFit: 'contain'},
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
  },
});
