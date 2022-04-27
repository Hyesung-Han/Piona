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
    fontSize: 13,
    marginLeft: 10,
  },
  inputBox: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    width: '70%',
    height: '12%',
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
    marginTOp: '40%',
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
            placeholder="어느 곳으로 피크닉가세요?"
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
              style={styles.icon}
            />
          </View>
          <View style={styles.mapBox}>
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
      </ImageBackground>
    </View>
  );
};
export default MainPage;
