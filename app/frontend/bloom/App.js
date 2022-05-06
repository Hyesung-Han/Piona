import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import store from './src/redux/store';
import AppInner from './AppInner';

/**
 * LDJ | 2022.05.06
 * @name App.js
 * @api -
 * @des
 * 1. App 시작시 제일 처음 뜨는 Splash Page
 * useEffect 안에 시간을 줘서(2000ms), 경과후 다음 페이지로 이동 / catch는 에러발생 시 문구
 * 2. Redux 셋팅 [Provider 적용(밖에서 안으로 사용 불가) 때문에 안의 내용을 따로 만들었음 파일로 : AppInner]
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
      <Provider store={store}>
        <NavigationContainer>
          <AppInner />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
