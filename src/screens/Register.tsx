import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import useForm from '../utils/useForm';
import {registerUser} from '../utils/database';
import bcrypt from 'react-native-bcrypt';
import {deleteDatabase} from 'react-native-sqlite-storage';
import {toast} from '@backpackapp-io/react-native-toast';

const Register = ({navigation}: {navigation: NavigationProp<any>}) => {
  const logo = require('../assets/images/logo.png');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useForm({
    name: 'Yuswan',
    username: 'yuswan',
    password: 'yuswan',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    await bcrypt.genSalt(10, async function (genSaltErr, salt) {
      await bcrypt.hash(form.password, salt, async function (hashErr, hash) {
        const register = await registerUser({
          name: form.name,
          username: form.username,
          password: hash,
        });
        setLoading(false);
        if (register?.error) {
          toast.error(register.message);
          return;
        } else {
          toast.success('Berhasil mendaftar');
          navigation.navigate('login');
        }
      });
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewHeader}>
        <Image source={logo} style={styles.image} />
        <Text variant="titleMedium">Silahkan melakukan pendaftaran</Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          autoCapitalize="words"
          mode="outlined"
          label="Nama"
          value={form.name}
          onChangeText={value => setForm('name', value)}
        />
        <TextInput
          autoCapitalize="none"
          mode="outlined"
          label="Username"
          value={form.username}
          onChangeText={value => setForm('username', value.replace(/\s/g, ''))}
        />
        <TextInput
          onChangeText={value => setForm('password', value.replace(/\s/g, ''))}
          autoCapitalize="none"
          mode="outlined"
          label="Password"
          value={form.password}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              forceTextInputFocus={false}
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <View style={styles.viewButton}>
        <Button mode="contained" loading={loading} onPress={handleRegister}>
          Daftar
        </Button>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate('login')}>
          <Text variant="bodyMedium">Klik disini untuk masuk</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  viewButton: {gap: 8},
  viewInput: {gap: 12, marginBottom: 16},
  viewHeader: {alignItems: 'center', gap: 16, marginBottom: 12},
  image: {width: 100, height: 100, objectFit: 'contain'},
  container: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: 24,
  },
  touchableOpacity: {
    alignItems: 'center',
  },
});
