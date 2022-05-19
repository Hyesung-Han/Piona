import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {cancelReservation} from '../../utils/Axios';

/**
 * LHJ, CSW | 2022.05.19
 * @name PicnicCard
 * @api cancelReservation
 * @des
 */

const PicnicCardList = ({item}) => {
  const status = item.status;
  const reservation_id = item.reservation_id;
  const token = useSelector(state => state.user.accessToken);

  const [statusText, setStatusText] = useState('');
  const [statusColor, setStatusColor] = useState('#C0C0C0');

  useEffect(() => {
    setStatus();
  }, []);

  const setStatus = () => {
    if (status === 'R') {
      setStatusText('예약 취소');
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

  const cancelReservationAPI = useCallback(async () => {
    try {
      const response = await cancelReservation(reservation_id, token);
      setStatusText('취소됨');
      setStatusColor('#DE3C4C');
    } catch (error) {
      console.log('예약 취소 실패', error);
    }
  }, [reservation_id, token]);

  const buttonEvent = () => {
    if (status === 'R') {
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
              resizeMode: 'cover',
              borderRadius: 5,
              height: 130,
              padding: 10,
              marginHorizontal: 10,
            }}
          />
          <View style={styles.rowSeperateContainer}>
            <View style={{width: '75%'}}>
              <Text
                style={styles.carouselItemName}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.item_name}
              </Text>
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
          <View style={{width: '30%'}}>
            <Text numberOfLines={1} style={styles.shopName}>
              {item.shop_name}
            </Text>
          </View>
          <View style={{width: '35%'}}>
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
                }}>
                {statusText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Carousel
            layout={'default'}
            data={item.detail}
            sliderWidth={100}
            itemWidth={150}
            renderItem={renderItem}
            activeSlideAlignment="start"
          />
        </View>
        <View style={styles.rowSeperateContainer}>
          <View style={{width: '10%'}} />
          <View style={{width: '90%', marginTop: 15}}>
            <Text style={styles.quantity}>총 {item.total_price}원</Text>
          </View>
        </View>
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
