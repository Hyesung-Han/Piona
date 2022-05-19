import React, {useState} from 'react';
import {View, Image, Modal, StyleSheet} from 'react-native';
import Logo from '../../assets/Bloom_Logo.png';
import SignBtn from '../../components/SignBtn';
import SignInModal from '../../components/SignInModal';
import SignUpModal from '../../components/SignUpModal';

/**
 * LDJ | 2022.05.19
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
  // console warning box 무시
  console.disableYellowBox = true;

  const [signinModal, setSigninModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <Image source={Logo} style={{height: '65%'}} resizeMode="contain" />
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            height: '20%',
          }}>
          <SignBtn title="로그인" func={() => setSigninModal(true)} />
          <SignBtn title="회원가입" func={() => setSignupModal(true)} />
        </View>
      </View>
      <Modal animationType={'fade'} transparent={true} visible={signinModal}>
        <SignInModal exit={data => setSigninModal(data)} />
      </Modal>
      <Modal animationType={'fade'} transparent={true} visible={signupModal}>
        <SignUpModal exit={data => setSignupModal(data)} />
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
