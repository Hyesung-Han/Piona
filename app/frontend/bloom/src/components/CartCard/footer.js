import React, {useRef, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {cartAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';
import {BootpayWebView} from 'react-native-bootpay';
import {RegisterReservation} from '../../utils/Axios';

/**
 * CSW, LDJ, LHJ | 2022.05.19
 * @name CartFooter
 * @api cartAPI/deleteCart
 * @des
 * Cart Page 하단 부분 [삭제, 금액, 구매]
 * 장바구니에 담을 때, tempArray(예약 등록 api에서 reservationItem으로 활용)와 totalPrice를 전달
 */

const CartFooter = ({navigation}) => {
  const dispatch = useDispatch();
  const user_accessToken = useSelector(state => state.user.accessToken);
  const select_cart_list = useSelector(state => state.cart.select_cart_list);
  const cart_list = useSelector(state => state.cart.cart_list);
  const totalPrice = useSelector(state => state.cart.total_price);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const reservationDetailList = useSelector(
    state => state.cart.reservation_list,
  );
  const item_name = useSelector(state => state.cart.item_name);

  const deleteCart = useCallback(async () => {
    try {
      const response = await cartAPI.deleteCart(
        select_cart_list,
        user_accessToken,
      );
      console.log(response.data);
      if (response.data.result === 'success') {
        Alert.alert('알림', '삭제되었습니다!');
        dispatch(cartSlice.actions.deleteCart(select_cart_list));
        dispatch(
          cartSlice.actions.initCart({
            select_cart_list: [],
            total_price: 0,
          }),
        );
        dispatch(
          cartSlice.actions.setCart({
            id: '',
            quantity: '',
            price: '',
            total_price: 0,
          }),
        );
      }
    } catch (error) {
      Alert.alert('알림', '삭제할 아이템을 선택해주세요!');
      console.log(error);
    }
  }, [select_cart_list, user_accessToken, dispatch]);

  const deleteCartAfterPay = useCallback(async () => {
    try {
      const response = await cartAPI.deleteCart(
        select_cart_list,
        user_accessToken,
      );
      console.log(response.data);
      if (response.data.result === 'success') {
        dispatch(cartSlice.actions.deleteCart(select_cart_list));
        dispatch(
          cartSlice.actions.initCart({
            select_cart_list: [],
            total_price: 0,
          }),
        );
        dispatch(
          cartSlice.actions.setCart({
            id: '',
            quantity: '',
            price: '',
            total_price: 0,
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [select_cart_list, user_accessToken, dispatch]);

  let temp = [];
  const sameShop = useCallback(async () => {
    try {
      if (select_cart_list.length === 0) {
        Alert.alert('알림', '상품을 선택해주세요');
      } else {
        for (let i = 0; i < select_cart_list.length; i++) {
          for (let j = 0; j < cart_list.length; j++) {
            if (select_cart_list[i] === cart_list[j].cart_id) {
              let tempShopNumber = cart_list[i].shop_number;
              let tempItemId = cart_list[i].item_id;
              let tempQuantity = cart_list[i].quantity;
              let tempReservationDate = cart_list[i].reservation_date;
              let data = {
                shop_number: tempShopNumber,
                item_id: tempItemId,
                quantity: tempQuantity,
                reservation_date: tempReservationDate,
              };
              temp.push(data);
            }
          }
        }

        dispatch(cartSlice.actions.addReservationList(temp));
        onPress();
      }
    } catch (error) {
      console.log(error);
    }
  }, [select_cart_list, dispatch, cart_list]);

  const bootpay = React.forwardRef(() => {
    return useRef < BootpayWebView > null;
  });

  console.log('reservationDetailList : ' + reservationDetailList);

  const register = useCallback(async () => {
    try {
      const response = await RegisterReservation(
        reservationDetailList,
        reservationDetailList[0].shop_number,
        totalPrice,
        user_id,
        token,
      );
      if (response.data.result === 'success') {
        console.log('성공');
        dispatch(cartSlice.actions.deleteCart(select_cart_list));
        dispatch(
          cartSlice.actions.initCart({
            select_cart_list: [],
            total_price: 0,
            reservation_list: '',
          }),
        );
        dispatch(
          cartSlice.actions.setCart({
            id: '',
            quantity: '',
            price: '',
            total_price: 0,
          }),
        );
      }
    } catch (error) {
      Alert.alert('알림', '예약 등록에 실패했습니다');
      console.log(error);
    }
  }, [
    dispatch,
    reservationDetailList,
    select_cart_list,
    token,
    totalPrice,
    user_id,
  ]);

  const onPress = () => {
    const payload = {
      pg: 'kakao',
      name: item_name + '외 ' + (reservationDetailList.length + 1) + '건',
      order_id: '1234_1234',
      method: 'easy',
      price: totalPrice,
    };

    //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함
    const items = [
      {
        item_name: '키보드',
        qty: 1,
        unique: 'ITEM_CODE_KEYBOARD',
        price: totalPrice,
        cat1: '패션',
        cat2: '여성상의',
        cat3: '블라우스',
      },
    ];

    //구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보
    const user = {
      id: 'user_id_1234',
      username: '홍길동',
      email: 'user1234@gmail.com',
      gender: 0,
      birth: '1986-10-14',
      phone: '01012345678',
      area: '서울',
      addr: '서울시 동작구 상도로',
    };

    //기타 설정
    const extra = {
      app_scheme: 'bootpayrn',
      expire_month: '0',
      vbank_result: true,
      start_at: '',
      end_at: '',
      quota: '0,2,3',
      offer_period: '',
      popup: 1,
      quick_popup: 1,
      locale: 'ko',
      disp_cash_result: 'Y',
      escrow: '0',
      theme: 'purple',
      custom_background: '',
      custom_font_color: '',
      ios_close_button: true,
    };

    if (bootpay != null && bootpay.current != null) {
      bootpay.current.request(payload, items, user, extra);
    }
  };

  const onCancel = data => {
    console.log('cancel', data);

    var json = JSON.stringify(data);
    console.log('cancel json', json);
  };

  const onError = data => {
    console.log('error', data);
  };

  const onReady = data => {
    console.log('ready', data);
  };

  const onConfirm = data => {
    console.log('confirm', data);
    if (bootpay != null && bootpay.current != null) {
      bootpay.current.transactionConfirm(data);
    }
  };

  const onDone = data => {
    register();
    console.log('done', data);
  };

  const onClose = () => {
    console.log('closed');
    deleteCartAfterPay();
    navigation.navigate('Picnic', {
      status: 'sucess',
    });
  };

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
          <Text style={{fontWeight: 'bold'}}>총 {totalPrice}원</Text>
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
              onPress={() => {
                sameShop();
              }}>
              <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                구매하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BootpayWebView
        ref={bootpay}
        ios_application_id={'627d582f2701800023f6b7e3'}
        android_application_id={'627d582f2701800023f6b7e2'}
        onCancel={onCancel}
        onError={onError}
        onReady={onReady}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose}
        allowFileAccess={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
      />
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
