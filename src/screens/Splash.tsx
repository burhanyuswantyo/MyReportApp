import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {createDatabase} from '../utils/database';
import {useUser} from '../providers/UserProvider';

const Splash = ({navigation}: {navigation: NavigationProp<any>}) => {
  const logo = require('../assets/images/logo.png');
  const {user} = useUser();

  useEffect(() => {
    console.log(user);
    setTimeout(() => {
      createDatabase();
      navigation.navigate('login');
    }, 2000);
  }, []);

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
