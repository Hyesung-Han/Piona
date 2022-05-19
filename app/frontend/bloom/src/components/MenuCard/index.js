import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

/**
 * LHJ | 2022.05.19
 * @name MenuCard
 * @api
 * @des

 */

const MenuCardList = ({item, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MenuDetail', {
            shopNumber: `${item.shop_number}`,
            menuName: `${item.item_name}`,
            item_id: `${item.item_id}`,
          });
        }}
        style={styles.topBox}>
        <View style={styles.doneCardList}>
          <View style={{elevation: 5}}>
            <Image
              source={{uri: `${item.image_url}`}}
              style={{
                marginLeft: 25,
                marginVertical: 10,
                width: 70,
                height: 70,
                marginRight: 10,
              }}
            />
          </View>
          <View style={styles.itemInfoContainer}>
            <View style={{marginVertical: 2}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 13,
                  flexWrap: 'wrap',
                }}>
                {item.item_name}
              </Text>
            </View>
            <View style={{marginVertical: 2, width: '80%'}}>
              <Text
                style={{
                  fontSize: 11,
                  flexWrap: 'wrap',
                }}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.description}
              </Text>
            </View>
            <View style={{marginVertical: 2}}>
              <Text
                style={{
                  fontSize: 11,
                  flexWrap: 'wrap',
                  color: '#F15C74',
                  fontWeight: '600',
                }}>
                {item.price} 원
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    backgroundColor: 'white',
    marginBottom: 0.5,
  },
  doneCardList: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfoContainer: {
    marginLeft: 10,
  },
});

export default MenuCardList;
