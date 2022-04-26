import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {userAPI} from '../../utils/axios';

/**
 * LDJ | 2022.04.26
 * @name SignUpModal
 * @api -
 * @des
 * 1. Sign Page에서 회원가입 버튼을 누르면 뜨는 모달 창
 * 2. 유저 정보를 입력받아 회원가입을 진행
 */

const SignInModal = props => {
  const [pwColor, setPwColor] = useState('#000000');
  const [idColor, setIdColor] = useState('#000000');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');

  const handlePW = data => {
    setCheckPw(data);
    if (pw === data) {
      setPwColor('#A6DB9E');
    } else {
      setPwColor('#FFABAB');
    }
  };

  // const checkId = async () => {
  //   const result = await userAPI.emailCheck(id);
  //   if (result === 200) {
  //     setIdColor('#A6DB9E');
  //   } else if (result === 409) {
  //     setIdColor('#FFABAB');
  //   }
  // };

  const sendData = () => {
    if (pwColor === '#A6DB9E' && idColor === '#A6DB9E') {
      props.user({id: id, pw: pw});
      props.now(false);
      props.next(true);
    } else if (id.length < 2) {
      alert('이메일을 입력해주세요.');
    } else if (idColor === '#000000') {
      alert('이메일 중복확인을 해주세요.');
    } else if (idColor === '#FFABAB') {
      alert('중복된 이메일입니다. 다시 확인해주세요.');
    } else if (pw.length < 1) {
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
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          // borderRadius: 20,
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
          <View style={{width: '100%', justifyContent: 'flex-start'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontWeight: 'bold',
                marginLeft: 40,
                marginTop: 20,
              }}>
              아이디
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
                width: '60%',
                height: 40,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEEEEE',
                borderRadius: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 1,
                }}>
                <TextInput
                  onChangeText={setId}
                  value={id}
                  style={{
                    width: '70%',
                    textAlign: 'center',
                    backgroundColor: '#EEEEEE',
                    borderRadius: 20,
                    marginRight: 5,
                  }}
                />
                <Icon name="checkcircle" color={idColor} size={17} />
              </View>
            </View>
            {/* <TouchableOpacity onPress={() => checkId()}>
              <Text>중복 확인</Text>
            </TouchableOpacity> */}
          </View>
          <View style={{width: '100%', justifyContent: 'flex-start'}}>
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
              width: '100%',
              marginTop: 5,
            }}>
            <View
              style={{
                width: '75%',
                height: 40,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEEEEE',
                borderRadius: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 1,
                }}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={setPw}
                  value={pw}
                  style={{
                    width: '80%',
                    textAlign: 'center',
                    backgroundColor: '#EEEEEE',
                    borderRadius: 20,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{width: '100%', justifyContent: 'flex-start'}}>
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
              width: '100%',
              marginTop: 5,
            }}>
            <View
              style={{
                width: '75%',
                height: 40,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEEEEE',
                borderRadius: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 1,
                }}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={handlePW}
                  value={checkPw}
                  style={{
                    width: '80%',
                    textAlign: 'center',
                    backgroundColor: '#EEEEEE',
                    borderRadius: 20,
                  }}
                />
                <Icon name="checkcircle" color={pwColor} size={17} />
              </View>
            </View>
          </View>
          <View style={{margin: 20, alignItems: 'center', width: '100%'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#A3BED7',
                color: 'black',
                width: '50%',
                alignItems: 'center',
                borderRadius: 5,
                height: 40,
                justifyContent: 'center',
              }}
              onPress={() => sendData()}>
              <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                다음 단계
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignInModal;
