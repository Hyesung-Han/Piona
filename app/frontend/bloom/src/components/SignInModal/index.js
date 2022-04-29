import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

/**
 * LDJ | 2022.04.28
 * @name SignInModal
 * @api -
 * @des
 * 1. Sign Page에서 로그인 버튼을 누르면 뜨는 모달 창
 * 2. 유저 정보를 입력받아 로그인을 진행 [아이디, 비밀번호]
 */

const SignInModal = props => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const sendData = () => {
    if (id && password) {
      props.user({id: id, password: password});
      props.next(false);
    } else if (!id) {
      alert('아이디를 입력해주세요!');
    } else if (password.length < 1) {
      alert('비밀번호를 입력해주세요!');
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
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
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
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
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
                  onChangeText={setPassword}
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
                color: 'black',
                width: '100%',
                alignItems: 'center',
                borderRadius: 12,
                height: 40,
                justifyContent: 'center',
              }}
              onPress={() => sendData()}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                로그인
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignInModal;
