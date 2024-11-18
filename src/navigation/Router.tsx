import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {useTheme} from 'react-native-paper';
import Register from '../screens/Register';
import Splash from '../screens/Splash';
import Login from '../screens/Login';

const Router = () => {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          contentStyle: {backgroundColor: theme.colors.background},
          headerShown: false,
          headerStyle: {backgroundColor: theme.colors.primary},
          headerTintColor: theme.colors.onPrimary,
        }}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
