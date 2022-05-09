import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Dimensions,
  Alert,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Stars from 'react-native-stars';
import {useSelector} from 'react-redux';
import RegisterReviewApi from '../../utils/Axios';

/**
 * LHJ | 2022.05.09
 * @name RegisterReview
 * @api x
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * 리뷰 등록 모달을 띄울 페이지이다.
 */

//navigation으로 넘겨줄때 값은 route로 가져온다.
//route.params.reservation_id
const RegisterReview = ({navigation, route}) => {
  //route.params.reservationId
  //route.params.user_id
  //route.params.shop_name
  const token = useSelector(state => state.user.accessToken);
  const user_id = useSelector(state => state.user.id);
  const [comment, onChangeText] = React.useState(null);
  const [starCount, setState] = useState(1);
  const [file, setImageSource] = useState('');

  const [kwClean, setKwClean] = useState('N');
  const [kwReasonable, setKwReasonable] = useState('N');
  const [kwVarious, setKwVarious] = useState('N');
  const [kwKind, setKwKind] = useState('N');
  const [kwAdorable, setKwAdorable] = useState('N');
  const [kwMood, setKwMood] = useState('N');

  const [kwCleanColor, setKwCleanColor] = useState('#C0C0C0');
  const [kwReasonableColor, setKwReasonableColor] = useState('#C0C0C0');
  const [kwVariousColor, setKwVariousColor] = useState('#C0C0C0');
  const [kwKindColor, setKwKindColor] = useState('#C0C0C0');
  const [kwAdorableColor, setKwAdorableColor] = useState('#C0C0C0');
  const [kwMoodColor, setKwMoodColor] = useState('#C0C0C0');

  const register = async () => {
    const formData = new FormData();
    formData.append('score', starCount);
    formData.append('kwClean', kwClean);
    formData.append('kwReasonable', kwReasonable);
    formData.append('kwVarious', kwVarious);
    formData.append('file', file);
    formData.append('reservationId', route.params.reservationId);
    formData.append('kwKind', kwKind);
    formData.append('kwAdorable', kwAdorable);
    formData.append('kwMood', kwMood);
    formData.append('userid', user_id);
    formData.append('content', comment);
    console.log(formData);
    try {
      const response = await RegisterReviewApi(formData, token);
    } catch (error) {
      console.log('리뷰 등록 실패', error);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     setColor();
  //   }, []),
  // );

  const setColor = () => {
    if (kwReasonable === 'N') {
      //초기 상태면 색과 상태값 변경
      setKwReasonable('Y');
      console.log(kwReasonable);
      setKwReasonableColor('#c98b8b');
      console.log(kwReasonableColor);
    } else {
      // 초기 상태가 아니라면 원래의 상태값과 색으로 변경
      setKwReasonable('N');
      console.log(kwReasonable);
      setKwReasonableColor('#C0C0C0');
      console.log(kwReasonableColor);
    }
  };

  return (
    <View>
      <View>
        <Text>{route.params.shop_name}의 서비스에 만족하셨나요?</Text>
      </View>
      <View>
        <Text>별점{starCount}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Stars
          half={false}
          default={5}
          update={setState}
          spacing={4}
          starSize={40}
          count={5}
          fullStar={require('../../assets/select_star.png')}
          emptyStar={require('../../assets/unselect_star.png')}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={comment}
        placeholder="서비스에 대한 솔직한 리뷰를 남겨주세요!"
      />
      <View>
        <TouchableOpacity
          style={{backgroundColor: kwReasonableColor}}
          onPress={() => {
            //setKwReasonableColor('#B2B2B2');
            setColor();
            //setKwReasonable('Y');
          }}>
          <View>
            <Text>가성비가 좋아요</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setKwMoodColor('#B2B2B2');
            setKwMood('Y');
          }}>
          <Text>감성 넘쳐요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setKwCleanColor('#B2B2B2');
            setKwClean('Y');
          }}>
          <Text>깔끔해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setKwAdorableColor('#B2B2B2');
            setKwAdorable('Y');
          }}>
          <Text>아기자기해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setKwVariousColor('#B2B2B2');
            setKwVarious('Y');
          }}>
          <Text>구성이 다양해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setKwKindColor('#B2B2B2');
            setKwKind('Y');
          }}>
          <Text>친절해요</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuAddBtn}>
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
          onPress={() => {
            '#';
            register();
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default RegisterReview;
