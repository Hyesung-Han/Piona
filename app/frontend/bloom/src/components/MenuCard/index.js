import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  navigation,
  AppRegistry,
} from 'react-native';
import RegisterReview from '../../pages/RegisterReview';
import {useSelector} from 'react-redux';

/**
 * LHJ | 2022.05.13
 * @name MenuCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 : .
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const MenuCardList = ({item, navigation}) => {
  //item{
  //   "item_id": 2,
  //   "item_name": "피크닉매트 중형",
  //   "price": 7000,
  //   "description": "asdasd",
  //   "image_url": "https://hanamon.kr/wp-content/uploads/2022/025%A1%E1%86%AF.jpeg",
  //}
  const user_id = useSelector(state => state.id);
  const token = useSelector(state => state.user.accessToken);
  //shopNumber는 현재 있는 가게이므로 리덕스에 있는 shopNumber사용 or 이전 화면(shopMenu에서 전달받기)
  const shopNumber = useSelector(state => state.shop.number);
  //const shopName = useSelector(state => state.shop.name);

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
            <View style={{marginVertical: 2}}>
              <Text
                style={{
                  fontSize: 11,
                  flexWrap: 'wrap',
                }}>
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
