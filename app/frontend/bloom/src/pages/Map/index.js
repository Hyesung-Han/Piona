import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
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

/**
 * LHJ | 2022.05.02
 * @name MapPage
 * @des
 * 메인페이지에서 지도에서 찾기 버튼을 누르면 이동하는 페이지
 * 네이버맵을 상단에 띄움
 * TODO
 * 1. 전달받은 가게 화면에 지도에 뿌려주기
 *  */

const MapPage = ({navigation}) => {
  const start = {latitude: 37.564362, longitude: 126.977011};
  const end = {latitude: 37.565051, longitude: 126.978567};
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  return (
    <View style={styles.container}>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        zoomControl={false}
        center={{
          zoom: 10,
          tilt: 50,
          latitude: (start.latitude + end.latitude) / 2,
          longitude: (start.longitude + end.longitude) / 2,
        }}>
        <Marker
          coordinate={{
            latitude: start.latitude,
            longitude: start.longitude,
          }}
          pinColor="blue"
        />
        <Path
          coordinates={[
            {
              latitude: start.latitude,
              longitude: start.longitude,
            },
            {latitude: end.latitude, longitude: end.longitude},
          ]}
        />
        <Marker
          coordinate={{latitude: end.latitude, longitude: end.longitude}}
        />
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
          onPress={() =>
            navigation.navigate('Map', {
              type: 'location',
              word: 'hi',
              user_id: user_id,
              user_lat: 0,
              user_lng: 0,
            })
          }
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
