import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

/**
 * LHJ | 2022.04.26
 * @name DoneCard
 * @api x
 * @des
 * 1. 컴포넌트 목록 :
 * 2. 페이지 기능 :
 * FlatList에 보여줄 item 컴포넌트이다.
 */

const DoneCardList = ({item}) => {
  //아이템을 받아오면 그 아이템의 이름에서 불필요한 부분을 replace하고 리턴한다.
  //테스트 데이터 상에서는 불필요한 부분임
  const name = () => {
    if (item.mediinfo.includes('(')) {
      return item.mediinfo.replace(/\(/g, '\n(');
    } else {
      return item.mediinfo;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <View>
          <Text>{item.userId}</Text>
        </View>
        <View>
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 100,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 50,
  },
});

export default DoneCardList;
