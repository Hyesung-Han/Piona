import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * LDJ | 2022.05.19
 * @name SignBtn
 * @api -
 * @des
 * 1. Sign Page에서 이용하는 버튼 2개 [로그인, 회원가입]
 */

const SignBtn = props => {
  return (
    <View>
      <TouchableOpacity style={styles.Android} onPress={props.func}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'rgb(241, 92, 116)',
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Android: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(241, 92, 116)',
    height: 40,
    width: 280,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignBtn;
