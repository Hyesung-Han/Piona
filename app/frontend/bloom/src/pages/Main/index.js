import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Dimensions,
  Alert,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TextInput,
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
    alignItems: 'center',
    height: '80%',
  },
  textInput: {
    fontSize: 14,
    marginLeft: 10,
  },
  inputBox: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '70%',
    height: '11%',
    borderRadius: 10,
    borderColor: '#F2A7B3',
    borderWidth: 1.5,
    marginTop: '20%',
  },
  iconBox: {
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  mapBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    backgroundColor: '#F2A7B3',
    width: '35%',
    height: '12%',
    borderRadius: 40,
    marginTop: '20%',
    marginBottom: '60%',
  },
});

const MainPage = ({navigation}) => {
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={MainBackground}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            placeholder="검색어를 입력하세요."
            value={inputText}
            onChangeText={setInputText}></TextInput>
          <View style={styles.iconBox}>
            <Icon.Button
              onPress={() =>
                navigation.navigate('Search', {navigation: `${navigation}`})
              }
              name="search-outline"
              color="black"
              backgroundColor="white"
            />
          </View>
        </View>
        <View style={styles.mapBox}>
          <Icon
            name="map-outline"
            color="white"
            backgroundColor="white"
            size={20}
            onPress={() =>
              navigation.navigate('Map', {navigation: `${navigation}`})
            }
          />
          <Text
            style={{color: 'white', fontWeight:'bold'}}
            onPress={() =>
              navigation.navigate('Map', {navigation: `${navigation}`})
            }>
            지도에서 찾기
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default MainPage;
