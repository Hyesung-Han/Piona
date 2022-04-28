import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';

/**
 * CSW | 2022.04.28
 * @name SearchResultPage
 * @des
 * 검색인풋박스와 shop컴포넌트를 보여주는 검색결과페이지입니다.
 *  */

const SearchResultPage = ({navigation}) => {
  const [inputText, setInputText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBox}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            placeholder="검색어를 입력하세요."
            value={inputText}
            onChangeText={setInputText}></TextInput>
          <View style={styles.iconBox}>
            <Icon.Button
              onPress={() =>
                navigation.navigate('Search', {navigation: `${navigation}`})
              }
              name="search-outline"
              color="black"
              backgroundColor="white"
            />
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
  },
  textInput: {
    fontSize: 14,
    marginLeft: 10,
  },
  inputBox: {
    flex: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '70%',
    height: '11%',
    borderRadius: 10,
    borderColor: '#F2A7B3',
    borderWidth: 1.5,
    marginTop: '20%',
  },
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  searchBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchResultPage;
