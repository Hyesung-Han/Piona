import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizonLine from '../HorizonLine';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';

/**
 * CSW, LDJ | 2022.05.10
 * @name CartCard
 * @api -
 * @des
 * FlatList에 보여줄 item 컴포넌트
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
  const reservation_date = props.item.reservation_date.split('T')[0];
  const shop_name = props.item.shop_name;

  const selectCartItem = useCallback(() => {
    if (checkStatus) {
      // 빼고, 회색으로
      dispatch(
        cartSlice.actions.setCart({
          id: '',
          quantity: '',
          price: '',
        }),
      );
      setcheckStaus(false);
    } else {
      // 담고, 분홍색으로
      dispatch(
        cartSlice.actions.setCart({
          id: cart_id,
          quantity: quantity,
          price: price,
        }),
      );
      setcheckStaus(true);
    }
  }, [checkStatus, cart_id, quantity, price, dispatch]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Menus', {
            item_id: `${item_id}`,
          })
        }>
        <View style={styles.CartCard}>
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
                <Text style={{fontSize: 13, color: 'black'}}>
                  {reservation_date}
                </Text>
              </View>
            </View>
            <View style={styles.itemname}>
              <Text style={{fontSize: 12}}>{item_name}</Text>
            </View>
            <View style={styles.quantity}>
              <Text style={{fontSize: 12, fontWeight: 'bold', marginRight: 10}}>
                수량 : {quantity}
              </Text>
              {/* <View style={styles.quantityBox}> */}
              {/* <Icon.Button
                  onPress={() => quantityMinus()}
                  name="remove"
                  color="black"
                  backgroundColor="transparent"
                  size={13}
                  style={styles.removeIcon}
                /> */}
              {/* <Text>{quantityStatus}</Text> */}
              {/* <Icon.Button
                  onPress={() => quantityPlus()}
                  name="add"
                  color="black"
                  backgroundColor="transparent"
                  size={13}
                  style={styles.addIcon}
                /> */}
              {/* </View> */}
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
        </View>
        <HorizonLine />
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
  },
  CartCard: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TopBox: {
    flexDirection: 'row',
  },
  quantity: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    width: '50%',
  },
  reservationDate: {
    marginLeft: 10,
  },
  imgBox: {
    flexDirection: 'column',
    marginLeft: 60,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // quantityBox: {
  //   flexDirection: 'row',
  //   backgroundColor: '#FDECC8',
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   width: '35%',
  //   justifyContent: 'center',
  //   height: 27,
  // },
  // removeIcon: {
  //   position: 'relative',
  //   left: 5,
  //   top: -1,
  // },
  // addIcon: {
  //   position: 'relative',
  //   right: -5,
  //   bottom: 1,
  // },
});

export default CartCardList;
