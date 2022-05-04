import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text, FlatList} from 'react-native';
import DoneCard from '../../components/DoneCard';
import RegisterReview from '../RegisterReview';
import {getMyReservationList} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * LHJ | 2022.05.04
 * @name PicnicedPage
 * @api getMyReservationList
 * @des
 * 1. 컴포넌트 목록 : DoneCard,FlatList
 * 2. 페이지 기능 :
 * 피크닉 페이지 안에 있는 완료된 예약 탭이다.
 * 완료된 예약 목록을 보여주기 위해서 RN에서 기본 제공하는 FlatList(가변적인 크기의 목록을 리스트화 할 때 사용)와
 * 해당 리스트를 하나의 카드로 보여주기 위해서 DoneCard 컴포넌트를 사용함
 * 사용된 api로는 /picnic(나의 예약현황 보기), /review(리뷰 등록)이 있다.
 * 04.27 : 더미 데이터 추가 DATA
 */

const PicnicedPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  //받아오고 그냥 바로 쓰면 됨
  const user_id = useSelector(state => state.user.id);

  //picnicing에서 사용했던 api를 그대로 사용하여 프론트단에서 필터링 하여 나타냄
  const getMyReservation = async () => {
    try {
      //const response = await getMyReservationList(user_id);
      const response = await getMyReservationList('piona');
      const filteredByStatus = response.data.filter(
        item => item.status !== 'R',
      );
      setData(filteredByStatus);
      console.log(filteredByStatus);
    } catch (error) {
      console.log('예약현황 조회 실패', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMyReservation();
    }, []),
  );

  const renderItem = ({item}) => {
    return <DoneCard item={item} navigation={navigation} />;
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
          keyExtractor={item => item.reservation_id}
        />
      </View>
    </View>
  );
};
export default PicnicedPage;
