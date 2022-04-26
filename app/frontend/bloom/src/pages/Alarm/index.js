import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text} from 'react-native';

const AlarmPage = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
      }}>
      <Text>AlarmPage</Text>
    </View>
  );
};
export default AlarmPage;