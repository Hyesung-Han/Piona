import React, {useRef, useCallback, useState, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {cartAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';
import {BootpayWebView} from 'react-native-bootpay';
import {RegisterReservation} from '../../utils/Axios';

/**
 * CSW, LDJ, LHJ | 2022.05.17
 * @name CartFooter
 * @api cartAPI/deleteCart
 * @des
 * Cart Page 하단 부분 [삭제, 금액, 구매]
 * Flatlist는 Scrollview에 들어갈 수 없어서 footer로 넣어줌
 * 장바구니에 담을 때, tempArray(예약 등록 api에서 reservationItem으로 활용)와 totalPrice를 전달
 * 아이템 선택 후 구매하기 버튼을 누를 시 sameshop > onpress > payment
 * 결제가 완료되면 피크닉 페이지로 화면이 이동한다.
 */

const CartFooter = ({navigation}, props) => {
  const dispatch = useDispatch();
  const user_accessToken = useSelector(state => state.user.accessToken);
  const cart_id = useSelector(state => state.cart.id);
  const quantity = useSelector(state => state.cart.quantity);
  const price = useSelector(state => state.cart.price);
  // const total_price = quantity * price;
  const select_cart_list = useSelector(state => state.cart.select_cart_list);
  const cart_list = useSelector(state => state.cart.cart_list);
  const totalPrice = useSelector(state => state.cart.total_price);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const reservationDetailList = useSelector(
    state => state.cart.reservation_list,
  );
  let APIList = [];
  const [itemName, setItemName] = useState('');
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

  console.log('tempArray : ' + itemName);

  //let tempArray = [];
  let temp = [];
  const sameShop = useCallback(async () => {
    // let tempPrice = 0;
    if (select_cart_list.length === 0) {
      Alert.alert('알림', '상품을 선택해주세요');
    } else {
      //선택한 카트 정보를 tempArray에 담기
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
            //tempArray.push(cart_list[j]);
          }
        }
      }
      //setTempArray([temp]);
      // navigation.navigate('PaymentTest', {
      //   shop_number: tempArray[0].shop_number,
      //   tempArray: tempArray,
      //   totalPrice: totalPrice,
      // });
      //dispatch(cartSlice.actions.setItemName(temp));
      dispatch(cartSlice.actions.addReservationList(temp));
      onPress();
    }
  }, [cart_list, select_cart_list, dispatch, register]);

  const payment = useCallback(async () => {
    try {
      //tempArray에서 필요한 정보만 뽑아서 reservationDetailList에 담기
      for (let i = 0; i < reservationDetailList.length; i++) {
        let tempItemId = reservationDetailList[i].item_id;
        let tempQuantity = reservationDetailList[i].quantity;
        let tempReservationDate = reservationDetailList[i].reservation_date;
        let data = {
          item_id: tempItemId,
          quantity: tempQuantity,
          reservation_date: tempReservationDate,
        };
        // setReservationDetailList({
        //   ...reservationDetailList,
        //   item_id: tempItemId,
        //   quantity: tempQuantity,
        //   reservation_date: tempReservationDate,
        // });
        APIList.push(data);
      }
      //총 가격 구하기
      //   let tempPrice = 0;
      //   for (let i = 0; i < tempArray.length; i++) {
      //     let eachPrice = tempArray[i].price * tempArray[i].quantity;
      //     tempPrice = tempPrice + eachPrice;
      //   }
      //console.log(tempPrice);
      //   setTotalPrice(tempPrice);
      await register();
    } catch (error) {
      Alert.alert('알림', '위');
      console.log(error);
    }
  }, [register, reservationDetailList]);

  const bootpay = React.forwardRef((props, ref) => {
    return useRef < BootpayWebView > null;
  });

  console.log('reservationDetailList : ' + reservationDetailList);

  const register = useCallback(async () => {
    try {
      const response = await RegisterReservation(
        APIList,
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
            reservation_list: [],
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
  }, [reservationDetailList, token, totalPrice, user_id]);

  const onPress = () => {
    const payload = {
      pg: 'kakao', //['kcp', 'danal', 'inicis', 'nicepay', 'lgup', 'toss', 'payapp', 'easypay', 'jtnet', 'tpay', 'mobilians', 'payletter', 'onestore', 'welcome'] 중 택 1
      // name: tempArray[0].item_name + '외 ' + tempArray.length - 1 + '건', //결제창에 보여질 상품명
      name: item_name + '외 ' + (reservationDetailList.length + 1) + '건',
      order_id: '1234_1234', //개발사에 관리하는 주문번호
      method: 'easy',
      price: totalPrice, //결제금액
    };

    //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함
    const items = [
      {
        item_name: '키보드', //통계에 반영될 상품명
        qty: 1, //수량
        unique: 'ITEM_CODE_KEYBOARD', //개발사에서 관리하는 상품고유번호
        price: totalPrice, //상품단가
        cat1: '패션', //카테고리 상 , 자유롭게 기술
        cat2: '여성상의', //카테고리 중, 자유롭게 기술
        cat3: '블라우스', //카테고리 하, 자유롭게 기술
      },
    ];

    //구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보
    const user = {
      id: 'user_id_1234', //개발사에서 관리하는 회원고유번호
      username: '홍길동', //구매자명
      email: 'user1234@gmail.com', //구매자 이메일
      gender: 0, //성별, 1:남자 , 0:여자
      birth: '1986-10-14', //생년월일 yyyy-MM-dd
      phone: '01012345678', //전화번호, 페이앱 필수
      area: '서울', // [서울,인천,대구,광주,부산,울산,경기,강원,충청북도,충북,충청남도,충남,전라북도,전북,전라남도,전남,경상북도,경북,경상남도,경남,제주,세종,대전] 중 택 1
      addr: '서울시 동작구 상도로', //주소
    };

    //기타 설정
    const extra = {
      app_scheme: 'bootpayrn', //ios의 경우 카드사 앱 호출 후 되돌아오기 위한 앱 스키마명
      expire_month: '0', //정기결제가 적용되는 개월 수 (정기결제 사용시), 미지정일시 PG사 기본값에 따름
      vbank_result: true, //가상계좌 결과창을 볼지(true), 말지(false)
      start_at: '', //정기 결제 시작일 - 지정하지 않을 경우 - 그 날 당일로부터 결제가 가능한 Billing key 지급, "2020-10-14"
      end_at: '', // 정기결제 만료일 - 기간 없음 - 무제한, "2020-10-14"
      quota: '0,2,3', //결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용
      offer_period: '', //결제창 제공기간에 해당하는 string 값, 지원하는 PG만 적용됨
      popup: 1, //1이면 popup, 아니면 iframe 연동
      quick_popup: 1, //1: popup 호출시 버튼을 띄우지 않는다. 아닐 경우 버튼을 호출한다
      locale: 'ko',
      disp_cash_result: 'Y', // 현금영수증 보일지 말지.. 가상계좌 KCP 옵션
      escrow: '0', // 에스크로 쓸지 안쓸지
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
    payment();
    console.log('done', data);
  };

  const onClose = () => {
    console.log('closed');
    deleteCart();
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
          {/* <Text style={{fontWeight: 'bold'}}>총 {total_price}원</Text> */}
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
              //onPress={() => navigation.push('PaymentTest')}
              onPress={() => {
                // navigation.navigate('Picnic', {
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
