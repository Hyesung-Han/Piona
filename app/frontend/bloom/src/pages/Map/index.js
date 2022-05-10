import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabRouter, useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingViewBase,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import ShopCard from '../../components/ShopCard';
import {searchAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Geolocation from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid} from 'react-native';
/**
 * LHJ, CSW | 2022.05.09
 * @name MapPage
 * @des
 * 메인페이지에서 지도에서 찾기 버튼을 누르면 이동하는 페이지
 * 네이버맵을 상단에 띄움
 * TODO
 * 1. 전달받은 가게 화면에 지도에 뿌려주기
 *  */

const MapPage = ({navigation: {goBack}, route}) => {
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const [center, setCenter] = useState({
    zoom: 15,
    tilt: 1,
    latitude: 0.0,
    longitude: 0.0,
  });
  const [coordinate, setCoordinate] = useState({latitude: 0.0, longitude: 0.0});
  const [data, setData] = useState([]);

  const fromMain = async () => {
    try {
      const res = await searchAPI.getMap(
        'location',
        user_id,
        coordinate.latitude,
        coordinate.longitude,
        token,
      );
      setData(res.data);
      console.log(res);
    } catch (error) {
      console.log('검색결과', error);
    }
  };

  // 받아온 상점들 마커로 뿌려주기
  const Markers = () => {
    return data.map(row => (
      <Marker
        coordinate={{
          latitude: row.data.shop_lat,
          longitude: row.data.shop_lng,
        }}
        pinColor="blue"
      />
    ));
  };

  async function requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (route.params.page === 'main') {
      requestPermission().then(result => {
        // console.log({result});
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            pos => {
              setCoordinate({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
              setCenter({
                zoom: 15,
                tilt: 1,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
              fromMain();
            },
            error => {
              console.log(error);
            },
            {enableHighAccuracy: true, timeout: 3600},
          );
        }
      });
    } else if (route.params.page === 'search') {
    }
  }, []);

  return (
    <View style={styles.container}>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        zoomControl={false}
        center={center}>
        <Marker
          coordinate={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          }}
          pinColor="white"
        />
        <Markers />
      </NaverMapView>
      <View style={styles.searchBtn}>
        <Icon.Button
          name="menu-sharp"
          color="white"
          backgroundColor="#F2A7B3"
          size={20}
          borderRadius={30}
          width={50}
          alignItems="center"
          justifyContent="center"
          onPress={() => goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  searchBtn: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    width: '11%',
    height: '10%',
  },
});

export default MapPage;
