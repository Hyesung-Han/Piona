import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import picnicIcon from '../../assets/picnic.svg';
import {WithLocalSvg} from 'react-native-svg';
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
          <WithLocalSvg
            asset={picnicIcon}
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
    marginBottom: 5,
  },
  CardList: {
    width: '85%',
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 6,
    height: 60,
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
    top: 11,
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
