import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Honeybee from '../../assets/Honeybee.png';

/**
 * CSW | 2022.04.28
 * @name AlarmCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * FlatList에 보여줄 alarm item 컴포넌트이다.
 */

const AlarmCard = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.CardList}>
        <View style={styles.AlarmContent}>
          <Text style={styles.content}> {item.content} </Text>
          <Text style={styles.createdAt}> {item.content} </Text>
        </View>
        <View style={styles.iconBox}>
          <Image
            source={Honeybee}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  CardList: {
    width: '85%',
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 5,
    height: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  AlarmContent: {
    flex: 2,
    marginLeft: 20,
  },
  iconBox: {
    position: 'relative',
    right: 30,
    top: 13,
  },
  content: {
    fontSize: 15,
    marginTop: 5,
    color: 'black',
  },
  createdAt: {
    fontSize: 10,
    marginTop: 5,
  },
});

export default AlarmCard;
