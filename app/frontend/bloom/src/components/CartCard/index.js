import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';

/**
 * CSW, LDJ | 2022.05.13
 * @name CartCard
 * @api -
 * @des
 * Cart Page에 보여줄 단일 컴포넌트
 */

const CartCardList = props => {
  const dispatch = useDispatch();
  const [checkStatus, setcheckStaus] = useState(false);
  const cart_id = props.item.cart_id;
  const item_id = props.item.item_id;
  const item_name = props.item.item_name;
  const price = props.item.price;
  const image_url = props.item.image_url;
  const quantity = props.item.quantity;
  const total_quantity = props.item.total_quantity;
  const reservation_date = props.item.reservation_date + '.960Z';
  const res_date = props.item.reservation_date.split('T')[0];
  const shop_name = props.item.shop_name;
  const shop_number = props.item.shop_number;

  const selectCartItem = useCallback(() => {
    if (checkStatus) {
      // 빼고, 회색으로
      dispatch(
        cartSlice.actions.setCart({
          id: '',
          quantity: '',
          price: '',
          shop_number: '',
          item_id: '',
          item_name: '',
          image_url: '',
          reservation_date: '',
          shop_name: '',
        }),
      );
      dispatch(cartSlice.actions.deleteSelectCart(cart_id));
      setcheckStaus(false);
    } else {
      // 담고, 분홍색으로
      dispatch(
        cartSlice.actions.setCart({
          id: cart_id,
          quantity: quantity,
          price: price,
          shop_number: shop_number,
          item_id: item_id,
          item_name: item_name,
          image_url: image_url,
          reservation_date: reservation_date,
          shop_name: shop_name,
        }),
      );
      dispatch(cartSlice.actions.selectCart(cart_id));
      setcheckStaus(true);
    }
  }, [
    checkStatus,
    dispatch,
    cart_id,
    quantity,
    price,
    shop_number,
    item_id,
    item_name,
    image_url,
    reservation_date,
    shop_name,
  ]);


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Menus', {
            item_id: `${item_id}`,
          })
        }
        style={styles.CartCard}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.checkBox}>
            <View style={styles.iconBox}>
              {checkStatus === false ? (
                // 클릭하면 클릭(담김)
                <Icon.Button
                  onPress={() => {
                    selectCartItem();
                  }}
                  name="checkbox"
                  color="#DADADA"
                  backgroundColor="transparent"
                  size={25}
                />
              ) : (
                // 클릭하면 해제(뺌)
                <Icon.Button
                  onPress={() => {
                    selectCartItem();
                  }}
                  name="checkbox"
                  color="#F2A7B3"
                  backgroundColor="transparent"
                  size={25}
                />
              )}
            </View>
          </View>
          <View style={styles.informationBox}>
            <View style={styles.TopBox}>
              <View style={styles.shopname}>
                <Text style={{fontSize: 15, color: 'black'}}>{shop_name}</Text>
              </View>
              <View style={styles.reservationDate}>
                <Text style={{fontSize: 13, color: 'black'}}>{res_date}</Text>
              </View>
            </View>
            <View style={styles.itemname}>
              <Text style={{fontSize: 12}}>{item_name}</Text>
            </View>
            <View style={styles.quantity}>
              <Text style={{fontSize: 12, fontWeight: 'bold', marginRight: 10}}>
                수량 : {quantity}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.imgBox}>
          <Image
            source={{uri: `${image_url}`}}
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 5, fontWeight: 'bold'}}>
            {price * quantity} 원
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 0.5,
  },
  CartCard: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TopBox: {
    flexDirection: 'row',
  },
  quantity: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  reservationDate: {
    marginLeft: 10,
  },
  imgBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  informationBox: {
    width: '45%',
  },
  checkBox: {
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default CartCardList;
