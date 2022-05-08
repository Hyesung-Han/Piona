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
import HorizonLine from '../HorizonLine';
import RegisterReview from '../../pages/RegisterReview';
import {useSelector} from 'react-redux';

/**
 * LHJ | 2022.05.09
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
  const shopNumber = useSelector(state => state.shop.shopNumber);
  //const shopName = useSelector(state => state.shop.shopName);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MenuDetail', {
            shopNumber: `${item.shop_number}`,
            menuName: `${item.item_name}`,
            item_id: `${item.item_id}`,
          });
        }}>
        <View style={styles.doneCardList}>
          <View style={styles.seperateContainer}>
            <View style={{width: '75%'}}>
              <View style={styles.itemInfoContainer}>
                <View style={styles.itemTitleAndDate}>
                  <View>
                    <Text style={styles.itemTitle}>{item.shop_name}</Text>
                  </View>
                  <View>
                    <Text style={styles.itemDate}>{item.price}</Text>
                  </View>
                  <View>
                    <Text style={styles.itemDate}>{item.item_name}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                </View>
                <View style={{width: '60%'}}></View>
              </View>
            </View>
            <View style={{width: '35%', elevation: 5}}>
              <Image
                source={{uri: `${item.image_url}`}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                }}
              />
            </View>
          </View>
        </View>
        <HorizonLine />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MenuCardList;
