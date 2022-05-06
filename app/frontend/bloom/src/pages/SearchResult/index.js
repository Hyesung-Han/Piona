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
 * @name SearchResultPage
 * @des
 * 검색인풋박스와 shop컴포넌트를 보여주는 검색결과페이지입니다.
 * TODO
 * 1. navition 카드별로 적용
 * 2. api 적용
 *  */

const SearchResultPage = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [heartStatus, setHeartStaus] = useState(false);

  //getData에 완료된 예약 정보 가져오는 api를 넣자!!!
  const getData = () => {
    setLoading(true);
    fetch('http://jsonplaceholder.typicode.com/posts')
      //해당 api를 통해서 받아오는 정보는 userId, id, title, body이다.
      .then(res => res.json())
      .then(res => setData(res));
  };

  const DATA = [
    //괄호 하나하나가 item이 된다.
    {
      shopName: '호진이가게',
      address: '호진이가게,ㅁㄴㅇ',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
      wish: '',
    },
    {
      shopName: '소원이가게',
      address: '소원이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
      wish: '1',
    },
    {
      shopName: '혜성이가게',
      address: '혜성이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
      wish: '',
    },
    {
      shopName: '동준이형가게',
      address: '동준이형가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      score: 5,
      wish: '',
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

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    item.wish === '' ? setHeartStaus(false) : setHeartStaus(true);
    return <ShopCard item={item} heartStatus={heartStatus} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
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
              backgroundColor="transparent"
            />
          </View>
        </View>
      </View>
      <View style={styles.list}>
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
  },
});

export default SearchResultPage;
