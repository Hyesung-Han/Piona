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

/**
 * LDJ | 2022.05.02
 * @name PwdCheck
 * @api -
 * @des
 * 1. 회원정보 수정 전에 비밀번호 확인을 위한 페이지
 * 2. 입력 후 내 정보 수정 페이지로 이동
 */

const PwdCheckPage = ({navigation}) => {
  const [password, setPassword] = useState('');

  const sendData = () => {
    navigation.navigate('ChangeInfo', {navigation: `${navigation}`});
  };

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
          marginTop: 5,
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
              onChangeText={setPassword}
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
          onPress={() => sendData()}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            비밀번호 확인
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PwdCheckPage;
