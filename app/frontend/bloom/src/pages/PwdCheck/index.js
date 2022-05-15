import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Dimensions,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {userAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * LDJ | 2022.05.06
 * @name PwdCheck
 * @api userAPI/pwdCheck
 * @des
 * 1. 회원정보 수정 전에 비밀번호 확인을 위한 페이지
 * 2. 입력 후 내 정보 수정 페이지로 이동
 * 3. 로그인 상태가 유지되어있는지를 확인하기 위해 토큰도 함께 보내줘야 함
 */

const PwdCheckPage = ({navigation}) => {
  const user_id = useSelector(state => state.user.id);
  const user_accessToken = useSelector(state => state.user.accessToken);

  const [password, setPassword] = useState('');

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요!');
    }
    try {
      const response = await userAPI.pwdCheck(
        user_id,
        password,
        user_accessToken,
      );
      if (response.data.result === 'success') {
        Alert.alert('알림', '비밀번호 일치!');
        navigation.navigate('ChangeInfo', {navigation: `${navigation}`});
      } else {
        Alert.alert('알림', '비밀번호를 제대로 입력해주세요!');
      }
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [user_id, password, user_accessToken, navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
            marginLeft: 30,
            marginTop: 10,
          }}>
          비밀번호
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '85%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEEEEE',
            borderRadius: 20,
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
            <TextInput
              secureTextEntry={true}
              onChangeText={onChangePassword}
              value={password}
              style={{
                width: '85%',
                textAlign: 'center',
                backgroundColor: '#EEEEEE',
                borderRadius: 20,
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: 'black',
            fontWeight: 'bold',
          }}>
          내 정보 수정을 위해 현재 비밀번호를 입력해주세요.
        </Text>
      </View>
      <View
        style={{
          margin: 20,
          alignItems: 'center',
          width: '80%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F15C74',
            color: 'black',
            width: '100%',
            alignItems: 'center',
            borderRadius: 12,
            height: 40,
            justifyContent: 'center',
          }}
          onPress={() => onSubmit()}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            비밀번호 확인
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PwdCheckPage;
