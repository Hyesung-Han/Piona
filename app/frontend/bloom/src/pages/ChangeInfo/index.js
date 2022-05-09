import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import userSlice from '../../redux/slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {userAPI} from '../../utils/Axios';

/**
 * LDJ | 2022.05.08
 * @name ChangeInfo
 * @api 1. userAPI/editUser
 *      2. userAPI/deleteUser
 *      3. userAPI/nickCheck
 *      4. userAPI/phoneRequest
 *      5. userAPI/phoneCheck
 * @des
 * 1. 회원정보 수정 페이지 (이름, 비밀번호, 닉네임, 휴대폰 번호)
 * 2. 회원탈퇴
 * 3. 닉네임 중복검사
 * 4. 핸드폰 인증요청/확인
 */

const ChangeInfoPage = ({navigation, props}) => {
  const user_name = useSelector(state => state.user.name);
  const user_id = useSelector(state => state.user.id);
  const user_nickname = useSelector(state => state.user.nickname);
  const user_phoneNumber = useSelector(state => state.user.phoneNumber);
  const user_accessToken = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();

  const [nameColor, setNameColor] = useState('#C0C0C0');
  const [passwordColor, setPasswordColor] = useState('#C0C0C0');
  const [passwordCheckColor, setPasswordCheckColor] = useState('#C0C0C0');
  const [nicknameColor, setNicknameColor] = useState('#C0C0C0');
  const [phoneNumberColor, setPhoneNumberColor] = useState('#C0C0C0');
  const [nickCheckColor, setNickCheckColor] = useState('#F15C74');
  const [phoneCheckColor, setPhoneCheckColor] = useState('#F15C74');

  const [name, setName] = useState(user_name);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickname] = useState(user_nickname);
  const [phoneNumber, setPhoneNumber] = useState(user_phoneNumber);
  const [certifiedNumber, setCertifiedNumber] = useState('');
  const [certification, setCertification] = useState('인증 요청');

  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onChangeCheckPassword = useCallback(
    text => {
      setCheckPassword(text.trim());
      if (password === text.trim()) {
        setPasswordCheckColor('#A6DB9E');
      } else {
        setPasswordCheckColor('#FFABAB');
      }
    },
    [password],
  );

  const onChangeNickname = useCallback(async text => {
    setNickname(text.trim());
  }, []);

  const onChangePhoneNumber = useCallback(text => {
    setPhoneNumber(text.trim());
  }, []);

  const onChangeCertifiedNumber = useCallback(text => {
    setCertifiedNumber(text.trim());
  }, []);

  const nickCheck = useCallback(async () => {
    try {
      const response = await userAPI.nickCheck(nickname);
      if (response.data.data === true) {
        Alert.alert('알림', '사용 가능합니다!');
        setNickCheckColor('#A6DB9E');
      } else {
        Alert.alert('알림', '이미 있는 닉네임입니다!');
      }
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [nickname]);

  const phoneRequestAndCheck = useCallback(async () => {
    if (certifiedNumber === '') {
      // 인증요청
      try {
        const response = await userAPI.phoneRequest(phoneNumber);
        console.log(response.data.result);
        if (response.data.result === 'success') {
          Alert.alert('알림', '인증번호를 확인해주세요!');
          setCertification('인증 확인');
          setPhoneCheckColor('#9ecddb');
        } else {
          Alert.alert('알림', response.data.data);
        }
      } catch (error) {
        console.error(error.response);
        if (error.response) {
          Alert.alert('알림', error.response.data.message);
        }
      }
    } else {
      // 인증확인
      try {
        const response = await userAPI.phoneCheck(phoneNumber, certifiedNumber);
        console.log(response.data.data);
        if (response.data.data === true) {
          Alert.alert('알림', '인증 완료!');
          setCertification('인증 완료');
          setPhoneCheckColor('#A6DB9E');
        } else {
          Alert.alert('알림', '인증번호 틀렸어요!');
        }
      } catch (error) {
        console.error(error.response);
        if (error.response) {
          Alert.alert('알림', error.response.data.message);
        }
      }
    }
  }, [phoneNumber, certifiedNumber]);

  const editUser = useCallback(async () => {
    try {
      const response = await userAPI.editUser(
        name,
        nickname,
        password,
        phoneNumber,
        user_id,
        user_accessToken,
      );
      console.log(response.data);
      if (response.data.result === 'success') {
        Alert.alert('알림', '회원정보 수정!');
        dispatch(
          userSlice.actions.setUser({
            name: '',
            id: '',
            nickname: '',
            phoneNumber: '',
            accessToken: '',
            refreshToken: '',
          }),
        );
        await EncryptedStorage.removeItem('refreshToken');
      } else {
        Alert.alert('알림', '미입력 확인바람!');
      }
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [
    name,
    nickname,
    password,
    phoneNumber,
    user_id,
    user_accessToken,
    dispatch,
  ]);

  const deleteUser = useCallback(async () => {
    try {
      console.log(user_id);
      const response = await userAPI.deleteUser(user_id, user_accessToken);
      console.log(response);
      dispatch(
        userSlice.actions.setUser({
          name: '',
          id: '',
          nickname: '',
          phoneNumber: '',
          accessToken: '',
          refreshToken: '',
        }),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [user_id, user_accessToken, dispatch]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
      }}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 40,
              marginTop: 30,
            }}>
            이름
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
            marginTop: 5,
          }}>
          <View
            style={{
              width: '85%',
              height: 40,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEE',
              borderRadius: 5,
            }}>
            <View
              style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
              <TextInput
                onChangeText={onChangeName}
                // placeholder={user_name}
                // placeholderTextColor="#C0C0C0"
                value={name}
                style={{
                  width: '85%',
                  textAlign: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 20,
                  marginRight: 5,
                }}
              />
              <Icon name="checkcircle" color={nameColor} size={17} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
            marginTop: 5,
          }}></View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 40,
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
            width: '95%',
            marginTop: 5,
          }}>
          <View
            style={{
              width: '85%',
              height: 40,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEE',
              borderRadius: 5,
            }}>
            <View
              style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
              <TextInput
                secureTextEntry={true}
                onChangeText={onChangePassword}
                value={password}
                style={{
                  width: '85%',
                  textAlign: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 20,
                  marginRight: 5,
                }}
              />
              <Icon name="checkcircle" color={passwordColor} size={17} />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 40,
              marginTop: 10,
            }}>
            비밀번호 확인
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
            marginTop: 5,
          }}>
          <View
            style={{
              width: '85%',
              height: 40,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEE',
              borderRadius: 5,
            }}>
            <View
              style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
              <TextInput
                secureTextEntry={true}
                onChangeText={onChangeCheckPassword}
                value={checkPassword}
                style={{
                  width: '85%',
                  textAlign: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 20,
                  marginRight: 5,
                }}
              />
              <Icon name="checkcircle" color={passwordCheckColor} size={17} />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 40,
              marginTop: 10,
            }}>
            닉네임
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: nickCheckColor,
              color: 'black',
              width: '22%',
              alignItems: 'center',
              borderRadius: 12,
              marginTop: 10,
              marginRight: 40,
              height: 24,
              justifyContent: 'center',
            }}
            onPress={() => nickCheck()}>
            <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
              중복 확인
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
            marginTop: 5,
          }}>
          <View
            style={{
              width: '85%',
              height: 40,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEE',
              borderRadius: 5,
            }}>
            <View
              style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
              <TextInput
                onChangeText={onChangeNickname}
                // placeholder={user_nickname}
                // placeholderTextColor="#C0C0C0"
                value={nickname}
                style={{
                  width: '85%',
                  textAlign: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 20,
                  marginRight: 5,
                }}
              />
              <Icon name="checkcircle" color={nicknameColor} size={17} />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 40,
              marginTop: 10,
            }}>
            휴대폰 번호
          </Text>
          {/* <TouchableOpacity onPress={() => checkId()}></TouchableOpacity> */}
          <TouchableOpacity
            style={{
              backgroundColor: phoneCheckColor,
              color: 'black',
              width: '22%',
              alignItems: 'center',
              borderRadius: 12,
              marginTop: 10,
              marginRight: 40,
              height: 24,
              justifyContent: 'center',
            }}
            onPress={phoneRequestAndCheck}>
            <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
              {certification}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
            marginTop: 5,
          }}>
          <View
            style={{
              width: '85%',
              height: 40,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEE',
              borderRadius: 5,
            }}>
            <View
              style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
              <TextInput
                onChangeText={onChangePhoneNumber}
                // placeholder={user_phoneNumber}
                // placeholderTextColor="#C0C0C0"
                value={phoneNumber}
                style={{
                  width: '85%',
                  textAlign: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 20,
                  marginRight: 5,
                }}
              />
              <Icon name="checkcircle" color={phoneNumberColor} size={17} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
          }}>
          <View
            style={{
              width: '85%',
              height: 40,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEE',
              borderRadius: 5,
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <TextInput
                onChangeText={onChangeCertifiedNumber}
                placeholder="인증번호 입력 후 인증 확인을 눌러주세요"
                placeholderTextColor="#C0C0C0"
                value={certifiedNumber}
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
            margin: 20,
            alignItems: 'center',
            width: '80%',
            // marginHorizontal: '10%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#F15C74',
              color: 'black',
              width: '100%',
              alignItems: 'center',
              borderRadius: 5,
              height: 40,
              justifyContent: 'center',
            }}
            onPress={editUser}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              정보 수정
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '85%',
            backgroundColor: '#F8F8F8',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={deleteUser}>
          <Icon name="deleteuser" color={'grey'} size={18}></Icon>
          <Text
            style={{
              fontSize: 16,
              color: 'grey',
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            회원 탈퇴
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default ChangeInfoPage;
