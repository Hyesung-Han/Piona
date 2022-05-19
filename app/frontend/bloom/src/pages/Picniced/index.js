import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import DoneCard from '../../components/DoneCard';
import {getMyReservationList} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import picnicSlice from '../../redux/slices/picnic';

/**
 * LHJ,CSW | 2022.05.19
 * @name PicnicedPage
 * @api getMyReservationList
 * @des
 * 1. 컴포넌트 목록 : DoneCard
 * 2. 페이지 기능 :
 * 피크닉 페이지 안에 있는 완료된 예약 탭
 */

const PicnicedPage = ({navigation}) => {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const picniced_list = useSelector(state => state.picnic.picniced_list);

  const getMyReservation = useCallback(async () => {
    try {
      const response = await getMyReservationList(user_id, token);
      const res = response.data;
      const firstFilteredByStatus = res.filter(item => item.status === 'D');
      const secondFilteredByStatus = res.filter(item => item.status === 'C');
      const newArr = [...firstFilteredByStatus, ...secondFilteredByStatus];
      if (response.result === 'success') {
        dispatch(picnicSlice.actions.setPicnicedList(newArr));
      }
    } catch (error) {
      console.log('완료된 예약현황 조회 실패', error);
    }
  }, [user_id, token, dispatch]);

  useFocusEffect(
    useCallback(() => {
      getMyReservation();
    }, [getMyReservation]),
  );

  const renderItem = ({item}) => {
    return <DoneCard item={item} navigation={navigation} />;
  };

  return picniced_list.length >= 1 ? (
    <View style={{backgroundColor: '#F8F8F8', flex: 1}}>
      <View>
        <FlatList
          data={picniced_list}
          renderItem={renderItem}
          keyExtractor={item => item.reservation_id}
        />
      </View>
    </View>
  ) : (
    <View style={styles.Nocontainer}>
      <Text> 완료된 예약이 없습니다.</Text>
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
export default PicnicedPage;
