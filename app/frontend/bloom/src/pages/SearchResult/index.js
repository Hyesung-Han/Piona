import React, {useState, useCallback, useMemo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingViewBase,
} from 'react-native';
import ShopCard from '../../components/ShopCard';
import {searchAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * CSW | 2022.05.06
 * @name SearchResultPage
 * @des
 * 검색인풋박스와 shop컴포넌트를 보여주는 검색결과페이지입니다.
 *  */

const SearchResultPage = ({navigation, route}) => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getShop = async () => {
    try {
      const res = await searchAPI.get(
        route.params.type,
        user_id,
        route.params.user_lat,
        route.params.user_lng,
        route.params.word,
        token,
      );
      setData(res.data);
    } catch (error) {
      console.log('검색결과', error);
    }
  };

  const setText = () => {
    if (route.params.word === 'kw_reasonable') {
      setInputText('#가성비');
    } else if (route.params.word === 'kw_clean') {
      setInputText('#깔끔');
    } else if (route.params.word === 'kw_mood') {
      setInputText('#감성');
    } else if (route.params.word === 'kw_various') {
      setInputText('#다양한구성');
    } else {
      setInputText(route.params.word);
    }
  };
  const renderItem = ({item}) => {
    return <ShopCard item={item} navigation={navigation} />;
  };

  useFocusEffect(
    useCallback(() => {
      setText();
      getShop();
    }, []),
  );

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
      </View>
      <View style={styles.list}>
        <FlatList
          //리스트의 소스를 담는 속성
          //data={data}
          data={data}
          //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
          renderItem={renderItem}
          //item의 고유의 키를 부여하는 속성
          keyExtractor={item => item.shop_number}
          //무한 스크롤때문에 넣은듯
          // onEndReached={() => {if(loading===false && pageNum<=totalPageCnt) getMyPillHistoryList()}}
          // onEndReachedThreshold={0.4}
        />
      </View>
      <View style={styles.mapBtn}>
        <Icon.Button
          name="map-outline"
          color="white"
          backgroundColor="#F2A7B3"
          size={20}
          borderRadius={30}
          width={50}
          alignItems="center"
          justifyContent="center"
          onPress={() =>
            navigation.navigate('Map', {
              page: 'search',
              type: route.params.type,
              word: route.params.word,
              user_id: user_id,
              user_lat: 0,
              user_lng: 0,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 250,
    height: 80,
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
    width: '100%',
    height: '100%',
  },
  list: {
    flex: 3,
  },
  mapBtn: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    width: '11%',
    height: '10%',
  },
});

export default SearchResultPage;
