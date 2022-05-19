import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import AlarmCard from '../../components/AlarmCard';
import {alarmAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * CSW | 2022.05.19
 * @name AlarmPage
 * @des
 * 사용 컴포넌트 : AlarmCard
 * 알람 보여주는 페이지입니다.
 * 사용자가 알람페이지에 들어오게 되면 알람 읽음으로 patch해줍니다.
 *  */

const AlarmPage = () => {
  const [data, setData] = useState([]);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getAlarm = useCallback(async () => {
    try {
      const res = await alarmAPI.get(user_id, token);
      setData(res.data);
    } catch (error) {
      console.log('Alarm 검색', error);
    }
  }, [user_id, token]);

  const patchAlarm = useCallback(async () => {
    try {
      const response = await alarmAPI.patch(user_id, token);
    } catch (error) {
      console.log('Alarm 검색', error);
    }
  }, [user_id, token]);

  const renderItem = ({item}) => {
    return <AlarmCard item={item} />;
  };

  useFocusEffect(
    useCallback(() => {
      getAlarm();
      patchAlarm();
    }, [getAlarm, patchAlarm]),
  );

  return data.length >= 1 ? (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.alarm_id}
      />
    </View>
  ) : (
    <View style={styles.Nocontainer}>
      <Text> 알람이 없습니다.</Text>
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
  Nocontainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlarmPage;
