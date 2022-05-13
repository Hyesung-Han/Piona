import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WishListAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import shopSlice from '../../redux/slices/shop';
import {useDispatch} from 'react-redux';

/**
 * CSW, LHJ, LDJ | 2022.05.13
 * @name ShopCard
 * @api WishListAPI/addWishList, WishListAPI/deleteWishList
 * @des

 */

const ShopCard = ({item, heartStatus, navigation}) => {
  const dispatch = useDispatch();
  const shop_number = item.shop_number;
  const shop_name = item.name;
  const shop_imaage_url = item.image_url;
  const shop_score = item.score.toFixed(2);
  const wish_id = item.wish_id;
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const [heartShape, setHeartShape] = useState(wish_id !== 0 ? true : false);

  const changeWishStatus = useCallback(async () => {
    if (heartShape) {
      try {
        const res = await WishListAPI.delete(wish_id, token);
        if (res.data.result === 'success') {
          dispatch(shopSlice.actions.deleteWish(wish_id));
        }
      } catch (error) {
        console.log('좋아요 취소 에러 : ', error);
      }
    } else {
      try {
        const res = await WishListAPI.add(shop_number, user_id, token);
        if (res.data.result === 'success') {
        }
      } catch (error) {
        console.log('좋아요 에러 : ', error);
      }
    }
  }, [heartShape, wish_id, shop_number, user_id, token, dispatch]);

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

  const setShop = useCallback(() => {
    dispatch(
      shopSlice.actions.setShop({
        number: shop_number,
        name: shop_name,
      }),
    );
  }, [shop_number, shop_name, dispatch]);

  return (
    <View style={styles.CardList}>
      <TouchableOpacity
        onPress={() => {
          setShop();
          navigation.navigate('ShopDetail', {
            shopNumber: shop_number,
            shopName: shop_name,
          });
        }}>
        <View style={styles.seperateContainer}>
          <View style={{width: '95%'}}>
            <Image
              source={{uri: shop_imaage_url}}
              style={{
                resizeMode: 'cover',
                width: '100%',
                height: 130,
                borderRadius: 10,
              }}
            />
            <View style={styles.iconBox}>
              {heartShape ? (
                <Icon.Button
                  name="heart"
                  color="#F15C74"
                  backgroundColor="transparent"
                  size={25}
                  onPress={() => {
                    setHeartShape(false);
                    changeWishStatus();
                  }}
                />
              ) : (
                <Icon.Button
                  name="heart-outline"
                  color="#F15C74"
                  backgroundColor="transparent"
                  size={25}
                  onPress={() => {
                    setHeartShape(true);
                    changeWishStatus();
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
                  <Text style={styles.itemScore}>{shop_score}</Text>
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
    marginBottom: 0.5,
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
