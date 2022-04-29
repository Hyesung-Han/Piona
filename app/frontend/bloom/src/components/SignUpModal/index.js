import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import {userAPI} from '../../utils/Axios';

/**
 * LDJ | 2022.04.28
 * @name SignUpModal
 * @api -
 * @des
 * 1. Sign Page에서 회원가입 버튼을 누르면 뜨는 모달 창
 * 2. 유저 정보를 입력받아 회원가입을 진행
 */

const SignUpModal = props => {
  const [nameColor, setNameColor] = useState('#000000');
  const [idColor, setIdColor] = useState('#000000');
  const [passwordColor, setPasswordColor] = useState('#000000');
  const [passwordCheckColor, setPasswordCheckColor] = useState('#000000');
  const [nicknameColor, setNicknameColor] = useState('#000000');
  const [phoneNumberColor, setPhoneNumberColor] = useState('#000000');

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // 비밀번호 확인 작성 -> 비밀번호 일치 여부 확인
  const handlePassword = data => {
    setCheckPassword(data);
    if (password === data) {
      setPasswordCheckColor('#A6DB9E');
    } else {
      setPasswordCheckColor('#FFABAB');
    }
  };

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

  // 회원가입 버튼 누르면?!
  const sendData = () => {
    if (passwordColor === '#A6DB9E' && idColor === '#A6DB9E') {
      props.user({id: id, password: password});
      props.now(false);
      props.next(true);
    } else if (id.length < 2) {
      alert('아이디를 입력해주세요.');
    } else if (idColor === '#000000') {
      alert('아이디 중복확인을 해주세요.');
    } else if (idColor === '#FFABAB') {
      alert('중복된 아이디입니다. 다시 확인해주세요.');
    } else if (password.length < 1) {
      alert('비밀번호를 입력해주세요.');
    } else {
      alert('비밀번호를 확인해주세요.');
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          position: 'absolute',
          width: '90%',
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 20,
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
              color: 'black',
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
                color: 'black',
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
                borderRadius: 20,
              }}>
              <View
                style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
                <TextInput
                  onChangeText={setName}
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
                borderRadius: 20,
              }}>
              <View
                style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
                <TextInput
                  onChangeText={setId}
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
                borderRadius: 20,
              }}>
              <View
                style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={setPassword}
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
                borderRadius: 20,
              }}>
              <View
                style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={handlePassword}
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
                borderRadius: 20,
              }}>
              <View
                style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
                <TextInput
                  onChangeText={setNickname}
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
                borderRadius: 20,
              }}>
              <View
                style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
                <TextInput
                  onChangeText={setPhoneNumber}
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
                borderRadius: 12,
                height: 40,
                justifyContent: 'center',
              }}
              onPress={() => sendData()}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                회원가입
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUpModal;
