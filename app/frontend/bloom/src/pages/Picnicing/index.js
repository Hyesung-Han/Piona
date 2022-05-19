import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import PicnicCard from '../../components/PicnicCard';
import {getMyReservationList} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import picnicSlice from '../../redux/slices/picnic';

/**
 * LHJ,CSW | 2022.05.19
 * @name PicnicingPage
 * @api getMyReservationList
 * @des
 * 1. 컴포넌트 목록 : PicnicCard
 * 2. 페이지 기능 :
 * 피크닉 페이지 안에 있는 진행중인 예약 탭
 */

const PicnicingPage = () => {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const picnicing_list = useSelector(state => state.picnic.picnicing_list);

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
      if (response.result === 'success') {
        dispatch(picnicSlice.actions.setPicnicingList(newArr));
      }
    } catch (error) {
      console.log(user_id);
      console.log('예약현황 조회 실패', error);
    }
  }, [user_id, token, dispatch]);

  useFocusEffect(
    useCallback(() => {
      getMyReservation();
    }, [getMyReservation]),
  );

  const renderItem = ({item}) => {
    return <PicnicCard item={item} />;
  };

  return picnicing_list.length >= 1 ? (
    <View style={{backgroundColor: '#F8F8F8', flex: 1}}>
      <View style={{backgroundColor: '#CBCBCB'}}>
        <FlatList
          data={picnicing_list}
          renderItem={renderItem}
          keyExtractor={item => item.reservation_id}
        />
      </View>
    </View>
  ) : (
    <View style={styles.Nocontainer}>
      <Text> 진행중인 예약이 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Nocontainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PicnicingPage;
