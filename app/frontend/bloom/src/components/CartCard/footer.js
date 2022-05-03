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

/**
 * CSW | 2022.05.03
 * @name CartFooter
 * @api x
 * @des
 * CartPage 아랫부분에 들어갈 내용이다.
 * Flatlist는 scrollview에 들어갈 수 없어서 footer로 넣어주어야한다.
 */

const CartFooter = props => {
  return (
    <View style={styles.container}>
      <View style={styles.trashcan}>
        <Icon.Button
          name="trash-outline"
          color="black"
          backgroundColor="transparent"
          size={35}
        />
      </View>
      <View style={styles.bottomBox}>
        <View style={styles.total}>
          <Text style={{fontWeight: 'bold'}}>총 원</Text>
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
                borderRadius: 25,
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
    marginHorizontal: 45,
  },
  trashcan: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default CartFooter;
