import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignPage from '../../pages/Sign';

/**
 * LDJ | 2022.05.19
 * @name MyApp_Sign
 * @des
 * 로그인 안했을 때 Sign Page가 뜨게 하기 위해서 작성!
 *  */

const MyApp_Sign = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignScreen" component={SignPage} />
    </Stack.Navigator>
  );
};

export default MyApp_Sign;
