import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import CartCardList from '../../components/CartCard';
import CartFooter from '../../components/CartCard/footer';
import {cartAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';

/**
 * CSW, LDJ, LHJ | 2022.05.19
 * @name CartPage
 * @api cartAPI/getCartList
 * @des
 * 장바구니에 담은 item 목록 조회
 * # 사용 컴포넌트 : CartCard(index.js / footer.js)
 *  */

const CartPage = ({navigation}) => {
  // console warning box 무시
  console.disableYellowBox = true;

  const dispatch = useDispatch();
  const cart_list = useSelector(state => state.cart.cart_list);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

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

  useFocusEffect(
    useCallback(() => {
      getCartlist();
    }, [getCartlist]),
  );

  return cart_list.length >= 1 ? (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={cart_list}
          renderItem={renderItem}
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
