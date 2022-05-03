import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
  navigation,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HorizonLine from '../HorizonLine';

/**
 * LHJ | 2022.05.02
 * @name PicnicCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * Picnic Page의 진행중인 예약 FlatList에 보여줄 item 컴포넌트이다.
 */

const PicnicCardList = ({item}) => {
  //carousel에서 사용하는 인덱스
  const activeIndex = 0;

  const renderItem = ({item}) => {
    return (
      <View>
        <View style={{height: 150}}>
          <Image
            source={{uri: `${item.imageUrl}`}}
            style={{
              resizeMode: 'contain', //contain:사진의 비율 유지, cover:사진을 영역에 맞춤
              borderRadius: 5,
              height: 130,
              padding: 10,
              marginHorizontal: 10,
            }}
          />
          <View style={styles.rowSeperateContainer}>
            {/* <Text style={{fontSize: 10}}>{item.itemName}</Text>
            <Text style={{fontSize: 10}}> {item.quantity}개</Text> */}
            <View style={{width: '75%'}}>
              <Text style={styles.carouselItemName}>{item.itemName}</Text>
            </View>
            <View style={{width: '25%'}}>
              <Text style={styles.carouselQuantity}> {item.quantity}개</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.doneCardList}>
      <View style={styles.columnSeperateContainer}>
        <View style={styles.rowSeperateContainer}>
          <View style={{width: '35%'}}>
            <Text numberOfLines={1} style={styles.shopName}>
              {item.shopName}
            </Text>
          </View>
          <View style={{width: '30%'}}>
            <Text style={styles.resDate}>{item.date}</Text>
          </View>
          <View style={{width: '20%', height: 25}}>
            <View style={styles.status}>
              <Text
                style={{color: 'white', fontWeight: 'bold', fontSize: 11}}
                //   onPress={() =>
                //     navigation.navigate('Map', {navigation: `${navigation}`})
                //   }
              >
                예약 취소
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Carousel
            layout={'default'} //'default'(일렬로 나열)), 'stack(모르겠다)' and 'tinder'(한장만 보이지만 동그랗게 전환)
            data={item.detail}
            sliderWidth={100}
            itemWidth={150}
            renderItem={renderItem}
            //자동으로 왼쪽으로 가게
            //autoplay={'true'}
            //무한 루프
            //loop={'true'}
            //caoursel을 왼쪽으로 붙임
            activeSlideAlignment="start"
          />
        </View>
        <View style={styles.rowSeperateContainer}>
          <View style={{width: '10%'}} />
          <View style={{width: '90%', marginTop: 15}}>
            <Text style={styles.quantity}>총 {item.shopName}원</Text>
          </View>
        </View>
        <HorizonLine />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  doneCardList: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowSeperateContainer: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  columnSeperateContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    width: '40%',
    marginVertical: 5,
  },
  shopName: {
    marginVertical: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
  },
  resDate: {
    marginVertical: 5,
    fontSize: 12,
    color: 'black',
    justifyContent: 'center',
  },
  status: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    backgroundColor: '#F2A7B3',
    width: '100%',
    borderRadius: 50,
    height: 25,
    position: 'relative',
    left: 50,
  },
  quantity: {
    marginVertical: 5,
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },
  carouselItemName: {
    marginVertical: 5,
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
  carouselQuantity: {
    marginVertical: 5,
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});

export default PicnicCardList;
