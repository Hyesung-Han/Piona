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
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * LHJ | 2022.05.13
 * @name MenuCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 : .
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const MenuCardList = ({item, navigation}) => {
  // 0: {
  //     comment: "감사감사~"
  //     content: "여름이었다..."
  //     created_at: "2022-05-29T09:00:00"
  //     image_url: "sdf"
  //     kw_adorable: "Y"
  //     kw_clean: "Y"
  //     kw_kind: "N"
  //     kw_mood: "Y"
  //     kw_reasonable: "Y"
  //     kw_various: "N"
  //     nickname: "asdasd"
  //     reservation_id: 1
  //     review_id: 1
  //     score: 5
  //     shop_name: "pipipi"
  //    }
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
          <Text color="#F2A344" backgroundColor="transparent" size={15}>
            아기자기해요
          </Text>,
        );
      }
      if (i === 1 && keyword[i] === 'Y') {
        result.push(
          <Text color="#F2A344" backgroundColor="transparent" size={15}>
            깔끔해요
          </Text>,
        );
      }
      if (i === 2 && keyword[i] === 'Y') {
        result.push(
          <Text color="#F2A344" backgroundColor="transparent" size={15}>
            친절해요
          </Text>,
        );
      }
      if (i === 3 && keyword[i] === 'Y') {
        result.push(
          <Text color="#F2A344" backgroundColor="transparent" size={15}>
            감성이 넘쳐요
          </Text>,
        );
      }
      if (i === 4 && keyword[i] === 'Y') {
        result.push(
          <Text color="#F2A344" backgroundColor="transparent" size={15}>
            가성비가 좋아요
          </Text>,
        );
      }
      if (i === 5 && keyword[i] === 'Y') {
        result.push(
          <Text color="#F2A344" backgroundColor="transparent" size={15}>
            구성이 다양해요
          </Text>,
        );
      }
    }
    return result;
  };

  //사장님 답변에 따라서 컴포넌트 추가
  const Recomment = () => {
    const result = [];
    if (item.comment === '') {
      //아직 사장님 답변이 달리지 않음
    } else {
      result.push(
        <View>
          <View style={{width: '35%', elevation: 5}}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbqsmXsyp035Mxiq-KXC1kELso0A1bixXMA&usqp=CAU',
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 15,
              }}
            />
          </View>
          <View>
            <Text>{item.comment}</Text>
          </View>
        </View>,
      );
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={styles.doneCardList}>
        <View style={styles.seperateContainer}>
          <View style={{width: '75%'}}>
            <View style={styles.itemInfoContainer}>
              <View style={styles.itemTitleAndDate}>
                <View>
                  <Text style={styles.itemTitle}>{item.nickname}</Text>
                </View>
                <View>
                  <Text style={styles.itemDate}>
                    {item.created_at.split('T')[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.itemDate}>{item.content}</Text>
                </View>
                <View>
                  <View style={styles.starIcons}>{StartScore()}</View>
                </View>
                <View>
                  <View>{KeyWordList()}</View>
                </View>
                <View>
                  <View>{Recomment()}</View>
                </View>
              </View>
              <View>
                {/* <Text style={styles.itemDesc}>{keyWordList()}</Text> */}
              </View>
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

const styles = StyleSheet.create({});

export default MenuCardList;
