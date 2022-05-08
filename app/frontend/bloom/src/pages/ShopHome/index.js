import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {shopDetailAPI} from '../../utils/Axios';

/**
 * LHJ | 2022.05.06
 * @name shopHome
 * @api shopDetailAPI/getShopDetail
 * @des
 * 1. 컴포넌트 설명:
 * 2. 해당 페이지 설명 : 리덕스에 저장된 shopNumber를 뽑아와서 api(shopDetailAPI/getShopDetail)를 호출한다.
 * 해당 페이지(shopHome)에서는 가게 상세 정보 api를 호출한다.
 */

const ShopHomePage = ({navigation, route}) => {
  const [data, setData] = useState([]);
  // const [modalVisible, setModalVisible] = useState(true);
  //state 뒤에 오는 shop은 reducer에 설정된 이름
  //그 뒤에 오는 shopNumber는 slice에 저장된 변경하고자 하는 변수
  const shopNumber = useSelector(state => state.shop.shopNumber);
  const shopName = useSelector(state => state.shop.shopName);
  const token = useSelector(state => state.user.accessToken);

  const getShopDetailInfo = async () => {
    try {
      const res = await shopDetailAPI.getShopDetail(shopNumber, token);
      setData(res.data);
      console.log(res);
    } catch (error) {
      console.log('위시리스트 검색', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getShopDetailInfo();
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
      }}>
      <Text>{data.description}</Text>
      <Text>{data.score}</Text>
      <Text>{shopNumber}</Text>
    </View>
  );
};
export default ShopHomePage;
