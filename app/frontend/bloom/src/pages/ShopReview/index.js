import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {shopDetailAPI} from '../../utils/Axios';
import ReviewCard from '../../components/ReviewCard';

/**
 * LHJ | 2022.05.13
 * @name ShopReview
 * @api .
 * @des
 * 1. 컴포넌트 설명:
 * 2. 해당 페이지 설명 : 가게 상세 정보 보기 이후 탭을 통해 이동 가능한 '리뷰 목록 조회'이다.
 */

const ShopReviewPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const shopNumber = useSelector(state => state.shop.number);
  const shopName = useSelector(state => state.shop.name);
  const token = useSelector(state => state.user.accessToken);

  const getReviewList = async () => {
    try {
      const res = await shopDetailAPI.getReviewList(shopNumber, token);
      setData(res.data);
      console.log(res);
    } catch (error) {
      console.log('위시리스트 검색', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReviewList();
    }, []),
  );

  const renderItem = ({item}) => {
    return <ReviewCard item={item} navigation={navigation} />;
  };

  return (
    <View>
      <View>
        <FlatList
          //리스트의 소스를 담는 속성
          data={data}
          //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
          renderItem={renderItem}
          //item의 고유의 키를 부여하는 속성
          keyExtractor={item => item.item_id}
        />
      </View>
    </View>
  );
};
export default ShopReviewPage;
