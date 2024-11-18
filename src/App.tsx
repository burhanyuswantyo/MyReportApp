import React from 'react';
import {useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import Router from './navigation/Router';
import {Toasts} from '@backpackapp-io/react-native-toast';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './providers/UserProvider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <UserProvider>
            <Router />
            <Toasts />
          </UserProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
