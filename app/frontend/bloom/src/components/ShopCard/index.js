import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import HorizonLine from '../HorizonLine';
import Icon from 'react-native-vector-icons/Ionicons';
import {WishListAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import shopSlice, {shop} from '../../redux/slices/shop';
import {useDispatch} from 'react-redux';

/**
 * CSW,LHJ | 2022.05.06
 * @name ShopCard
 * @api WishListAPI/addWishList, WishListAPI/deleteWishList
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const ShopCard = ({item, navigation}, props) => {
  // "data": {
  //   "shop_number": "10",
  //   "tel": "031121513",
  //   "hours": "아홉시부터열시까지바짝벌어요",
  //   "zip_code": 21364,
  //   "address": "서울특별시 가나다라동",
  //   "name": "pipipi",
  //   "description": "우리가게가제일조아용",
  //   "url": "dbdkfdpf",
  //   "image_url": "bdkdfpdf",
  //   "shop_lng": 127.0134068,
  //   "shop_lat": 37.5051003,
  //   "score": 2.6666666666666665,
  //   "review_cnt": 3,
  //   "wish_id": 0
  // }
  const dispatch = useDispatch();
  const [heartStatus, setHeartStaus] = useState(
    item.wish_id === 0 ? false : true,
  );
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const scoreNum = item.score.toFixed(2);

  const addWish = async () => {
    try {
      const res = await WishListAPI.add(item.shop_number, user_id, token);
    } catch (error) {
      console.log('위시리스트 추가', error);
    }
  };

  const deleteWish = async () => {
    try {
      const res = await WishListAPI.delete(item.wish_id, token);
    } catch (error) {
      console.log('위시리스트 삭제', error);
    }
  };

  const startScore = () => {
    const result = [];
    const row = Math.floor(item.score);
    for (let i = 0; i < row; i++) {
      result.push(
        <Icon
          name="star"
          color="#F2A344"
          backgroundColor="transparent"
          size={15}
        />,
      );
    }
    return result;
  };

  const setShopNumberAtRedux = () => {
    dispatch(
      shopSlice.actions.setShopNumber({
        shopNumber: `${item.shop_number}`,
        shopName: `${item.name}`,
      }),
    );
  };

  return (
    <View style={styles.CardList}>
      <TouchableOpacity
        onPress={() => {
          setShopNumberAtRedux();
          navigation.navigate('ShopDetail', {
            shopNumber: `${item.shop_number}`,
            shopName: `${item.name}`,
          })
        }}>
        <View style={styles.seperateContainer}>
          <View style={{width: '95%'}}>
            <Image
              source={{uri: `${item.image_url}`}}
              style={{
                resizeMode: 'cover',
                width: '100%',
                height: 130,
                borderRadius: 10,
              }}
            />
            <View style={styles.iconBox}>
              {heartStatus === false ? (
                <Icon.Button
                  name="heart-outline"
                  color="#F15C74"
                  backgroundColor="transparent"
                  size={25}
                  onPress={() => {
                    setHeartStaus(prevStatus => (prevStatus ? false : true));
                    addWish();
                  }}
                />
              ) : (
                <Icon.Button
                  name="heart"
                  color="#F15C74"
                  backgroundColor="transparent"
                  size={25}
                  onPress={() => {
                    setHeartStaus(prevStatus => (prevStatus ? false : true));
                    deleteWish();
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.cardBottom}>
            <View style={styles.itemInfoContainer}>
              <View style={styles.itemTitleAndReviewScore}>
                <View>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.itemScore}>{scoreNum}</Text>
                  <View style={styles.starIcons}>{startScore()}</View>
                </View>
              </View>
              <View>
                <Text style={styles.itemAddress}>{item.address}</Text>
              </View>
            </View>
            <View style={styles.seeMore}>
              <Text style={{color: '#F15C74', fontSize: 13}}>see more</Text>
            </View>
          </View>
          <HorizonLine />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CardList: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: 'black',
  },
  seperateContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  itemInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  itemTitleAndReviewScore: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  itemTitle: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  itemScore: {
    marginVertical: 5,
    marginLeft: 30,
    fontSize: 15,
    color: 'black',
  },
  itemAddress: {
    marginVertical: 5,
    fontSize: 13,
    color: 'gray',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  seeMore: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 1,
    left: 1,
  },
  starIcons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  scoreBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShopCard;
