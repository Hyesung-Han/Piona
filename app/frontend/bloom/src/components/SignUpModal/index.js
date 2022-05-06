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

/**
 * LDJ | 2022.05.04
 * @name SignUpModal
 * @api /user/signup
 * @des
 * 1. Sign Page에서 회원가입 버튼을 누르면 뜨는 모달 창
 * 2. 유저 정보를 입력받아 회원가입을 진행
 */

const SignUpModal = props => {
  const [loading, setLoading] = useState(false);

  const [idColor, setIdColor] = useState('#C0C0C0');
  const [passwordColor, setPasswordColor] = useState('#C0C0C0');
  const [passwordCheckColor, setPasswordCheckColor] = useState('#C0C0C0');
  const [nameColor, setNameColor] = useState('#C0C0C0');
  const [nicknameColor, setNicknameColor] = useState('#C0C0C0');
  const [phoneNumberColor, setPhoneNumberColor] = useState('#C0C0C0');

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChangeId = useCallback(text => {
    setId(text.trim());
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

  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);

  const onChangeNickname = useCallback(text => {
    setNickname(text.trim());
  }, []);

  const onChangePhoneNumber = useCallback(text => {
    setPhoneNumber(text.trim());
  }, []);

  // 아이디 중복확인 버튼 누르면?!
  // const checkId = async () => {
  //   const result = await userAPI.emailCheck(id);
  //   if (result === 200) {
  //     setIdColor('#A6DB9E');
  //   } else if (result === 409) {
  //     setIdColor('#FFABAB');
  //   }
  // };

  // 닉네임 중복확인 버튼 누르면?!
  // const checkNickname = async () => {
  //   const result = await userAPI.emailCheck(id);
  //   if (result === 200) {
  //     setIdColor('#A6DB9E');
  //   } else if (result === 409) {
  //     setIdColor('#FFABAB');
  //   }
  // };

  // 휴대폰 번호 인증요청 버튼 누르면?!
  // const phone = async () => {
  //   const result = await userAPI.emailCheck(id);
  //   if (result === 200) {
  //     setIdColor('#A6DB9E');
  //   } else if (result === 409) {
  //     setIdColor('#FFABAB');
  //   }
  // };

  // 회원가입 버튼을 누르면!
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
    if (!checkPassword || !checkPassword.trim()) {
      return Alert.alert('알림', '비밀번호 확인을 입력해주세요!');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요!');
    }
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '닉네임을 입력해주세요!');
    }
    if (!phoneNumber || !phoneNumber.trim()) {
      return Alert.alert('알림', '휴대폰 번호를 입력해주세요!');
    }
    console.log(
      loading,
      id,
      password,
      checkPassword,
      name,
      nickname,
      phoneNumber,
    );
    try {
      setLoading(true);
      const response = await userAPI.signup(
        id,
        password,
        name,
        nickname,
        phoneNumber,
      );
      Alert.alert('알림', '회원가입 되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            sendData();
          },
        },
      ]);
      // 완료 후 모달 닫고 Sign Page로!
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, id, password, checkPassword, name, nickname, phoneNumber]);

  const sendData = () => {
    props.exit(false);
  };

  // const sendData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await userAPI.signup(
  //       id,
  //       password,
  //       name,
  //       nickname,
  //       phoneNumber,
  //     );
  //     console.log(response);
  //     Alert.alert('알림', '회원가입 완료!');
  //   } catch (error) {
  //     console.log(error.response);
  //     if (error) {

  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  //   if (passwordColor === '#A6DB9E' && idColor === '#A6DB9E') {
  //     props.user({id: id, password: password});
  //     props.now(false);
  //     props.next(true);
  //   } else if (id.length < 2) {
  //     alert('아이디를 입력해주세요.');
  //   } else if (idColor === '#000000') {
  //     alert('아이디 중복확인을 해주세요.');
  //   } else if (idColor === '#FFABAB') {
  //     alert('중복된 아이디입니다. 다시 확인해주세요.');
  //   } else if (password.length < 1) {
  //     alert('비밀번호를 입력해주세요.');
  //   } else {
  //     alert('비밀번호를 확인해주세요.');
  //   }
  // };

  // const canGoNext =
  //   id && password && checkPassword && name && nickname && phoneNumber;

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
            회원가입
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
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 40,
                marginTop: 10,
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
                  value={name}
                  style={{
                    width: '85%',
                    textAlign: 'center',
                    backgroundColor: '#EEEEEE',
                    borderRadius: 5,
                    marginRight: 5,
                  }}
                />
                <Icon name="checkcircle" color={nameColor} size={17} />
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
                fontWeight: 'bold',
                marginLeft: 40,
                marginTop: 10,
              }}>
              아이디
            </Text>
            {/* <TouchableOpacity onPress={() => checkId()}></TouchableOpacity> */}
            <TouchableOpacity
              style={{
                backgroundColor: '#F15C74',
                color: 'black',
                width: '22%',
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 10,
                marginRight: 40,
                height: 24,
                justifyContent: 'center',
              }}>
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
                  onChangeText={onChangeId}
                  value={id}
                  style={{
                    width: '85%',
                    textAlign: 'center',
                    backgroundColor: '#EEEEEE',
                    borderRadius: 20,
                    marginRight: 5,
                  }}
                />
                <Icon name="checkcircle" color={idColor} size={17} />
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
                fontWeight: 'bold',
                marginLeft: 40,
                marginTop: 10,
              }}>
              닉네임
            </Text>
            {/* <TouchableOpacity onPress={() => checkId()}></TouchableOpacity> */}
            <TouchableOpacity
              style={{
                backgroundColor: '#F15C74',
                color: 'black',
                width: '22%',
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 10,
                marginRight: 40,
                height: 24,
                justifyContent: 'center',
              }}>
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
                fontWeight: 'bold',
                marginLeft: 40,
                marginTop: 10,
              }}>
              휴대폰 번호
            </Text>
            {/* <TouchableOpacity onPress={() => checkId()}></TouchableOpacity> */}
            <TouchableOpacity
              style={{
                backgroundColor: '#F15C74',
                color: 'black',
                width: '22%',
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 10,
                marginRight: 40,
                height: 24,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                인증 요청
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
              disabled={loading}
              onPress={onSubmit}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  회원가입
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUpModal;
