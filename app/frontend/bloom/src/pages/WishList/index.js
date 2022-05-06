import React, {useState, useCallback, useEffect} from 'react';
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
import {WishListAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * CSW | 2022.05.04
 * @name WishListPage
 * @api WishListAPI/getWishList
 * @des
 * 검색인풋박스와 shop컴포넌트를 보여주는 검색결과페이지입니다.
 * TODO
 * 1. navition 카드별로 적용
 *  */

// 테스트
const WishListPage = ({navigation}, props) => {
  const [wishlist, setWishList] = useState([]);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getWish = async () => {
    try {
      const res = await WishListAPI.getWishList(user_id, token);
      setWishList(res.data);
    } catch (error) {
      console.log('위시리스트 검색', error);
    }
  };

  //로그인 적용 시
  // const getWish = async () => {
  //   try {
  //     const res = await getWishList(user_id);
  //     setWishList(res.data);
  //   } catch (error) {
  //     console.log('위시리스트', error);
  //   }
  // };

  const renderItem = ({item}) => {
    return <ShopCard item={item} heartStatus={true} navigation={navigation} />;
  };

  useFocusEffect(
    useCallback(() => {
      getWish();
    }, []),
  );

  console.log(wishlist);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          //리스트의 소스를 담는 속성
          //data={data}
          data={wishlist}
          //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
          renderItem={renderItem}
          //item의 고유의 키를 부여하는 속성
          keyExtractor={item => item.wish_id}
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
    marginTop: 20,
  },
});

export default WishListPage;
