import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizonLine from '../HorizonLine';

/**
 * CSW | 2022.05.03
 * @name CartCard
 * @api x
 * @des
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const CartCardList = props => {
  const [checkStatus, setcheckStaus] = useState(false);
  const [quantityStatus, setquantityStaus] = useState(props.item.quantity);

  return (
    <View style={styles.container}>
      <View style={styles.CartCard}>
        <View style={styles.checkBox}>
          <View style={styles.iconBox}>
            {checkStatus === false ? (
              <Icon.Button
                onPress={() =>
                  setcheckStaus(prevStatus => (prevStatus ? false : true))
                }
                name="checkbox"
                color="#DADADA"
                backgroundColor="transparent"
                size={25}
              />
            ) : (
              <Icon.Button
                onPress={() =>
                  setcheckStaus(prevStatus => (prevStatus ? false : true))
                }
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
              <Text style={{fontSize: 15, color: 'black'}}>
                {props.item.shop_name}
              </Text>
            </View>
            <View style={styles.reservationDate}>
              <Text style={{fontSize: 13, color: 'black'}}>
                {props.item.reservation_date}
              </Text>
            </View>
          </View>
          <View style={styles.itemname}>
            <Text style={{fontSize: 12}}>{props.item.item_name}</Text>
          </View>
          <View style={styles.quantity}>
            <Text style={{fontSize: 12, fontWeight: 'bold', marginRight: 10}}>
              수량
            </Text>
            <View style={styles.quantityBox}>
              <Icon.Button
                onPress={() => setquantityStaus(prevStatus => prevStatus - 1)}
                name="remove"
                color="black"
                backgroundColor="transparent"
                size={13}
                style={styles.removeIcon}
              />
              <Text>{quantityStatus}</Text>
              <Icon.Button
                onPress={() => setquantityStaus(prevStatus => prevStatus + 1)}
                name="add"
                color="black"
                backgroundColor="transparent"
                size={13}
                style={styles.addIcon}
              />
            </View>
          </View>
        </View>
        <View style={styles.imgBox}>
          <Image
            source={{uri: `${props.item.image_url}`}}
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 5, fontWeight: 'bold'}}>
            {props.item.price * quantityStatus} 원
          </Text>
        </View>
      </View>
      <HorizonLine />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CartCard: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TopBox: {
    flexDirection: 'row',
  },
  quantityBox: {
    flexDirection: 'row',
    backgroundColor: '#FDECC8',
    borderRadius: 50,
    alignItems: 'center',
    width: '45%',
    justifyContent: 'center',
    height: 27,
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
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    position: 'relative',
    left: 5,
    top: -1,
  },
  addIcon: {
    position: 'relative',
    right: -5,
    bottom: 1,
  },
});

export default CartCardList;
