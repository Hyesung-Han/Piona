import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {userAPI} from '../../utils/Axios';
import {useDispatch} from 'react-redux';
import userSlice from '../../redux/slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * LDJ | 2022.05.13
 * @name SignInModal
 * @api userAPI/signin
 * @des
 * 1. Sign Page에서 로그인 버튼을 누르면 뜨는 모달 창
 * 2. 유저 정보를 입력받아 로그인을 진행 [아이디, 비밀번호]
 * 3. 로그인 완료후 해당 유저정보 리덕스에 담음
 */

const SignInModal = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback(text => {
    setId(text.trim());
  }, []);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  // 로그인 버튼을 누르면!
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!id || !id.trim()) {
      return Alert.alert('알람', '아이디를 입력해주세요!');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요!');
    }

    try {
      setLoading(true);
      const response = await userAPI.signin(id, password);
      if (response.data.result === 'success') {
        Alert.alert('알림', '로그인 되었습니다.');
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            id: response.data.data.user_id,
            nickname: response.data.data.nickname,
            phoneNumber: response.data.data.phone,
            accessToken: response.data.data.access_token,
            refreshToken: response.data.data.refresh_token,
          }),
        );
        await EncryptedStorage.setItem(
          'refreshToken',
          response.data.data.refresh_token,
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert('알림', '등록되지 않은 유저정보입니다!');
    } finally {
      setLoading(false);
    }
  }, [loading, id, password, dispatch]);

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
          bottom: 0,
          width: '100%',
          height: '90%',
          backgroundColor: 'white',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 2,
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
            로그인
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '95%',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                width: '20%',
              }}>
              아이디
            </Text>
            <View
              style={{
                width: '63%',
                height: 40,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEEEEE',
                borderRadius: 5,
              }}>
              <TextInput
                onChangeText={onChangeId}
                value={id}
                style={{
                  width: '70%',
                  textAlign: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 10,
                  marginRight: 5,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                width: '20%',
              }}>
              비밀번호
            </Text>
            <View
              style={{
                width: '60%',
                height: 40,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEEEEE',
                borderRadius: 5,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 1,
                }}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={onChangePassword}
                  value={password}
                  style={{
                    width: '70%',
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
              margin: 20,
              alignItems: 'center',
              width: '80%',
              // marginHorizontal: '10%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#F15C74',
                width: '100%',
                alignItems: 'center',
                borderRadius: 5,
                height: 40,
                justifyContent: 'center',
              }}
              disabled={loading}
              onPress={onSubmit}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  로그인
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignInModal;
