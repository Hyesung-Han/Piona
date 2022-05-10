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
} from 'react-native';
import Stars from 'react-native-stars';
import {useSelector} from 'react-redux';
import {RegisterReviewApi} from '../../utils/Axios';
// //import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

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
  //const [file, setImage] = useState('');

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

  let formData = new FormData();

  const register = async () => {
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
    console.log(formData);
    try {
      const response = await RegisterReviewApi(formData, token);
      //console.log(response.data);
      //console.log(JSON.stringify(formData));
    } catch (error) {
      console.log('리뷰 등록 실패', error);
    }
  };

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

  //const state = {avatar: ''};
  // const [image, setImagesss] = useState('');

  // const showImage = () => {
  //   launchImageLibrary({}, response => {
  //     //alert(response.uri);
  //     setImagesss(response.assets[0].uri);
  //     console.warn(response.assets[0].uri);
  //   });
  // };

  const [images, setImages] = useState([]);
  // const [preview, setPreview] = useState();
  // setPreview({uri: `data:${response.mime};base64,${response.data}`});
  const [image, setImage] = useState({uri: '', name: '', type: ''});
  let list = [];
  const openImagePicker = () => {
    ImagePicker.openPicker({
      //includeBase64: true,
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 5,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then(image => {
        image.map((item, index) => {
          setImage({uri: item.path, type: 'image/jpeg', name: item.path});
          list.push(image);

          console.log('list' + list);
          // formData.append(
          //   'file',
          //   //{
          //     // uri: item.path,
          //     // type: 'image/jpeg',
          //     // name: item.path,
          //     //name: item.filename || `temp_image_${index}.jpg`,
          //     //}
          //     image,
          //     );
              setImages(image);
              console.log(image);
        });
      })
      .catch(e => alert(e));
  };

  const onDelete = value => {
    const data = images.filter(
      item =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(data);
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          width={IMAGE_WIDTH}
          source={{
            uri:
              item?.type === 'video'
                ? item?.thumbnail ?? ''
                : 'file://' + (item?.crop?.cropPath ?? item.path),
          }}
          style={styles.media}
        />
        {/* <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <Text style={styles.titleDelete}>삭제</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={[
          styles.container,
          {
            paddingTop: 6,
          },
        ]}
        data={images}
        keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
        renderItem={renderItem}
        numColumns={3}
      />
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
          onPress={() => {
            setMood();
          }}>
          <Text>감성 넘쳐요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setClean();
          }}>
          <Text>깔끔해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAdorable();
          }}>
          <Text>아기자기해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setVarious();
          }}>
          <Text>구성이 다양해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setKind();
          }}>
          <Text>친절해요</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            openImagePicker();
          }}>
          <Text>select images</Text>
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
});

export default RegisterReview;
