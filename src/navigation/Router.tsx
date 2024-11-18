import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {useTheme} from 'react-native-paper';
import Register from '../screens/Register';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Profile from '../screens/Profile';

const Router = () => {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="login" component={Login} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerStyle: {backgroundColor: theme.colors.primary},
            headerTintColor: theme.colors.onPrimary,
          }}>
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{title: 'Profil'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
