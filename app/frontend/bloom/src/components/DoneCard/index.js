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

/**
 * LHJ | 2022.05.02
 * @name DoneCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 : RegisterReviewModal
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 * Figma에 정의된 데로 왼쪽에 가게 이름, 예약 날짜, 물품, 리뷰등록 버튼이 있고, 오른쪽에 사진이 들어간다.
 */

const DoneCardList = props => {
  const [registerReviewModal, setReviewModal] = useState(false);

  //아이템을 받아오면 그 아이템의 이름에서 불필요한 부분을 replace하고 리턴한다.
  //상품 내용이 너무 길어 공백 문자가 있을 경우에 줄바꿈 문자로 바꾸어서 리턴
  //아직 미완성인 코드임
  const desc = () => {
    if (props.item.itemDesc.includes(',')) {
      return props.item.itemDesc.replace(',', '\n(');
    } else {
      return props.item.itemDesc;
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
                  <Text style={styles.itemTitle}>{props.item.shopName}</Text>
                </View>
                <View>
                  <Text style={styles.itemDate}>{props.item.date}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.itemDesc}>{props.item.desc}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F15C74',
                    color: 'black',
                    width: '60%',
                    alignItems: 'center',
                    borderRadius: 20,
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>
                    리뷰쓰기
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '60%'}}></View>
            </View>
          </View>
          <View style={{width: '35%', elevation: 5}}>
            <Image
              source={{uri: `${props.item.imgUrl}`}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 15,
              }}
            />
          </View>
        </View>
        {/* <Modal
        animationType={'fade'}
        transparent={true}
        useNativeDriver={true} //모달창 깜빡임 없앰
        visible={registerReviewModal}>
        <RegisterReviewModal item={item}
          next={data => setReviewModal(data)}
          exit={data => setReviewModal(data)}
        />
      </Modal> */}
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
