import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AlarmCard from '../../components/AlarmCard';
import {alarmAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * CSW | 2022.05.06
 * @name AlarmPage
 * @des
 * 알람 보여주는 페이지입니다.
 * 사용자가 알람페이지에 들어오게 되면 알람 읽음으로 patch해줍니다.
 *  */

const AlarmPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getAlarm = async () => {
    try {
      const res = await alarmAPI.get(user_id, token);
      setData(res.data);
    } catch (error) {
      console.log('Alarm 검색', error);
    }
  };

  const patchAlarm = async () => {
    try {
      const response = await alarmAPI.patch(user_id);
      console.log(response);
    } catch (error) {
      console.log('Alarm 검색', error);
    }
  };

  const renderItem = ({item}) => {
    return <AlarmCard item={item} />;
  };

  useFocusEffect(
    useCallback(() => {
      getAlarm();
      patchAlarm();
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        //리스트의 소스를 담는 속성
        //data={data}
        data={data}
        //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
        renderItem={renderItem}
        //item의 고유의 키를 부여하는 속성
        keyExtractor={item => item.alarm_id}
        //무한 스크롤때문에 넣은듯
        // onEndReached={() => {if(loading===false && pageNum<=totalPageCnt) getMyPillHistoryList()}}
        // onEndReachedThreshold={0.4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  textInput: {
    fontSize: 14,
    marginLeft: 10,
  },
  inputBox: {
    flex: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '70%',
    height: '11%',
    borderRadius: 10,
    borderColor: '#F2A7B3',
    borderWidth: 1.5,
    marginTop: '9%',
    marginBottom: '9%',
  },
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  searchBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 3,
  },
});

export default AlarmPage;
