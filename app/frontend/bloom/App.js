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
import SplashScreen from 'react-native-splash-screen'; /** 추가 **/
//import UserReducer from './src/redux/reducers';

/**
 * LDJ | 2022.04.26
 * @name App.js
 * @api -
 * @des
 * 1. App 시작시 제일 처음 뜨는 Splash Page
 * useEffect 안에 시간을 줘서(2000ms), 경과후 다음 페이지로 이동
 * catch는 에러발생 시 문구
 */

const App = () => {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {
      console.warn('에러발생');
      console.warn(e);
    }
  });
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
