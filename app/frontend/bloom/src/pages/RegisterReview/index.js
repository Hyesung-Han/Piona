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
  Image,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Stars from 'react-native-stars';
import {useSelector} from 'react-redux';
import {RegisterReviewApi} from '../../utils/Axios';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
/**
 * LHJ | 2022.05.10
 * @name RegisterReview
 * @api RegisterReviewApi
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * 리뷰 등록 페이지이다.
 * 별점, 내용, 사진등을 바탕으로 api를 통해서 리뷰를 등록한다
 * 현재(05.10기준)는 사진이 한장만 등록된다.
 * 3. api : RegisterReviewApi (리뷰 등록 api)
 */

const RegisterReview = ({navigation, route}) => {
  const token = useSelector(state => state.user.accessToken);
  const user_id = useSelector(state => state.user.id);
  const [comment, onChangeText] = React.useState(null);
  const [starCount, setState] = useState(1);

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

  const setResonble = () => {
    if (kwReasonable === 'N') {
      setKwReasonable('Y');
      setKwReasonableColor('#c98b8b');
    } else {
      setKwReasonable('N');
      setKwReasonableColor('#C0C0C0');
    }
  };

  const setKind = () => {
    if (kwKind === 'N') {
      setKwKind('Y');
      setKwKindColor('#c98b8b');
    } else {
      setKwKind('N');
      setKwKindColor('#C0C0C0');
    }
  };

  const setAdorable = () => {
    if (kwKind === 'N') {
      setKwAdorable('Y');
      setKwAdorableColor('#c98b8b');
    } else {
      setKwAdorable('N');
      setKwAdorableColor('#C0C0C0');
    }
  };

  const setVarious = () => {
    if (kwKind === 'N') {
      setKwVarious('Y');
      setKwVariousColor('#c98b8b');
    } else {
      setKwVarious('N');
      setKwVariousColor('#C0C0C0');
    }
  };

  const setMood = () => {
    if (kwKind === 'N') {
      setKwMood('Y');
      setKwMoodColor('#c98b8b');
    } else {
      setKwMood('N');
      setKwMoodColor('#C0C0C0');
    }
  };

  const setClean = () => {
    if (kwKind === 'N') {
      setKwClean('Y');
      setKwCleanColor('#c98b8b');
    } else {
      setKwClean('N');
      setKwCleanColor('#C0C0C0');
    }
  };

  const [image, setImage] = useState({uri: '', name: '', type: ''});
  const [preview, setPreview] = useState([{uri: ''}]);

  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
      //multiple: true,
      // maxFiles: 5,
      // compressImageQuality: 0.8,
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const onResponse = useCallback(async response => {
    console.log(response.width, response.height, response.exif);
    setPreview({uri: `data:${response.mime};base64,${response.data}`});
    //response.map((item, index) => {
    //   setPreview({uri: `data:${item.mime};base64,${item.data}`});
    // });
    // console.log(preview);
    return ImageResizer.createResizedImage(
      response.path,
      600,
      600,
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100,
      0,
    ).then(r => {
      console.log(r.uri, r.name);
      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      });
    });
  }, []);

  const onComplete = useCallback(async () => {
    if (!image) {
      Alert.alert('알림', '파일을 업로드해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('score', starCount);
    formData.append('kwClean', kwClean);
    formData.append('kwReasonable', kwReasonable);
    formData.append('kwVarious', kwVarious);
    formData.append('file', image);
    formData.append('reservationId', route.params.reservationId);
    formData.append('kwKind', kwKind);
    formData.append('kwAdorable', kwAdorable);
    formData.append('kwMood', kwMood);
    formData.append('userid', user_id);
    formData.append('content', comment);
    formData.append('image', image);
    try {
      await RegisterReviewApi(formData, token);
      console.log('알림', '완료처리 되었습니다.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('sss');
    }
  }, [
    comment,
    image,
    kwAdorable,
    kwClean,
    kwKind,
    kwMood,
    kwReasonable,
    kwVarious,
    navigation,
    route.params.reservationId,
    starCount,
    token,
    user_id,
  ]);

  // const renderItem = ({item, index}) => {
  //   return (
  //     <View>
  //       <Image
  //         width={IMAGE_WIDTH}
  //         source={{
  //           uri:
  //             // item?.type === 'video'
  //             //   ? item?.thumbnail ?? ''
  //             //   : 'file://' + (item?.crop?.cropPath ?? item.path),
  //             item.uri,
  //         }}
  //         style={styles.media}
  //       />
  //       {/* <TouchableOpacity
  //         onPress={() => onDelete(item)}
  //         activeOpacity={0.9}
  //         style={styles.buttonDelete}>
  //         <Text style={styles.titleDelete}>삭제</Text>
  //       </TouchableOpacity> */}
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* <FlatList
        style={[
          styles.container,
          {
            paddingTop: 6,
          },
        ]}
        data={preview}
        keyExtractor={(item, index) => item.uri + index}
        renderItem={renderItem}
        numColumns={3}
      /> */}
      {/* 기존의 플랫리스트 부분은 이미지 슬라이더 적용해서 구현하면 될 듯하다 */}
      <View style={styles.preview}>
        {preview && <Image style={styles.previewImage} source={preview} />}
      </View>
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
            setResonble();
          }}>
          <View>
            <Text>가성비가 좋아요</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={{backgroundColor: kwMoodColor}}
          onPress={() => {
            setMood();
          }}>
          <Text>감성 넘쳐요</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{backgroundColor: kwCleanColor}}
          onPress={() => {
            setClean();
          }}>
          <Text>깔끔해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{backgroundColor: kwAdorableColor}}
          onPress={() => {
            setAdorable();
          }}>
          <Text>아기자기해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{backgroundColor: kwVariousColor}}
          onPress={() => {
            setVarious();
          }}>
          <Text>구성이 다양해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{backgroundColor: kwKindColor}}
          onPress={() => {
            setKind();
          }}>
          <Text>친절해요</Text>
        </TouchableOpacity>
      </View>
      <Pressable style={styles.button} onPress={onChangeFile}>
        <Text style={styles.buttonText}>이미지 선택</Text>
      </Pressable>
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
            onComplete();
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const {width} = Dimensions.get('window');
const IMAGE_WIDTH = (width - 24) / 3;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottom: {
    padding: 24,
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ffffff92',
    borderRadius: 4,
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  preview: {
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 3,
    backgroundColor: '#D2D2D2',
    marginBottom: 10,
  },
  previewImage: {
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default RegisterReview;
