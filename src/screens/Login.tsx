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
import {loginUser} from '../utils/database';
import {toast} from '@backpackapp-io/react-native-toast';
import {useUser} from '../providers/UserProvider';

const Login = ({navigation}: {navigation: NavigationProp<any>}) => {
  const logo = require('../assets/images/logo.png');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useForm({
    username: 'yuswan',
    password: 'yuswan',
  });
  const [loading, setLoading] = useState(false);
  const {signin} = useUser();

  const handleLogin = async () => {
    setLoading(true);
    const login = await loginUser(form);
    setLoading(false);
    if (login?.error) {
      toast.error(login?.message);
    } else {
      signin({
        user_id: login?.user?.user_id,
        name: login?.user?.name,
        username: login?.user?.username,
      });
      toast.success(login?.message);
      navigation.navigate('home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewHeader}>
        <Image source={logo} style={styles.image} />
        <Text variant="titleMedium">Silahkan masuk untuk melanjutkan</Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          mode="outlined"
          label="Username"
          value={form.username}
          onChangeText={value => setForm('username', value)}
        />
        <TextInput
          value={form.password}
          onChangeText={value => setForm('password', value)}
          mode="outlined"
          label="Password"
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
        <Button mode="contained" loading={loading} onPress={handleLogin}>
          Login
        </Button>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate('register')}>
          <Text variant="bodyMedium">Klik disini untuk daftar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewButton: {gap: 8},
  viewInput: {gap: 12, marginBottom: 16},
  viewHeader: {alignItems: 'center', gap: 12, marginBottom: 12},
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
