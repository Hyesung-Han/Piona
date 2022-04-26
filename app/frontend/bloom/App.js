/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, BackHandler, Alert} from 'react-native';
import {configureStore} from 'redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import MyApp from './src/navigations/MyAppNav';
//import UserReducer from './src/redux/reducers';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#F2A7B3"
        translucent={true}
      />
      <NavigationContainer>
        <MyApp />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
