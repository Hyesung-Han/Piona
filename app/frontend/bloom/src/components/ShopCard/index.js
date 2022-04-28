import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import HorizonLine from '../../utils/HorizonLine';

/**
 * CSW | 2022.04.28
 * @name ShopCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const ShopCardList = ({item}) => {
  //아이템을 받아오면 그 아이템의 이름에서 불필요한 부분을 replace하고 리턴한다.
  //상품 내용이 너무 길어 공백 문자가 있을 경우에 줄바꿈 문자로 바꾸어서 리턴
  //아직 미완성인 코드임
  const desc = () => {
    if (item.itemDesc.includes(',')) {
      return item.itemDesc.replace(',', '\n(');
    } else {
      return item.itemDesc;
    }
  };

  return (
    <View style={styles.CardList}>
      <View style={styles.seperateContainer}>
        <View style={{width: '95%'}}>
          <Image
            source={{uri: `${item.imgUrl}`}}
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: 130,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={styles.cardBottom}>
          <View style={styles.itemInfoContainer}>
            <View style={styles.itemTitleAndReviewScore}>
              <View>
                <Text style={styles.itemTitle}>{item.shopName}</Text>
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
});

export default ShopCardList;
