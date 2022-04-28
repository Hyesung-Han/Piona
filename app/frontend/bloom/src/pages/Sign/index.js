import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Image, Modal, StyleSheet} from 'react-native';
import Logo from '../../assets/Bloom_Logo.png';
import SignBtn from '../../components/SignBtn';
import SignInModal from '../../components/SignInModal';
import SignUpModal from '../../components/SignUpModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * LDJ | 2022.04.28
 * @name Sign
 * @api -
 * @des
 * 1. Splash Page 이후 가장 먼저 보이는 부분 (로그인, 회원가입 버튼 존재)
 * 2. 각 버튼을 누르면 모달 창이 뜨고 정보 입력하여 진행
 * 3. 컴포넌트1 : SignBtn [로그인과 회원가입 버튼]
 * 4. 컴포넌트2 : SignInModal [로그인 모달]
 * 5. 컴포넌트3 : SignUpModal [회원가입 모달]
 *
 */

const SignPage = props => {
  const [signinModal, setSigninModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [profile, setProfile] = useState(null);

  async function checkLogin() {
    if ((await AsyncStorage.getItem('refresh')) !== null) {
      props.navigation.replace('appscreen');
    }
  }

  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, []),
  );

  const handleUser = user => {
    setId(user.id);
    setPassword(user.passsword);
  };

  const signIn = async data => {
    // const res = await userAPI.login(data.id, data.pw);
    // if (res === 404) {
    //   alert('존재하지 않는 계정입니다.');
    // } else if (res === 402) {
    //   alert(
    //     'Google 계정으로 가입된 계정입니다. Google로 계속하기를 시도해주세요.',
    //   );
    // } else if (res === 403) {
    //   alert(
    //     'Apple 계정으로 가입된 계정입니다. Apple로 계속하기를 시도해주세요.',
    //   );
    // } else if (res === 401) {
    //   alert('잘못된 비밀번호입니다.');
    // } else {
    //   props.navigation.replace('appscreen');
    // }
    props.navigation.replace('appscreen');
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <Image source={Logo} style={{height: '60%'}} resizeMode="contain" />
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <SignBtn title="로그인" func={() => setSigninModal(true)} />
          <SignBtn title="회원가입" func={() => setSignupModal(true)} />
        </View>
      </View>
      <Modal animationType={'fade'} transparent={true} visible={signinModal}>
        <SignInModal
          user={data => signIn(data)}
          next={data => setSigninModal(data)}
          exit={data => setSigninModal(data)}
        />
      </Modal>
      <Modal animationType={'fade'} transparent={true} visible={signupModal}>
        <SignUpModal
          user={data => handleUser(data)}
          next={data => setSignupModal(data)}
          exit={data => setSignupModal(data)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBFBFB',
  },
});

export default SignPage;
