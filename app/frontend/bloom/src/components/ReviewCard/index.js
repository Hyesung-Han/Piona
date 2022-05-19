import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import shopcomment from '../../assets/shop.png';

/**
 * LHJ,CSW | 2022.05.19
 * @name MenuCard
 * @api
 * @des

 */

const MenuCardList = ({item, navigation}) => {
  const StartScore = () => {
    const result = [];
    const row = Math.floor(item.score);
    for (let i = 0; i < row; i++) {
      result.push(
        <Icon
          name="star"
          color="#F2A344"
          backgroundColor="transparent"
          size={15}
        />,
      );
    }
    return result;
  };

  const KeyWordList = () => {
    const keyword = [
      item.kw_adorable,
      item.kw_clean,
      item.kw_kind,
      item.kw_mood,
      item.kw_reasonable,
      item.kw_various,
    ];
    const result = [];
    for (let i = 0; i < 6; i++) {
      if (i === 0 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>아기자기해요</Text>
          </View>,
        );
      }
      if (i === 1 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>깔끔해요</Text>
          </View>,
        );
      }
      if (i === 2 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>친절해요</Text>
          </View>,
        );
      }
      if (i === 3 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>감성넘쳐요</Text>
          </View>,
        );
      }
      if (i === 4 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>가성비가 좋아요</Text>
          </View>,
        );
      }
      if (i === 5 && keyword[i] === 'Y') {
        result.push(
          <View
            style={{
              backgroundColor: '#FFDBDB',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>구성이 다양해요</Text>
          </View>,
        );
      }
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <View style={styles.reviewCardList}>
          <View style={styles.itemTitleAndDate}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginRight: 10,
                  fontSize: 15,
                  color: 'black',
                }}>
                {item.nickname}
              </Text>
            </View>
            <View>
              <Text style={styles.itemDate}>
                {item.created_at.split('T')[0]}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.starIcons}>{StartScore()}</View>
          </View>
          <View style={{width: '35%', elevation: 5}}></View>
          <View style={styles.keyword}>{KeyWordList()}</View>
          {item.image_url && (
            <View style={styles.imgBox}>
              <Image
                source={{uri: `${item.image_url}`}}
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          )}
          <View>
            <Text style={styles.itemDate}>{item.content}</Text>
          </View>
        </View>
      </View>
      {item.comment !== '' && (
        <View style={styles.recommentBox}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginHorizontal: 15, width: '10%'}}>
              <Image
                source={shopcomment}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{width: '75%'}}>
              <Text numberOfLines={5} multiline={true}>
                {item.comment}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: 0.5,
  },
  review: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
  },
  reviewCardList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemTitleAndDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  starIcons: {
    flexDirection: 'row',
    marginRight: 10,
    marginVertical: 3,
  },
  keyword: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 3,
  },
  imgBox: {
    width: 130,
    height: 130,
    marginVertical: 5,
  },
  recommentBox: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#F9F0F0',
  },
});

export default MenuCardList;
