import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ShopCard from '../../components/ShopCard';

/**
 * CSW | 2022.04.28
 * @name WishListPage
 * @des
 * 검색인풋박스와 shop컴포넌트를 보여주는 검색결과페이지입니다.
 * TODO
 * 1. navition 카드별로 적용
 * 2. api 적용
 *  */

const WishListPage = ({navigation}) => {
  const [inputText, setInputText] = useState('');

  const DATA = [
    //괄호 하나하나가 item이 된다.
    {
      shopName: '호진이가게',
      address: '호진이가게,ㅁㄴㅇ',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '소원이가게',
      address: '소원이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '혜성이가게',
      address: '혜성이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '동준이형가게',
      address: '동준이형가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '정아누나가게',
      address: '정아누나가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '윤택이형가게',
      address: '윤택이형가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '호진이가게',
      address: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '호진이가게',
      address: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '호진이가게',
      address: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
    {
      shopName: '호진이가게',
      address: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
    },
  ];
  const renderItem = ({item}) => {
    return <ShopCard item={item} heartStatus={true} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ShopDetail', {navigation: `${navigation}`})
          }>
          <FlatList
            //리스트의 소스를 담는 속성
            //data={data}
            data={DATA}
            //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
            renderItem={renderItem}
            //item의 고유의 키를 부여하는 속성
            keyExtractor={item => String(item.id)}
            //무한 스크롤때문에 넣은듯
            // onEndReached={() => {if(loading===false && pageNum<=totalPageCnt) getMyPillHistoryList()}}
            // onEndReachedThreshold={0.4}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
    marginTop: '9%',
    marginBottom: '9%',
  },
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  searchBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 3,
    marginTop: 20,
  },
});

export default WishListPage;
