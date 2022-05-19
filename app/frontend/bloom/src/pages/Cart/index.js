import React, {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import CartCardList from '../../components/CartCard';
import CartFooter from '../../components/CartCard/footer';
import {cartAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';

/**
 * CSW, LDJ, LHJ | 2022.05.13
 * @name CartPage
 * @api cartAPI/getCartList
 * @des
 * 장바구니에 담은 item 목록 조회
 * # 사용 컴포넌트 : CartCard(index.js / footer.js)
 * # 무한 루프 에러 해결?! [리덕스로~]
 * 05.13 > 화면 전환을 위한 컴포넌트에 네비게이션 전달
 *  */

const CartPage = ({navigation}) => {
  const dispatch = useDispatch();
  const cart_list = useSelector(state => state.cart.cart_list);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  // console warning box 무시
  console.disableYellowBox = true;
  const getCartlist = useCallback(async () => {
    try {
      const res = await cartAPI.getCartList(user_id, token);
      const cart_data = res.data.data;
      if (res.data.result === 'success') {
        dispatch(cartSlice.actions.addCartList(cart_data));
      }
    } catch (error) {
      console.log('카트 목록조회 에러 :', error);
    }
  }, [user_id, token, dispatch]);

  const renderItem = useCallback(
    ({item}) => {
      return <CartCardList item={item} navigation={navigation} />;
    },
    [navigation],
  );

  const cartFooter = useCallback(
    ({item}) => {
      return <CartFooter item={item} navigation={navigation} />;
    },
    [navigation],
  );

  // [1] getCartlist로 받은 item의 변화가 생기면(컴포넌트에[CartCard] 변화가 생기면) 랜더링!
  useFocusEffect(
    useCallback(() => {
      getCartlist();
    }, [getCartlist]),
  );

  // [2] getCartlist로 받은 item의 변화가 생기면(컴포넌트에[CartCard] 변화가 생기면) 랜더링!
  // useFocusEffect(
  //   useCallback(async () => {
  //     try {
  //       const res = await cartAPI.getCartList(user_id, token);
  //       const cart_data = res.data.data;
  //       if (res.data.result === 'success') {
  //         dispatch(cartSlice.actions.addCartList(cart_data));
  //       }
  //     } catch (error) {
  //       console.log('카트 목록조회 에러 :', error);
  //     }
  //     return;
  //   }, [user_id, token, dispatch]),
  // );

  // [3] getCartlist로 받은 item의 변화가 생기면(컴포넌트에[CartCard] 변화가 생기면) 랜더링!
  // useEffect(() => {
  //   try {
  //     getCartlist();
  //   } catch (error) {
  //     console.warn('장바구니 목록 조회 에러 : ', error);
  //   }
  // }, []);

  return cart_list.length >= 1 ? (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          //리스트의 소스를 담는 속성
          data={cart_list}
          //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
          renderItem={renderItem}
          //item의 고유의 키를 부여하는 속성
          keyExtractor={item => item.cart_id}
          ListFooterComponent={cartFooter}
        />
      </View>
    </View>
  ) : (
    <View style={styles.Nocontainer}>
      <Text>장바구니 내역이 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  list: {
    backgroundColor: '#CBCBCB',
  },
  Nocontainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartPage;
