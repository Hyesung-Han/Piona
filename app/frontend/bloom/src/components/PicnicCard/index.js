import React, {useEffect, useFocusEffect, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
  navigation,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import HorizonLine from '../HorizonLine';
import {cancelReservation} from '../../utils/Axios';

/**
 * LHJ | 2022.05.11
 * @name PicnicCard
 * @api cancelReservation
 * @des
 * 1. 컴포넌트 목록 :HorizonLine
 * 2. 페이지 기능 :
 * Picnic Page의 진행중인 예약 FlatList에 보여줄 item 컴포넌트이다.
 * 상태가 준비 중일때 예약 취소가 가능함 > cancelReservation을 통해서 상태 변경
 */

const PicnicCardList = ({item}) => {
  //carousel에서 사용하는 인덱스
  const activeIndex = 0;
  const status = item.status;
  const reservation_id = item.reservation_id;
  const token = useSelector(state => state.user.accessToken);

  const [statusText, setStatusText] = useState('');
  const [statusColor, setStatusColor] = useState('#C0C0C0');

  useEffect(() => {
    setStatus();
    console.log('컴포넌트가 화면에 나타남');
  }, []);

  const setStatus = () => {
    if (status === 'R') {
      setStatusText('예약 취소'); //준비 중일때 예약 취소가 가능하니까
      setStatusColor('#DE3C4C');
    }
    if (status === 'U') {
      setStatusText('대여중');
      setStatusColor('#7AC28A');
    }
    if (status === 'C') {
      setStatusText('취소됨');
      setStatusColor('#DE3C4C');
    }
    if (status === 'D') {
      setStatusText('반납완료');
      setStatusColor('#E6B8DF');
    }
    if (status === 'F') {
      setStatusText('미반납');
      setStatusColor('#E6FF59');
    }
  };

  const cancelReservationAPI = async () => {
    try {
      const response = await cancelReservation(reservation_id, token);
      //취소되었으니 텍스트랑 색상 바꿈
      setStatusText('취소됨');
      setStatusColor('#DE3C4C');
      console.log(response);
    } catch (error) {
      console.log('예약 취소 실패', error);
    }
  };

  const buttonEvent = () => {
    if (status === 'R') {
      //Alert.alert('예약취소를 진행합니다.');
      //결제 취소 진행
      //취소가 다 되면 cancelReservationAPI호출
      cancelReservationAPI();
    }
    if (status === 'U') {
      Alert.alert('쓰레기와 함께 반납해주세요');
    }
    if (status === 'C') {
      Alert.alert('다음엔 꼭 빌려주세요');
    }
    if (status === 'D') {
      Alert.alert('이용해주셔서 감사합니다.');
    }
    if (status === 'F') {
      Alert.alert('반납해주세요');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View style={{height: 150}}>
          <Image
            source={{uri: `${item.image_url}`}}
            style={{
              resizeMode: 'contain', //contain:사진의 비율 유지, cover:사진을 영역에 맞춤
              borderRadius: 5,
              height: 130,
              padding: 10,
              marginHorizontal: 10,
            }}
          />
          <View style={styles.rowSeperateContainer}>
            <View style={{width: '75%'}}>
              <Text style={styles.carouselItemName}>{item.item_name}</Text>
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
              {item.shop_name}
            </Text>
          </View>
          <View style={{width: '30%'}}>
            <Text style={styles.resDate}>
              {item.reservation_date.split('T')[0]}
            </Text>
          </View>
          <TouchableOpacity
            style={{width: '20%', height: 25}}
            onPress={() => {
              buttonEvent();
            }}>
            <View style={styles.status}>
              <Text
                style={{
                  color: 'white',
                  backgroundColor: {statusColor},
                  fontWeight: 'bold',
                  fontSize: 11,
                }}
                //   onPress={() =>
                //     navigation.navigate('Map', {navigation: `${navigation}`})
                //   }
              >
                {statusText}
              </Text>
            </View>
          </TouchableOpacity>
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
            <Text style={styles.quantity}>총 {item.total_price}원</Text>
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
