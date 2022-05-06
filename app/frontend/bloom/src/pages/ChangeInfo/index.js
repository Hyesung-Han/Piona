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

/**
 * LDJ | 2022.05.06
 * @name ChangeInfo
 * @api -
 * @des
 * 1. 회원정보 수정 페이지 (이름, 비밀번호, 닉네임, 휴대폰 번호)
 * 2. 회원탈퇴 가능
 */

const ChangeInfoPage = ({navigation, props}) => {
  const user_name = useSelector(state => state.user.name);
  const user_nickname = useSelector(state => state.user.nickname);
  const user_phoneNumber = useSelector(state => state.user.phoneNumber);

  const [nameColor, setNameColor] = useState('#C0C0C0');
  const [passwordColor, setPasswordColor] = useState('#C0C0C0');
  const [passwordCheckColor, setPasswordCheckColor] = useState('#C0C0C0');
  const [nicknameColor, setNicknameColor] = useState('#C0C0C0');
  const [phoneNumberColor, setPhoneNumberColor] = useState('#C0C0C0');

  const [name, setName] = useState('');
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

  // 회원수정 버튼 누르면?!
  const sendData = () => {};

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
              borderRadius: 20,
            }}>
            <View
              style={{alignItems: 'center', flexDirection: 'row', margin: 1}}>
              <TextInput
                onChangeText={setName}
                placeholder={user_name}
                placeholderTextColor="#C0C0C0"
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
                placeholder={user_nickname}
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
                placeholder={user_phoneNumber}
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
          }}>
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
