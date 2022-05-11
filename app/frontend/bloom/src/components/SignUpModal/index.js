import React, {useState, useCallback, useEffect} from 'react';
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
 * LDJ | 2022.05.11
 * @name SignUpModal
 * @api 1. userAPI/signup
 *      2. userAPI/idCheck
 *      3. userAPI/nickCheck
 *      4. userAPI/phoneRequest
 *      5. userAPI/phoneCheck
 * @des
 * 1. Sign Page에서 회원가입 버튼을 누르면 뜨는 모달 창
 * 2. 유저 정보를 입력받아 회원가입을 진행
 * 3. 아이디 중북검사, 닉네임 중복검사
 * 4. 핸드폰 인증요청/확인
 * 5. 유효성 검사 추가 [다 녹색으로 통과하지 못하면 회원가입 불가]
 */

const SignUpModal = props => {
  const [loading, setLoading] = useState(false);

  const [nameColor, setNameColor] = useState('#C0C0C0');
  const [idColor, setIdColor] = useState('#C0C0C0');
  const [passwordColor, setPasswordColor] = useState('#C0C0C0');
  const [passwordCheckColor, setPasswordCheckColor] = useState('#C0C0C0');
  const [nicknameColor, setNicknameColor] = useState('#C0C0C0');
  const [phoneNumberColor, setPhoneNumberColor] = useState('#C0C0C0');
  const [idCheckColor, setIdCheckColor] = useState('#F15C74');
  const [nickCheckColor, setNickCheckColor] = useState('#F15C74');
  const [phoneCheckColor, setPhoneCheckColor] = useState('#F15C74');

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certifiedNumber, setCertifiedNumber] = useState('');
  const [certification, setCertification] = useState('인증 요청');

  // #A6DB9E : 녹색
  // #FFABAB : 분홍색
  // #C0C0C0 : 회색

  const regNm = /^[가-힣]{2,}$/;
  const regId = /^[a-z0-9]{4,}$/;
  const regPwd = /^[a-z0-9#?!@$ %^&*-]{7,14}$/;
  const regNnm = /^[가-힣]{2,}$/;
  const regPhonenum = /^[0-9]{10,11}$/;

  const [canGoNext, setCanGoNext] = useState(true);

  useEffect(() => {
    if (
      nameColor === '#A6DB9E' &&
      idColor === '#A6DB9E' &&
      passwordColor === '#A6DB9E' &&
      passwordCheckColor === '#A6DB9E' &&
      nicknameColor === '#A6DB9E' &&
      phoneNumberColor === '#A6DB9E' &&
      idCheckColor === '#A6DB9E' &&
      nickCheckColor === '#A6DB9E' &&
      phoneCheckColor === '#A6DB9E'
    ) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
  }, [
    nameColor,
    idColor,
    passwordColor,
    passwordCheckColor,
    nicknameColor,
    phoneNumberColor,
    idCheckColor,
    nickCheckColor,
    phoneCheckColor,
  ]);

  const onChangeName = useCallback(
    async text => {
      setName(text.trim());
      if (name.length > 1) {
        if (regNm.test(name)) {
          setNameColor('#A6DB9E');
        } else {
          setNameColor('#FFABAB');
        }
      } else {
        setNameColor('#C0C0C0');
      }
    },
    [regNm, name],
  );

  const onChangeId = useCallback(
    async text => {
      setId(text.trim());
      if (id.length > 3) {
        if (regId.test(id)) {
          setIdColor('#A6DB9E');
        } else {
          setIdColor('#FFABAB');
        }
      } else {
        setIdColor('#C0C0C0');
      }
    },
    [regId, id],
  );

  const onChangePassword = useCallback(
    async text => {
      setPassword(text.trim());
      if (password.length > 7 && password.length < 16) {
        if (regPwd.test(password)) {
          setPasswordColor('#A6DB9E');
        } else {
          setPasswordColor('#FFABAB');
        }
      } else {
        setPasswordColor('#C0C0C0');
      }
    },
    [regPwd, password],
  );

  const onChangeCheckPassword = useCallback(
    async text => {
      setCheckPassword(text.trim());
      if (password === text.trim()) {
        setPasswordCheckColor('#A6DB9E');
      } else {
        setPasswordCheckColor('#FFABAB');
      }
    },
    [password],
  );

  const onChangeNickname = useCallback(
    async text => {
      setNickname(text.trim());
      if (nickname.length > 1) {
        if (regNnm.test(nickname)) {
          setNicknameColor('#A6DB9E');
        } else {
          setNicknameColor('#FFABAB');
        }
      } else {
        setNicknameColor('#C0C0C0');
      }
    },
    [regNnm, nickname],
  );

  const onChangePhoneNumber = useCallback(
    async text => {
      setPhoneNumber(text.trim());
      if (phoneNumber.length > 1) {
        if (regPhonenum.test(phoneNumber)) {
          setPhoneNumberColor('#A6DB9E');
        } else {
          setPhoneNumberColor('#FFABAB');
        }
      } else {
        setPhoneNumberColor('#C0C0C0');
      }
    },
    [regPhonenum, phoneNumber],
  );

  const onChangeCertifiedNumber = useCallback(text => {
    setCertifiedNumber(text.trim());
  }, []);

  const idCheck = useCallback(async () => {
    try {
      const response = await userAPI.idCheck(id);
      if (response.data.data === true) {
        Alert.alert('알림', '사용 가능합니다!');
        setIdCheckColor('#A6DB9E');
      } else {
        Alert.alert('알림', '이미 있는 아이디입니다!');
      }
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [id]);

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
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    id,
    password,
    checkPassword,
    name,
    nickname,
    phoneNumber,
    sendData,
  ]);

  const sendData = useCallback(() => {
    props.exit(false);
  }, [props]);

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
                  placeholder="한글만, 최소 2자"
                  placeholderTextColor="#C0C0C0"
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
            <TouchableOpacity
              style={{
                backgroundColor: idCheckColor,
                color: 'black',
                width: '22%',
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 10,
                marginRight: 40,
                height: 24,
                justifyContent: 'center',
              }}
              onPress={() => idCheck()}>
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
                  placeholder="영소문자+숫자, 최소 4자"
                  placeholderTextColor="#C0C0C0"
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
              justifyContent: 'flex-start',
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
            <Text
              style={{
                fontSize: 10,
                marginLeft: 34,
                marginTop: 15,
              }}>
              영소문자+숫자+특수문자 각 1개 이상 / 8~15자
            </Text>
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
                  placeholder="한글만, 최소 2자"
                  placeholderTextColor="#C0C0C0"
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
                  placeholder="숫자만, 11자"
                  placeholderTextColor="#C0C0C0"
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
              disabled={canGoNext || loading}
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
