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
 * LHJ | 2022.05.11
 * @name DoneCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 : RegisterReviewModal
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 * Figma에 정의된 데로 왼쪽에 가게 이름, 예약 날짜, 물품, 리뷰등록 버튼이 있고, 오른쪽에 사진이 들어간다.
 */

const DoneCardList = ({item, navigation}) => {
  const [registerReviewModal, setReviewModal] = useState(false);
  const user_id = useSelector(state => state.id);
  //const status = item.writeReview;
  //console.log(item);
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
              //user_id: user_id,
              reservation_id: item.reservation_id,
              shop_name: item.shop_name,
            })
          }>
          <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>
            리뷰쓰기
          </Text>
        </TouchableOpacity>
      );
      return result;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.doneCardList}>
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
                <Text style={styles.itemDesc}>{item.description}</Text>
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
      </View>
      <HorizonLine />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    //marginLeft: 10,
    //marginTop: 10,
    fontSize: 11,
    color: 'gray',
  },
  buttonContainer: {
    width: '40%',
    marginTop: 5,
  },
});

export default DoneCardList;
