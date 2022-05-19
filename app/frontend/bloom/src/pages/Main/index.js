import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainBackground from '../../assets/Mainbackground.jpg';
import {useSelector} from 'react-redux';
/**
 * CSW | 2022.05.19
 * @name MainPage
 * @des
 * 로그인 된 상태에서 앱을 열면 보이는 메인페이지
 * 검색/지도페이지로 이동할 수 있는 검색인풋박스와 맵버튼, 태그버튼들이 있는 페이지입니다
 *  */

const MainPage = ({navigation}) => {
  // console warning box 무시
  console.disableYellowBox = true;

  const [inputText, setInputText] = useState('');
  const user_nickname = useSelector(state => state.user.nickname);
  const user_id = useSelector(state => state.user.id);

  const clearText = () => {
    setInputText('');
  };

  useFocusEffect(
    useCallback(() => {
      clearText();
    }, []),
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageBox}>
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
                  navigation.navigate('Search', {
                    type: 'location',
                    word: `${inputText}`,
                    user_id: user_id,
                    user_lat: 0,
                    user_lng: 0,
                  })
                }
                name="search-outline"
                color="black"
                backgroundColor="transparent"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.mapBox}
            onPress={() => {
              navigation.navigate('Map', {page: 'main'});
            }}>
            <Icon
              name="map-outline"
              color="white"
              backgroundColor="white"
              size={20}
            />
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              지도에서 찾기
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.rowBox}>
        <Text
          style={{
            color: 'black',
            marginTop: '5%',
            marginBottom: '5%',
            marginLeft: '15%',
            fontWeight: 'bold',
          }}
          onPress={() =>
            navigation.navigate('Map', {navigation: `${navigation}`})
          }>
          {user_nickname} 님, 이런 피크닉은 어떤가요?
        </Text>
        <View style={styles.columnBox}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('Search', {
                type: 'keyword',
                word: `kw_reasonable`,
                user_id: user_id,
                user_lat: 0,
                user_lng: 0,
              })
            }>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              #가성비
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('Search', {
                type: 'keyword',
                word: `kw_clean`,
                user_id: user_id,
                user_lat: 0,
                user_lng: 0,
              })
            }>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              #깔끔
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columnBox}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('Search', {
                type: 'keyword',
                word: `kw_mood`,
                user_id: user_id,
                user_lat: 0,
                user_lng: 0,
              })
            }>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              #감성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('Search', {
                type: 'keyword',
                word: `kw_various`,
                user_id: user_id,
                user_lat: 0,
                user_lng: 0,
              })
            }>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              #다양한구성
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columnBox}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('Search', {
                type: 'keyword',
                word: `kw_adorable`,
                user_id: user_id,
                user_lat: 0,
                user_lng: 0,
              })
            }>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              #아기자기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('Search', {
                type: 'keyword',
                word: `kw_kind`,
                user_id: user_id,
                user_lat: 0,
                user_lng: 0,
              })
            }>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              #친절한
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  image: {
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    fontSize: 14,
    marginLeft: 10,
  },
  inputBox: {
    flex: 1,
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
    flex: 1,
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
    width: '40%',
    borderRadius: 40,
    marginTop: '20%',
    marginBottom: '30%',
    height: 45,
  },
  rowBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  columnBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Btn: {
    backgroundColor: '#F9F0F0',
    color: 'black',
    width: '30%',
    alignItems: 'center',
    borderRadius: 12,
    height: 100,
    justifyContent: 'center',
    marginRight: '5%',
    marginBottom: '5%',
    marginLeft: '5%',
    shadowColor: '#000',
    elevation: 2,
  },
});

export default MainPage;
