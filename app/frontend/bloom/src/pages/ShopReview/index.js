import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {shopDetailAPI} from '../../utils/Axios';
import ReviewCard from '../../components/ReviewCard';

/**
 * LHJ | 2022.05.19
 * @name ShopReview
 * @api
 * @des
 * 1. 컴포넌트 설명: ReviewCard
 * 2. 해당 페이지 설명 : 가게 상세 정보 보기 이후 탭을 통해 이동 가능한 '리뷰 목록 조회'이다.
 */

const ShopReviewPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const shopNumber = useSelector(state => state.shop.number);
  const token = useSelector(state => state.user.accessToken);

  const getReviewList = useCallback(async () => {
    try {
      const res = await shopDetailAPI.getReviewList(shopNumber, token);
      setData(res.data);
      console.log(res);
    } catch (error) {
      console.log('위시리스트 검색', error);
    }
  }, [shopNumber, token]);

  useFocusEffect(
    useCallback(() => {
      getReviewList();
    }, [getReviewList]),
  );

  const renderItem = ({item}) => {
    return <ReviewCard item={item} navigation={navigation} />;
  };

  return (
    <View style={{backgroundColor: '#F8F8F8', flex: 1}}>
      <View style={{backgroundColor: '#CBCBCB'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.item_id}
        />
      </View>
    </View>
  );
};
export default ShopReviewPage;
