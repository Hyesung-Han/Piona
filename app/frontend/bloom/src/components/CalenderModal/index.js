import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {userAPI} from '../../utils/Axios';
import {cartAPI} from '../../utils/Axios';
import {getNotResList} from '../../utils/Axios';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';

/**
 * lHJ | 2022.05.11
 * @name CalenderModal
 * @api cartAPI
 * @des
 * 1. 장바구니에 넣기 위한 달력 모달이다
 * 2. 모달이 달리는 페이지(MenuDetail 페이지)에서 api를 위한 모든 정보를 건내받은 후 날짜를 선택함
 * 3. cartAPI를 통해서 post API 호출
 */

const CalenderModal = props => {
  const item_id = props.item_id;
  const quantityStatus = props.quantityStatus;
  const shop_number = props.shop_number;
  const user_id = props.user_id;
  const token = props.token;
  const notRedData = props.notRedData;
  const [pickedDate, setPickedDate] = useState();
  const [resDateAtt, setResDateAtt] = useState({
    data: '',
    att: `{
        customStyles: {
          container: {
            backgroundColor: 'green',
          },
          text: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
      },`,
  });

  const addCart = useCallback(async () => {
    try {
      //이걸 모달로 넘겨주고 모달에서 한번에 처리하자!
      const response = await cartAPI.addCart(
        item_id,
        quantityStatus,
        pickedDate,
        shop_number,
        user_id,
        token,
      );
      console.log(response.data.data);
      // console.log(notRedData);
      Alert.alert('알림', '장바구니에 담겼습니다!');
    } catch (error) {
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [item_id, pickedDate, quantityStatus, shop_number, token, user_id]);

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
              //   markedDates={notRedData}
              //이부분은 어떻게 반복문으로 넣어야함
              markingType={'custom'}
              markedDates={{
                '2022-05-28': {
                  customStyles: {
                    container: {
                      backgroundColor: 'green',
                    },
                    text: {
                      color: 'black',
                      fontWeight: 'bold',
                    },
                  },
                },
              }}
              theme={{
                selectedDayBackgroundColor: 'red',
                arrowColor: 'blue',
                dotColor: 'green',
                todayTextColor: '#F15C74',
              }}
              onDayPress={day => {
                const nowTime = moment().format('HH:mm:ss');
                let date = day.dateString + 'T' + nowTime + '.666Z';
                setPickedDate(date);
                //console.log('pickedDate = ' + pickedDate);
              }}
            />
          </View>
          <Text>{pickedDate}</Text>
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
            //onPress={addCart}
            onPress={() => {
              addCart();
              props.exit(false);
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
