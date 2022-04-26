import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text, Button} from 'react-native';

/**
 * CSW | 2022.04.26
 * @name MainPage
 * @des
 * 버튼을 통해 페이지가 잘 넘어가지는지 테스트 버튼 넣어놓은 상태
 * TODO
 * 1. 메인 이미지 추가
 * 2. 검색 부분 추가
 * 3. 지도버튼 추가
 * 4. 4가지 태그 부분 추가
 *  */

const MainPage = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
      }}>
      <Text>MainPage</Text>
      <View>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() =>
            navigation.navigate('Search', {navigation: `${navigation}`})
          }
          title="Press Me">
          Press Me
        </Button>
      </View>
      <View>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() =>
            navigation.navigate('ShopDetail', {navigation: `${navigation}`})
          }
          title="Press Me">
          Press Me
        </Button>
      </View>
    </View>
  );
};
export default MainPage;
