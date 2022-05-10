import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {cartAPI} from '../../utils/Axios';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';
import {useSelector} from 'react-redux';

/**
 * CSW, LDJ | 2022.05.10
 * @name CartFooter
 * @api cartAPI/deleteCart
 * @des
 * Cart Page 하단 부분 [삭제, 금액, 구매]
 * Flatlist는 Scrollview에 들어갈 수 없어서 footer로 넣어줌
 */

const CartFooter = props => {
  const dispatch = useDispatch();
  const user_accessToken = useSelector(state => state.user.accessToken);
  const cart_id = useSelector(state => state.cart.id);
  const quantity = useSelector(state => state.cart.quantity);
  const price = useSelector(state => state.cart.price);
  const total_price = quantity * price;

  const deleteCart = useCallback(async () => {
    try {
      const response = await cartAPI.deleteCart(cart_id, user_accessToken);
      console.log(response.data.result);
      if (response.data.result === 'success') {
        Alert.alert('알림', '삭제되었습니다!');
      }
      dispatch(
        cartSlice.actions.setCart({
          id: '',
          quantity: '',
          price: '',
        }),
      );
    } catch (error) {
      Alert.alert('알림', '삭제할 아이템을 선택해주세요!');
      console.log(error);
    }
  }, [cart_id, user_accessToken, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.trashcan}>
        <Icon.Button
          name="trash-outline"
          color="black"
          backgroundColor="transparent"
          size={25}
          onPress={deleteCart}
        />
      </View>
      <View style={styles.bottomBox}>
        <View style={styles.total}>
          <Text style={{fontWeight: 'bold'}}>총 {total_price}원</Text>
        </View>
        <View style={styles.buyBtn}>
          <View
            style={{
              margin: 20,
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#F15C74',
                color: 'black',
                width: '100%',
                alignItems: 'center',
                borderRadius: 5,
                height: 40,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                구매하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 55,
  },
  trashcan: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
    marginTop: 5,
  },
});

export default CartFooter;
