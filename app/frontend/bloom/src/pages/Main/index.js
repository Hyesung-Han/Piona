import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Dimensions,
  Alert,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import MainBackground from '../../assets/Mainbackground.jpg';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

const MainPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={MainBackground}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
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
