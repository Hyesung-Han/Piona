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
import Icon from 'react-native-vector-icons/Ionicons';
/**
 * LHJ, CSW | 2022.05.10
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
      setKwReasonableColor('#F2A7B3');
    } else {
      setKwReasonable('N');
      setKwReasonableColor('#C0C0C0');
    }
  };

  const setKind = () => {
    if (kwKind === 'N') {
      setKwKind('Y');
      setKwKindColor('#F2A7B3');
    } else {
      setKwKind('N');
      setKwKindColor('#C0C0C0');
    }
  };

  const setAdorable = () => {
    if (kwAdorable === 'N') {
      setKwAdorable('Y');
      setKwAdorableColor('#F2A7B3');
    } else {
      setKwAdorable('N');
      setKwAdorableColor('#C0C0C0');
    }
  };

  const setVarious = () => {
    if (kwVarious === 'N') {
      setKwVarious('Y');
      setKwVariousColor('#F2A7B3');
    } else {
      setKwVarious('N');
      setKwVariousColor('#C0C0C0');
    }
  };

  const setMood = () => {
    if (kwMood === 'N') {
      setKwMood('Y');
      setKwMoodColor('#F2A7B3');
    } else {
      setKwMood('N');
      setKwMoodColor('#C0C0C0');
    }
  };

  const setClean = () => {
    if (kwClean === 'N') {
      setKwClean('Y');
      setKwCleanColor('#F2A7B3');
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

  console.log(preview);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {route.params.shop_name}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
            }}>
            서비스에 만족하셨나요?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 15, color: 'black', marginRight: 15}}>
          별점
        </Text>
        <View style={{alignItems: 'center'}}>
          <Stars
            half={false}
            default={5}
            update={setState}
            spacing={4}
            starSize={30}
            count={5}
            fullStar={require('../../assets/select_star.png')}
            emptyStar={require('../../assets/unselect_star.png')}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: kwReasonableColor,
            borderRadius: 15,
            padding: 4,
            paddingHorizontal: 8,
            marginVertical: 8,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setResonble();
          }}>
          <View>
            <Text style={{fontSize: 12, color: 'black'}}>가성비가 좋아요</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: kwMoodColor,
            borderRadius: 15,
            padding: 4,
            paddingHorizontal: 8,
            marginVertical: 8,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setMood();
          }}>
          <Text style={{fontSize: 12, color: 'black'}}>감성 넘쳐요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: kwCleanColor,
            borderRadius: 15,
            padding: 4,
            paddingHorizontal: 8,
            marginVertical: 8,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setClean();
          }}>
          <Text style={{fontSize: 12, color: 'black'}}>깔끔해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: kwAdorableColor,
            borderRadius: 15,
            padding: 4,
            paddingHorizontal: 8,
            marginVertical: 8,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setAdorable();
          }}>
          <Text style={{fontSize: 12, color: 'black'}}>아기자기해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: kwVariousColor,
            borderRadius: 15,
            padding: 4,
            paddingHorizontal: 8,
            marginVertical: 8,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setVarious();
          }}>
          <Text style={{fontSize: 12, color: 'black'}}>구성이 다양해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: kwKindColor,
            borderRadius: 15,
            padding: 4,
            paddingHorizontal: 8,
            marginVertical: 8,
            marginHorizontal: 8,
          }}
          onPress={() => {
            setKind();
          }}>
          <Text style={{fontSize: 12, color: 'black'}}>친절해요</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <TextInput
          style={{flexShrink: 1}}
          onChangeText={onChangeText}
          value={comment}
          placeholder="서비스에 대한 솔직한 리뷰를 남겨주세요!"
          multiline={true}
        />
      </View>
      <View style={styles.pics}>
        {preview.uri && (
          <View style={styles.preview}>
            <Image style={styles.previewImage} source={preview} />
          </View>
        )}
        <Pressable style={styles.button} onPress={onChangeFile}>
          <View style={styles.iconBox}>
            <Icon
              name="camera-outline"
              color="black"
              backgroundColor="transparent"
              size={28}
            />
            <Text>사진</Text>
          </View>
        </Pressable>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#F15C74',
          color: 'black',
          alignItems: 'center',
          borderRadius: 5,
          height: 40,
          justifyContent: 'center',
          width: '80%',
        }}
        onPress={() => {
          onComplete();
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          완료
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const {width} = Dimensions.get('window');
const IMAGE_WIDTH = (width - 24) / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
    flexDirection: 'column',
    justifyContent: 'center',
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
  input: {
    width: '80%',
    backgroundColor: '#F1F1F1',
    height: 100,
    alignItems: 'center',
    marginVertical: 15,
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
    marginRight: 10,
    marginBottom: 10,
    width: 60,
    height: 60,
  },
  previewImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  button: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  pics: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default RegisterReview;
