import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

/**
 * LHJ | 2022.04.26
 * @name DoneCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 * Figma에 정의된 데로 왼쪽에 가게 이름, 예약 날짜, 물품, 리뷰등록 버튼이 있고, 오른쪽에 사진이 들어간다.
 */

const DoneCardList = ({item}) => {
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
    <View style={styles.doneCardList}>
      <View style={styles.seperateContainer}>
        <View style={{width: '65%'}}>
          <View style={styles.itemInfoContainer}>
            <View style={styles.itemTitleAndDate}>
              <View>
                <Text style={styles.itemTitle}>{item.shopName}</Text>
              </View>
              <View>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity>
                <Button
                  style={{fontSize: 15, color: 'black', width: '80%'}}
                  styleDisabled={{color: 'red'}}
                  //   onPress={() =>
                  //     navigation.navigate('reviewModal', {navigation: `${navigation}`})
                  //   }
                  color="#F15C74"
                  //color="#FDECC8"
                  //color="#6EC500"
                  //color="#FD8900"
                  title="리뷰등록">
                  리뷰등록
                </Button>
              </TouchableOpacity>
            </View>
            <View style={{width: '60%'}}></View>
          </View>
        </View>
        <View style={{width: '35%'}}>
          <Image
            source={{uri: `${item.imgUrl}`}}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: 100,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  doneCardList: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#BBBBBBB',
    borderRadius: 5,
    borderWidth: 1,
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
    justifyContent: 'flex-start',
  },
  itemTitle: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  itemDate: {
    marginLeft: 10,
    marginTop: 17,
    fontSize: 10,
    color: 'black',
  },
  itemDesc: {
    marginVertical: 5,
    //marginLeft: 10,
    //marginTop: 10,
    fontSize: 15,
    color: 'gray',
  },
  buttonContainer: {
    width: '40%',
    marginVertical: 5,
  },
});

export default DoneCardList;
