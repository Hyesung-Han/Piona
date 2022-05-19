import React from 'react';
import {useSelector} from 'react-redux';
import MyApp from './src/navigations/MyAppNav';
import MyApp_Sign from './src/navigations/MyAppNav_Sign/indes';

/**
 * LDJ, CSW | 2022.05.19
 * @name AppInner.js
 * @api -
 * @des
 * 1. Redux 셋팅 [Provider 적용(밖에서 안으로 사용 불가) 때문에 안의 내용을 따로 만들었음 파일로 : 그게 여기임(App.js가서 보셈)]
 * 2. 로그인 되었을 때와 안되었을 때의 네비게이션 구분해서 적용(X : Sign Page / O : Main Page)
 */

const AppInner = () => {
  // Provider 밖에서는 사용 불가
  const isLoggedIn = useSelector(state => !!state.user.id);

  return isLoggedIn ? <MyApp /> : <MyApp_Sign />;
};

export default AppInner;
