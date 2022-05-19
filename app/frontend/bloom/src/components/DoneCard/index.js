import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import shopSlice from '../../redux/slices/shop';
import {useDispatch} from 'react-redux';
/**
 * LHJ | 2022.05.19
 * @name DoneCard
 * @api
 * @des
 */

const DoneCardList = ({item, navigation}) => {
  const dispatch = useDispatch();

  const registerButton = () => {
    const result = [];
    if (item.writeReview === 'Y') {
      console.log('이미 리뷰가 작성됨');
    } else {
      result.push(
        <TouchableOpacity
          style={{
            backgroundColor: '#F15C74',
            color: 'black',
            width: '60%',
            alignItems: 'center',
            borderRadius: 20,
            height: 20,
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.navigate('RegisterReview', {
              reservationId: `${item.reservation_id}`,
              reservation_id: item.reservation_id,
              shop_name: item.shop_name,
            })
          }>
          <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>
            리뷰쓰기
          </Text>
        </TouchableOpacity>,
      );
      return result;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.doneCardList}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShopDetail', {
              shopNumber: item.shop_number,
              shopName: item.shop_name,
            });
            dispatch(
              shopSlice.actions.setShop({
                number: item.shop_number,
                name: item.shop_name,
              }),
            );
          }}>
          <View style={styles.seperateContainer}>
            <View style={{width: '75%'}}>
              <View style={styles.itemInfoContainer}>
                <View style={styles.itemTitleAndDate}>
                  <View>
                    <Text style={styles.itemTitle}>{item.shop_name}</Text>
                  </View>
                  <View>
                    <Text style={styles.itemDate}>
                      {item.reservation_date.split('T')[0]}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={styles.itemDesc}
                    numberOfLines={3}
                    ellipsizeMode="tail">
                    {item.detail[0].item_name} 외 {item.detail.length} 건
                  </Text>
                </View>
                <View style={styles.buttonContainer}>{registerButton()}</View>
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 1,
  },
  doneCardList: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seperateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  itemTitleAndDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  itemDate: {
    fontSize: 10,
    color: 'black',
    marginLeft: 15,
  },
  itemDesc: {
    marginVertical: 5,
    fontSize: 11,
    color: 'gray',
  },
  buttonContainer: {
    width: '40%',
    marginTop: 5,
  },
});

export default DoneCardList;
