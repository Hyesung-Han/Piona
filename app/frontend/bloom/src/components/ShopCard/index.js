import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import HorizonLine from '../HorizonLine';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * CSW | 2022.04.28
 * @name ShopCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const ShopCard = ({item}, props) => {
  const [heartStatus, setHeartStaus] = useState(props.heartStatus);


  return (
    <View style={styles.CardList}>
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
                onPress={() =>
                  setHeartStaus(prevStatus => (prevStatus ? false : true))
                }
              />
            ) : (
              <Icon.Button
                name="heart"
                color="#F15C74"
                backgroundColor="transparent"
                size={25}
                onPress={() =>
                  setHeartStaus(prevStatus => (prevStatus ? false : true))
                }
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
              <View>
                <Text style={styles.itemScore}>{item.score}</Text>
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
    marginLeft: 20,
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
});

export default ShopCard;
