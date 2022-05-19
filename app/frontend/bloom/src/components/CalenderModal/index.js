import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {cartAPI} from '../../utils/Axios';
import {useDispatch} from 'react-redux';
import cartSlice from '../../redux/slices/cart';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {EmptyCart} from '../../utils/Axios';

/**
 * LHJ | 2022.05.19
 * @name CalenderModal
 * @api cartAPI
 * @des
 * 1. 장바구니에 넣기 위한 달력 모달이다
 * 2. 모달이 달리는 페이지(MenuDetail 페이지)에서 api를 위한 모든 정보를 건내받은 후 날짜를 선택함
 */

const CalenderModal = props => {
  const dispatch = useDispatch();
  const item_id = props.item_id;
  const quantityStatus = props.quantityStatus;
  const shop_number = props.shop_number;
  const user_id = props.user_id;
  const token = props.token;
  const notRedData = props.notRedData;
  const [pickedDate, setPickedDate] = useState();
  const [pickedDateFilter, setPickedDateFilter] = useState();
  const [selectDate, setSelectDate] = useState('');
  let markedDates = [];

  const render = () => {
    if (selectDate === null) {
      for (let i = 0; i < notRedData.length; i++) {
        markedDates[notRedData[i]] = {
          customStyles: {
            container: {
              backgroundColor: 'white',
            },
            text: {
              color: '#DADADA',
            },
          },
          disableTouchEvent: true,
        };
      }
    } else {
      for (let i = 0; i < notRedData.length; i++) {
        markedDates[notRedData[i]] = {
          customStyles: {
            container: {
              backgroundColor: 'white',
            },
            text: {
              color: '#DADADA',
            },
          },
          disableTouchEvent: true,
        };
      }
      markedDates[selectDate] = {
        customStyles: {
          container: {
            backgroundColor: '#F2A7B3',
          },
          text: {
            color: 'white',
          },
        },
      };
    }
    return markedDates;
  };

  const addCart = useCallback(async () => {
    try {
      const response = await cartAPI.addCart(
        item_id,
        quantityStatus,
        pickedDate,
        shop_number,
        user_id,
        token,
      );
      console.log(response.data.data);
      if (response.data.result === 'success') {
        Alert.alert('알림', '장바구니에 담겼습니다!', [
          {
            text: '확인',
            onPress: () => {
              props.exit(false);
            },
          },
        ]);
      } else if (
        response.data.result === 'fail' &&
        response.data.data === 'shopNumber'
      ) {
        Alert.alert(
          '알림',
          '다른 가게 상품이 담겨있습니다. 장바구니를 비우시겠습니까?',
          [
            {
              text: '확인',
              onPress: async () => {
                dispatch(cartSlice.actions.addCartList([]));
                const response = await EmptyCart(user_id, token);
                console.log(response.data.result);
                props.exit(false);
              },
            },
            {
              text: '취소',
              onPress: () => {
                props.exit(false);
              },
            },
          ],
        );
      } else if (
        response.data.result === 'fail' &&
        response.data.data === 'date'
      ) {
        Alert.alert(
          '알림',
          '다른 날짜 예약이 담겨있습니다. 장바구니를 비우시겠습니까?',
          [
            {
              text: '확인',
              onPress: async () => {
                const response = await EmptyCart(user_id, token);
                dispatch(cartSlice.actions.addCartList([]));
                console.log(response.data.result);
                props.exit(false);
              },
            },
            {
              text: '취소',
              onPress: () => {
                props.exit(false);
              },
            },
          ],
        );
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [
    dispatch,
    item_id,
    pickedDate,
    props,
    quantityStatus,
    shop_number,
    token,
    user_id,
  ]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F2A7B3',
      }}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '90%',
          backgroundColor: 'white',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 2,
          bottom: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            예약 날짜 선택
          </Text>
          <Icon.Button
            name="close"
            size={17}
            color="black"
            backgroundColor="white"
            onPress={() => props.exit(false)}
          />
        </View>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{width: '100%'}}>
            <Calendar
              style={styles.calendar}
              minDate={moment().format().split('T')[0]}
              maxDate={moment().add(13, 'days').format().split('T')[0]}
              markingType={'custom'}
              markedDates={render()}
              theme={{
                selectedDayBackgroundColor: 'green',
                arrowColor: 'blue',
                dotColor: 'green',
                todayTextColor: '#F15C74',
              }}
              onDayPress={day => {
                const nowTime = moment().format('HH:mm:ss');
                let date = day.dateString + 'T' + nowTime + '.666Z';
                setPickedDate(date);
                setPickedDateFilter(day.dateString);
                setSelectDate(day.dateString);
              }}
            />
          </View>
          <Text style={{alignSelf: 'flex-end'}}></Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#F15C74',
              color: 'black',
              width: '60%',
              alignItems: 'center',
              borderRadius: 5,
              height: 40,
              justifyContent: 'center',
            }}
            onPress={() => {
              addCart();
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              완료
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalenderModal;
