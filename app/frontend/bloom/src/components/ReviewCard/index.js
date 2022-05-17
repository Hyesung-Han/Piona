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
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import shopcomment from '../../assets/shop.png';

/**
 * LHJ,CSW | 2022.05.13
 * @name MenuCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 : .
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const MenuCardList = ({item, navigation}) => {
  const user_id = useSelector(state => state.id);
  const token = useSelector(state => state.user.accessToken);
  //shopNumber는 현재 있는 가게이므로 리덕스에 있는 shopNumber사용 or 이전 화면(shopMenu에서 전달받기)
  const shopNumber = useSelector(state => state.shop.number);
  //const shopName = useSelector(state => state.shop.name);

  //스코어에 따라서 별 아이콘 추가하는 함수
  const StartScore = () => {
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

  //아이템에서 키워드를 추출하여 존재하는(상태값이 Y인) 애들만 출력
  const KeyWordList = () => {
    const keyword = [
      item.kw_adorable, //아기자기해요
      item.kw_clean, //깔끔해요
      item.kw_kind, //친절해요
      item.kw_mood, //감성이 넘쳐요
      item.kw_reasonable, //가성비가 좋아요
      item.kw_various, //구성이 다양해요
    ];
    const result = [];
    for (let i = 0; i < 6; i++) {
      if (i === 0 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>아기자기해요</Text>
          </View>,
        );
      }
      if (i === 1 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>깔끔해요</Text>
          </View>,
        );
      }
      if (i === 2 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>친절해요</Text>
          </View>,
        );
      }
      if (i === 3 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>감성넘쳐요</Text>
          </View>,
        );
      }
      if (i === 4 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>가성비가 좋아요</Text>
          </View>,
        );
      }
      if (i === 5 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>구성이 다양해요</Text>
          </View>,
        );
      }
    }
    return result;
  };

  //   //사장님 답변에 따라서 컴포넌트 추가
  //   const Recomment = () => {
  //     const result = [];
  //     if (item.comment === '') {
  //       //아직 사장님 답변이 달리지 않음
  //     } else {
  //       result.push(
  // ,
  //       );
  //     }
  //     return result;
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <View style={styles.reviewCardList}>
          <View style={styles.itemTitleAndDate}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginRight: 10,
                  fontSize: 15,
                  color: 'black',
                }}>
                {item.nickname}
              </Text>
            </View>
            <View>
              <Text style={styles.itemDate}>
                {item.created_at.split('T')[0]}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.starIcons}>{StartScore()}</View>
          </View>
          <View style={{width: '35%', elevation: 5}}></View>
          <View style={styles.keyword}>{KeyWordList()}</View>
          {item.image_url && (
            <View style={styles.imgBox}>
              <Image
                source={{uri: `${item.image_url}`}}
                style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          )}
          <View>
            <Text style={styles.itemDate}>{item.content}</Text>
          </View>
        </View>
      </View>
      {item.comment !== '' && (
        <View style={styles.recommentBox}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginHorizontal: 15, width: '10%'}}>
              <Image
                source={shopcomment}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{width: '75%'}}>
              <Text numberOfLines={5} multiline={true}>
                {item.comment}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: 0.5,
  },
  review: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
  },
  reviewCardList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemTitleAndDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  starIcons: {
    flexDirection: 'row',
    marginRight: 10,
    marginVertical: 3,
  },
  keyword: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 3,
  },
  imgBox: {
    width: 130,
    height: 130,
    marginVertical: 5,
  },
  recommentBox: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#F9F0F0',
  },
});

export default MenuCardList;
