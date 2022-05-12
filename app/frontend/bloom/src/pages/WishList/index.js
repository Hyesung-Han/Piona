import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import ShopCard from '../../components/ShopCard';
import {WishListAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import shopSlice from '../../redux/slices/shop';

/**
 * CSW, LDJ | 2022.05.13
 * @name WishListPage
 * @api WishListAPI/getWishList
 * @des
 * 좋아요 누른 가게 목록 조회 (위시리스트 조회)
 * # 사용 컴포넌트 : ShopCard
 * # 무한 루프 에러 해결?! [리덕스로~]
 *  */

const WishListPage = ({navigation}) => {
  const dispatch = useDispatch();
  const wish_list = useSelector(state => state.shop.wish_list);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getWishlist = useCallback(async () => {
    try {
      const res = await WishListAPI.getWishList(user_id, token);
      const wish_data = res.data.data;
      if (res.data.result === 'success') {
        dispatch(shopSlice.actions.addWishList(wish_data));
      }
    } catch (error) {
      console.log('위시리스트 조회 에러 :', error);
    }
  }, [user_id, token, dispatch]);

  const renderItem = useCallback(
    ({item}) => {
      return <ShopCard item={item} navigation={navigation} />;
    },
    [navigation],
  );

  useFocusEffect(
    useCallback(() => {
      getWishlist();
    }, [getWishlist]),
  );

  return wish_list.length >= 1 ? (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          //리스트의 소스를 담는 속성
          data={wish_list}
          //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
          renderItem={renderItem}
          //item의 고유의 키를 부여하는 속성 [가게 번호 고유한데 왜 않데?]
          keyExtractor={item => item.shop_number}
        />
      </View>
    </View>
  ) : (
    <View style={styles.Nocontainer}>
      <Text>위시리스트 내역이 없습니다.</Text>
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
  Nocontainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WishListPage;
