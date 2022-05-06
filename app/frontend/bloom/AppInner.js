import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MyApp from './src/navigations/MyAppNav';

/**
 * LDJ | 2022.05.04
 * @name AppInner.js
 * @api -
 * @des
 * 1. Redux 셋팅 [Provider 적용(밖에서 안으로 사용 불가) 때문에 안의 내용을 따로 만들었음 파일로 : 그게 여기임(App.js가서 보셈)]
 */

const AppInner = () => {
  // Provider 밖에서는 사용 불가
  const isLoggedIn = useSelector(state => !!state.user.id);
  console.log('isLoggedIn', isLoggedIn);

  return (
    <NavigationContainer>
      <MyApp />
    </NavigationContainer>
  );
};

export default AppInner;
