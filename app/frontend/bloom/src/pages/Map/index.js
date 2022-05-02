import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Dimensions, Alert, Text } from 'react-native';
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

const MapPage = ({ navigation }) => {
  const start = { latitude: 37.564362, longitude: 126.977011 };
  const end = { latitude: 37.565051, longitude: 126.978567 };

  return (
    <View
      style={{
        width: Dimensions.get('window').width - 30,
        height: 200,
        marginTop: 10,
      }}>
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
    </View>
  );
};
export default MapPage;
