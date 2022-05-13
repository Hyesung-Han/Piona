import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import store from './src/redux/store';
import AppInner from './AppInner';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

/**
 * LDJ, CSW | 2022.05.12
 * @name App.js
 * @api -
 * @des
 * 1. App 시작시 제일 처음 뜨는 Splash Page
 *    useEffect 안에 시간을 줘서(2000ms), 경과후 다음 페이지로 이동 / catch는 에러발생 시 문구
 * 2. Redux 셋팅 [Provider 적용(밖에서 안으로 사용 불가) 때문에 안의 내용을 따로 만들었음 파일로 : AppInner]
 * 3. FCM 셋팅
 */

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// 기본 설정 (앱마다 고유 토큰 주어짐)
PushNotification.configure({
  // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    if (notification.channelId === 'fcm_fallback_notification_channel') {
      // if (notification.message || notification.data.message) {
      //   store.dispatch(
      //     userSlice.actions.showPushPopup(
      //       notification.message || notification.data.message,
      //     ),
      //   );
      // }
    }
    // process the notification

    // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) 등록한 액션을 눌렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  // permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: 'fcm_fallback_notification_channel', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

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
