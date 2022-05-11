import React, {useState, useCallback, useEffect, useMemo} from 'react';
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
  getCenter,
} from 'react-native-nmap';
import Geolocation from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid} from 'react-native';
/**
 * LHJ, CSW | 2022.05.10
 * @name MapPage
 * @des
 * 메인페이지에서 지도에서 찾기 버튼을 누르면 이동하는 페이지
 * 네이버맵을 상단에 띄움
 * TODO
 * 1. 전달받은 가게 화면에 지도에 뿌려주기
 *  */

const MapPage = ({navigation, route}) => {
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const [center, setCenter] = useState({
    zoom: 12,
    tilt: 1,
    latitude: 0.0,
    longitude: 0.0,
  });
  const [coordinate, setCoordinate] = useState({latitude: 0.0, longitude: 0.0});
  const [data, setData] = useState([]);
  const [appear, setAppear] = useState(false);
  const [shopInfo, setShopInfo] = useState([]);
  const [move, setMove] = useState([]);

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
    } catch (error) {
      console.log('검색결과', error);
    }
  };

  // 현재 화면에서 재검색하기 위한 중간 좌표 필요
  const relocation = async () => {
    var re_lat = 0;
    var re_lng = 0;
    move.map(e => {
      re_lat += e.latitude;
      re_lng += e.longitude;
    });
    re_lat = re_lat / 5;
    re_lng = re_lng / 5;

    setCenter({
      zoom: 12,
      tilt: 1,
      latitude: re_lat,
      longitude: re_lng,
    });

    try {
      const res = await searchAPI.getMap(
        'location',
        user_id,
        re_lat,
        re_lng,
        token,
      );
      setData(res.data);
    } catch (error) {
      console.log('검색결과', error);
    }
  };

  const fromSearch = async () => {
    const res = await route.params.shop;
    setData(res);
    setCenter({
      zoom: 12,
      tilt: 1,
      latitude: data[0].shop_lat,
      longitude: data[0].shop_lng,
    });
  };

  const getLocation = () => {
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setCoordinate({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
            setCenter({
              zoom: 12,
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
  };

  // 받아온 상점들 마커로 뿌려주기
  const Markers = () => {
    return data.map(row => (
      <Marker
        coordinate={{
          latitude: row.shop_lat,
          longitude: row.shop_lng,
        }}
        pinColor="blue"
        onClick={() => {
          setAppear(prevStatus => (prevStatus ? false : true));
          setShopInfo(row);
          console.log(appear);
        }}
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

  useFocusEffect(
    useCallback(() => {
      if (route.params.page === 'main') {
        getLocation();
      } else if (route.params.page === 'search') {
        fromSearch();
      }
    }, []),
  );

  console.log(move);
  return (
    <>
      {data && (
        <View style={styles.container}>
          {route.params.page === 'main' ? (
            <NaverMapView
              style={{width: '100%', height: '100%'}}
              zoomControl={false}
              center={center}
              onCameraChange={e => setMove(e.coveringRegion)}>
              <Marker
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                }}
                type="t"
                size="small"
                color="green"
              />
              <Markers />
            </NaverMapView>
          ) : (
            <NaverMapView
              style={{width: '100%', height: '100%'}}
              zoomControl={false}
              center={center}>
              <Markers />
            </NaverMapView>
          )}

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
              onPress={() => navigation.goBack()}
            />
          </View>
          {appear ? (
            <View style={styles.openshopCard}>
              <View style={styles.searchBtn2}>
                <Icon.Button
                  name="menu-sharp"
                  color="white"
                  backgroundColor="#F2A7B3"
                  size={20}
                  borderRadius={30}
                  width={50}
                  alignItems="center"
                  justifyContent="center"
                  onPress={() => navigation.goBack()}
                />
              </View>
              <View style={styles.shopCard}>
                <ShopCard item={shopInfo} navigation={navigation} />
              </View>
            </View>
          ) : (
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
                onPress={() => navigation.goBack()}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.relocation}
            onPress={() => relocation()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              현위치에서 검색
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
  searchBtn2: {
    position: 'absolute',
    right: 15,
    top: -50,
    width: '11%',
    height: '20%',
  },
  shopCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  openshopCard: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    height: '40%',
    width: '100%',
  },
  relocation: {
    position: 'absolute',
    top: 10,
    left: 110,
    backgroundColor: '#F15C74',
    width: '40%',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    justifyContent: 'center',
  },
});

export default MapPage;
