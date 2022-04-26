import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * LDJ | 2022.04.26
 * @name SignBtn
 * @api -
 * @des
 * 1. Sign Page에서 이용하는 버튼 2개 [로그인, 회원가입]
 * style = css라고 보면 됨
 * func = 발생할 기능구현
 * title = 버튼 이름
 */

const SignBtn = props => {
  return (
    <View>
      <TouchableOpacity style={styles.Android} onPress={props.func}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Android: {
    elevation: 3,
    backgroundColor: 'white',
    height: 40,
    width: 280,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignBtn;
