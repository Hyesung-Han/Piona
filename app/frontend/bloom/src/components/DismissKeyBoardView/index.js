/**
 * LDJ | 2022.04.28
 * @name DissmissKeyBoardView
 * @api -
 * @des
 * 1. 키보드 입력으로 인해 하단에 키보드가 올라오는 페이지(혹은 모달)에서 사용 되는 컴포넌트
 * 2. 페이지(모달)와 조화롭게 키보드가 배치되게 해줌
 * 3. 기능 완벽 X (추가사항으로 미뤄짐)
 * 4. 쓰이는 페이지 : (적용 되면 적겠음)
 */

import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

const DismissKeyboardView = ({children, ...props}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView {...props} style={props.style} behavior="position">
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
