import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text, FlatList} from 'react-native';
import PicnicCard from '../../components/PicnicCard';
import {getMyReservationList} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * LHJ | 2022.05.11
 * @name PicnicingPage
 * @api getMyReservationList
 * @des
 * 1. 컴포넌트 목록 : PicnicCard
 * 2. 페이지 기능 :
 * 피크닉 페이지 안에 있는 진행중인 예약 탭이다.
 * 진행중인 예약 목록을 보여주기 위해서 RN에서 기본 제공하는 FlatList(가변적인 크기의 목록을 리스트화 할 때 사용)와
 * 해당 리스트를 하나의 카드로 보여주기 위해서 PicnicCard 컴포넌트를 사용함
 * 사용된 api로는 /picnic(나의 예약현황 보기), /picnic(예약 취소)가 있다.
 */

const PicnicingPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  //받아오고 그냥 바로 쓰면 됨
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getMyReservation = useCallback(async () => {
    try {
      const response = await getMyReservationList(user_id, token);
      const res = response.data;
      const addFirstFilteredByStatus = res.filter(item => item.status === 'R');
      const addSecondFilteredByStatus = res.filter(item => item.status === 'U');
      const addThirdFilteredByStatus = res.filter(item => item.status === 'F');
      const newArr = [
        ...addFirstFilteredByStatus,
        ...addSecondFilteredByStatus,
        ...addThirdFilteredByStatus,
      ];
      setData(newArr);
      console.log(response.data);
    } catch (error) {
      console.log(user_id);
      console.log('예약현황 조회 실패', error);
    }
  }, [token, user_id]);

  useFocusEffect(
    useCallback(() => {
      getMyReservation();
    }, [getMyReservation]),
  );

  const renderItem = ({item}) => {
    return <PicnicCard item={item} />;
  };

  return (
    <View style={{backgroundColor: '#F8F8F8', flex: 1}}>
      <View style={{backgroundColor: '#CBCBCB'}}>
        <FlatList
          //리스트의 소스를 담는 속성
          data={data}
          //data={DATA}
          //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
          renderItem={renderItem}
          //item의 고유의 키를 부여하는 속성
          keyExtractor={item => item.reservation_id}
        />
      </View>
    </View>
  );
};
export default PicnicingPage;
