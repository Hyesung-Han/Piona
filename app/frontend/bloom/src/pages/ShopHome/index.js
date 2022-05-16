import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {shopDetailAPI} from '../../utils/Axios';
import Icon from 'react-native-vector-icons/Ionicons';
import NaverMapView, {Marker} from 'react-native-nmap';

/**
 * LHJ, CSW | 2022.05.13
 * @name shopHome
 * @api shopDetailAPI/getShopDetail
 * @des
 * 1. 컴포넌트 설명:
 * 2. 해당 페이지 설명 : 리덕스에 저장된 shopNumber를 뽑아와서 api(shopDetailAPI/getShopDetail)를 호출한다.
 * 해당 페이지(shopHome)에서는 가게 상세 정보 api를 호출한다.
 */

const ShopHomePage = ({navigation, route}) => {
  const [data, setData] = useState([]);
  // const [modalVisible, setModalVisible] = useState(true);
  //state 뒤에 오는 shop은 reducer에 설정된 이름
  //그 뒤에 오는 shopNumber는 slice에 저장된 변경하고자 하는 변수
  const shopNumber = useSelector(state => state.shop.number);
  const shopName = useSelector(state => state.shop.name);
  const token = useSelector(state => state.user.accessToken);
  const [coordinate, setCoordinate] = useState({latitude: 0.0, longitude: 0.0});
  const [center, setCenter] = useState({
    zoom: 15,
    tilt: 1,
    latitude: 0.0,
    longitude: 0.0,
  });
  const getShopDetailInfo = useCallback(async () => {
    try {
      const res = await shopDetailAPI.getShopDetail(shopNumber, token);
      setData(res.data);
      setCoordinate({
        latitude: res.data.shop_lat,
        longitude: res.data.shop_lng,
      });
      setCenter({
        zoom: 15,
        tilt: 1,
        latitude: res.data.shop_lat,
        longitude: res.data.shop_lng,
      });
    } catch (error) {
      console.log('위시리스트 검색', error);
    }
  }, [shopNumber, token]);

  const startScore = () => {
    const result = [];
    const row = Math.floor(data.score);
    for (let i = 0; i < row; i++) {
      result.push(
        <Icon
          name="star"
          color="#F2A344"
          backgroundColor="transparent"
          size={15}
        />,
      );
    }
    return result;
  };

  useFocusEffect(
    useCallback(() => {
      getShopDetailInfo();
    }, [getShopDetailInfo]),
  );

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imgBox}>
          <Image
            source={{uri: `${data.image_url}`}}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={{color: 'black', fontSize: 23, fontWeight: 'bold'}}>
            {data.name}
          </Text>
          <View style={styles.reviewBox}>
            <View style={styles.starIcons}>{startScore()}</View>

            <Text style={{marginHorizontal: 5}}>{data.score}/5</Text>
            <Text style={{marginHorizontal: 5}}>
              방문자리뷰 {data.review_cnt}
            </Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View
            style={{
              width: '100%',
              height: 160,
            }}>
            <NaverMapView
              style={{width: '100%', height: '100%'}}
              zoomControl={false}
              center={center}>
              <Marker coordinate={coordinate} pinColor="blue" />
            </NaverMapView>
          </View>
          <View style={styles.descriptionBox}>
            <View style={styles.icons}>
              <Icon
                name="location-sharp"
                color="#A3A3A3"
                backgroundColor="transparent"
                size={20}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 13,
                  marginLeft: 10,
                  width: '90%',
                }}
                numberOfLines={2}
                ellipsizeMode="tail">
                {data.address}
              </Text>
            </View>
            <View style={styles.icons}>
              <Icon
                name="time-outline"
                color="#A3A3A3"
                backgroundColor="transparent"
                size={20}
              />
              <Text style={{color: 'black', fontSize: 13, marginLeft: 10}}>
                {data.hours}
              </Text>
            </View>
            <View style={styles.icons}>
              <Icon
                name="call-outline"
                color="#A3A3A3"
                backgroundColor="transparent"
                size={20}
              />
              <Text style={{color: 'black', fontSize: 13, marginLeft: 10}}>
                {data.tel}
              </Text>
            </View>
            <View style={styles.icons}>
              <Text style={{color: 'black', fontSize: 13, marginLeft: 35}}>
                {data.url}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    width: '100%',
    height: 250,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  nameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  infoBox: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#F8F8F8',
    paddingVertical: 20,
  },
  reviewBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    alignItems: 'center',
  },
  starIcons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 8,
  },
});

export default ShopHomePage;
