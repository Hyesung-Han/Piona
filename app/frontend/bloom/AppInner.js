import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import MyApp from './src/navigations/MyAppNav';
import MyApp_Sign from './src/navigations/MyAppNav_Sign/indes';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';

/**
 * LDJ | 2022.05.09
 * @name AppInner.js
 * @api -
 * @des
 * 1. Redux 셋팅 [Provider 적용(밖에서 안으로 사용 불가) 때문에 안의 내용을 따로 만들었음 파일로 : 그게 여기임(App.js가서 보셈)]
 * 2. 로그인 되었을 때와 안되었을 때의 네비게이션 구분해서 적용(X : Sign Page / O : Main Page)
 */

const AppInner = () => {
  // Provider 밖에서는 사용 불가
  const isLoggedIn = useSelector(state => !!state.user.id);
  console.log('isLoggedIn', isLoggedIn);

  // const dispatch = useDispatch();
  // 앱 실행 시 토큰 있으면 로그인하는 코드(껏다 키거나 새로고침해도 로그인 유지 / refreshtoken을 통한 API 있어야 됨)
  // useEffect(() => {
  //   const getTokenAndRefresh = async () => {
  //     try {
  //       const token = await EncryptedStorage.getItem('refreshToken');
  //       if (token) {
  //         return;
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //     }
  //   };
  //   getTokenAndRefresh();
  // }, [dispatch]);

  return isLoggedIn ? <MyApp /> : <MyApp_Sign />;
};

export default AppInner;
