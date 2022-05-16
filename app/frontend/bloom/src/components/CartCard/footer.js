import React, {useCallback, useState, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {cartAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';

/**
 * CSW, LDJ | 2022.05.13
 * @name CartFooter
 * @api cartAPI/deleteCart
 * @des
 * Cart Page 하단 부분 [삭제, 금액, 구매]
 * Flatlist는 Scrollview에 들어갈 수 없어서 footer로 넣어줌
 * 장바구니에 담을 때, tempArray(예약 등록 api에서 reservationItem으로 활용)와 totalPrice를 전달
 * 05.13 기준 totalPrice는 하드코딩이 되어있다.
 */

const CartFooter = ({navigation}, props) => {
  const dispatch = useDispatch();
  const user_accessToken = useSelector(state => state.user.accessToken);
  const cart_id = useSelector(state => state.cart.id);
  const quantity = useSelector(state => state.cart.quantity);
  const price = useSelector(state => state.cart.price);
  const total_price = quantity * price;
  const select_cart_list = useSelector(state => state.cart.select_cart_list);
  const cart_list = useSelector(state => state.cart.cart_list);
  const [send_total_price, setSendTotal_price] = useState(0);
  const [totalPrice, setTotalPrice] = useState(123321123);

  const deleteCart = useCallback(async () => {
    try {
      const response = await cartAPI.deleteCart(cart_id, user_accessToken);
      console.log(response.data);
      if (response.data.result === 'success') {
        Alert.alert('알림', '삭제되었습니다!');
        dispatch(cartSlice.actions.deleteCart(cart_id));
        dispatch(
          cartSlice.actions.setCart({
            id: '',
            quantity: '',
            price: '',
          }),
        );
      }
    } catch (error) {
      Alert.alert('알림', '삭제할 아이템을 선택해주세요!');
      console.log(error);
    }
  }, [cart_id, user_accessToken, dispatch]);

  const sameShop = useCallback(async () => {
    let tempArray = [];
    if (select_cart_list.length === 0) {
      Alert.alert('알림', '상품을 선택해주세요');
    } else {
      //선택한 카트 정보를 tempArray에 담기
      for (let i = 0; i < select_cart_list.length; i++) {
        for (let j = 0; j < cart_list.length; j++) {
          if (select_cart_list[i] === cart_list[j].cart_id) {
            tempArray.push(cart_list[j]);
          }
        }
      }
      // let tempPrice = 0;
      // for (let i = 0; i < tempArray.length; i++) {
      //   let eachPrice = tempArray[i].price * tempArray[i].quantity;
      //   tempPrice = tempPrice + eachPrice;
      // }
      // setTotalPrice(tempPrice);
      // console.log('asd' + totalPrice);
      //calc(tempArray);
      navigation.navigate('PaymentTest', {
        shop_number: tempArray[0].shop_number,
        tempArray: tempArray,
        totalPrice: totalPrice,
      });
    }
  },[select_cart_list]);

  // const calc = useMemo(tempArray => {
  //   let tempPrice = 0;
  //   for (let i = 0; i < tempArray.length; i++) {
  //     let eachPrice = tempArray[i].price * tempArray[i].quantity;
  //     tempPrice = tempPrice + eachPrice;
  //   }
  //   setTotalPrice(tempPrice);
  //   //console.log('asd' + totalPrice);
  // }, []);

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
              margin: 30,
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
              }}
              //onPress={() => navigation.push('PaymentTest')}
              onPress={() => {
                // navigation.navigate('PaymentTest', {
                //   test: 'test',
                // });
                sameShop();
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8F8F8',
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
    marginRight: 5,
    marginTop: 5,
  },
});

export default CartFooter;
