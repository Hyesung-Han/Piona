import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {shopDetailAPI} from '../../utils/Axios';
import Icon from 'react-native-vector-icons/Ionicons';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

/**
 * LHJ | 2022.05.09
 * @name shopHome
 * @api shopDetailAPI/getShopDetail
 * @des
 * 1. 컴포넌트 설명:
 * 2. 해당 페이지 설명 : 리덕스에 저장된 shopNumber를 뽑아와서 api(shopDetailAPI/getShopDetail)를 호출한다.
 * 해당 페이지(shopHome)에서는 가게 상세 정보 api를 호출한다.
 */
//  data: {
//   address: "서울특별시 가나다라동"
//   description: "우리가게가제일조아용"
//   hours: "아홉시부터열시까지바짝벌어요"
//   image_url: "bdkdfpdf"
//   name: "pipipi"
//   review_cnt: 4
//   score: 2.25
//   shop_lat: 37.359357
//   shop_lng: 127.104835
//   shop_number: "10"
//   tel: "031121513"
//   url: "dbdkfdpf"
//   wish_id: 0
//   zip_code: 21364
//  }
const ShopHomePage = ({navigation, route}) => {
  const [data, setData] = useState([]);
  // const [modalVisible, setModalVisible] = useState(true);
  //state 뒤에 오는 shop은 reducer에 설정된 이름
  //그 뒤에 오는 shopNumber는 slice에 저장된 변경하고자 하는 변수
  const shopNumber = useSelector(state => state.shop.shopNumber);
  const shopName = useSelector(state => state.shop.shopName);
  const token = useSelector(state => state.user.accessToken);
  const [coordinate, setCoordinate] = useState({latitude: 0.0, longitude: 0.0});
  const [center, setCenter] = useState({
    zoom: 15,
    tilt: 1,
    latitude: 0.0,
    longitude: 0.0,
  });

  const getShopDetailInfo = async () => {
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
  };

  useFocusEffect(
    useCallback(() => {
      getShopDetailInfo();
    }, []),
  );

  return (
    <ScrollView>
      <View>
        <Text>{data.name}</Text>
        <Icon
          name="star"
          color="#F2A344"
          backgroundColor="transparent"
          size={15}
        />
        <Text>{data.score}/5</Text>
        <Text>방문자리뷰 {data.review_cnt}</Text>
        <Icon
          name="compass-outline"
          color="#F2A344"
          backgroundColor="transparent"
          size={15}
        />
        <Text>{data.address}</Text>
        <Text>{data.hours}</Text>
        <Text>{data.tel}</Text>
        <Text>{data.url}s</Text>
        <Image
          source={{uri: `${data.image_url}`}}
          style={{
            resizeMode: 'contain',
            width: '100%',
            height: 130,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 200,
            marginTop: 10,
          }}>
          <NaverMapView
            style={{width: '100%', height: '80%'}}
            zoomControl={false}
            center={center}>
            <Marker coordinate={coordinate} pinColor="blue" />
          </NaverMapView>
        </View>
      </View>
    </ScrollView>
  );
};
export default ShopHomePage;
