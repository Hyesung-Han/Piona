import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text} from 'react-native';

import CartCardList from '../../components/CartCard';
import CartFooter from '../../components/CartCard/footer';
import {cartAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * CSW, LDJ | 2022.05.10
 * @name CartPage
 * @api cartAPI/getCartList
 * @des
 * 장바구니에 담은 item 목록 조회
 * # 사용 컴포넌트 : CartCard(index.js / footer.js)
 *  */

const CartPage = ({navigation}) => {
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const [data, setData] = useState([]);

  const getCartlist = async () => {
    try {
      const res = await cartAPI.getCartList(user_id, token);
      setData(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log('카트 목록조회 에러 :', error);
    }
  };

  const renderItem = useCallback(
    ({item}) => {
      return <CartCardList item={item} navigation={navigation} />;
    },
    [navigation],
  );

  // getCartlist로 받은 item의 변화가 생기면(컴포넌트에[CartCard] 변화가 생기면) 랜더링!
  useFocusEffect(
    useCallback(() => {
      getCartlist();
    }, [data]),
  );

  return (
    <>
      {data.length >= 1 ? (
        <View style={styles.container}>
          <View style={styles.list}>
            <FlatList
              //리스트의 소스를 담는 속성
              //data={data}
              data={data}
              //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
              renderItem={renderItem}
              //item의 고유의 키를 부여하는 속성
              keyExtractor={item => item.cart_id}
              //무한 스크롤때문에 넣은듯
              // onEndReached={() => {if(loading===false && pageNum<=totalPageCnt) getMyPillHistoryList()}}
              // onEndReachedThreshold={0.4}
              ListFooterComponent={CartFooter}
            />
          </View>
        </View>
      ) : (
        <View style={styles.Nocontainer}>
          <Text>장바구니 내역이 없습니다.</Text>
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
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  list: {
    flex: 3,
  },
  Nocontainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartPage;
