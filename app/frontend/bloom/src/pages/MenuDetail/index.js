import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MenuDetailAPI} from '../../utils/Axios';
import {cartAPI} from '../../utils/Axios';

/**
 * CSW, LDJ | 2022.05.10
 * @name MenuDetailPage
 * @api 1. MenuDetailAPI/get
 *      2. cartAPI/addCart [임시, 원래는 날짜선택 모달로 넘어가고 거기서 함]
 * @des
 * 메뉴 상세정보를 보여주는 페이지
 *  */

const MenuDetailPage = ({navigation, route}) => {
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const item_id = route.params.item_id;
  const [quantityStatus, setquantityStaus] = useState(1);
  const [data, setData] = useState([]);
  const shop_number = data.shop_number;

  const getMenuDetail = async () => {
    try {
      const res = await MenuDetailAPI.get(item_id, token);
      setData(res.data);
    } catch (error) {
      console.log('메뉴상세정보 검색에러', error);
    }
  };

  const quantityMinus = () => {
    if (quantityStatus !== 1) {
      setquantityStaus(prevStatus => prevStatus - 1);
    } else if (quantityStatus <= 1) {
      setquantityStaus(1);
    }
  };

  const quantityPlus = () => {
    if (quantityStatus < data.total_quantity || quantityStatus === 1) {
      setquantityStaus(prevStatus => prevStatus + 1);
    } else if (quantityStatus >= data.total_quantity) {
      setquantityStaus(data.total_quantity);
    }
  };

  const addCart = useCallback(async () => {
    try {
      const response = await cartAPI.addCart(
        item_id,
        quantityStatus,
        '2022-05-20T11:11:11.111Z',
        shop_number,
        user_id,
        token,
      );
      console.log(response.data.data);
      Alert.alert('알림', '장바구니에 담겼습니다!');
    } catch (error) {
      if (error.response) {
        Alert.alert('알림', error.response.data.message);
      }
    }
  }, [item_id, quantityStatus, shop_number, user_id, token]);

  useFocusEffect(
    useCallback(() => {
      getMenuDetail();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.imgBox}>
        <Image
          source={{uri: `${data.image_url}`}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 15,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={styles.menuInfo}>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          {data.item_name}
        </Text>
        <Text style={{color: '#FF0000', fontSize: 15}}>{data.price} 원</Text>
        <Text style={{color: 'black', fontSize: 15}}>{data.description}</Text>
      </View>
      <View style={styles.menuQuantity}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
          수량
        </Text>
        <View style={styles.quantityBox}>
          <Icon.Button
            onPress={() => quantityMinus()}
            name="remove"
            color="black"
            backgroundColor="transparent"
            size={13}
            style={styles.removeIcon}
          />
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
            {quantityStatus}
          </Text>
          <Icon.Button
            onPress={() => quantityPlus()}
            name="add"
            color="black"
            backgroundColor="transparent"
            size={13}
            style={styles.addIcon}
          />
        </View>
      </View>
      <View style={styles.menuAddBtn}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F15C74',
            color: 'black',
            width: '100%',
            alignItems: 'center',
            borderRadius: 5,
            height: 40,
            justifyContent: 'center',
          }}
          onPress={addCart}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            {data.price * quantityStatus} 원 담기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    flex: 0.8,
    width: '70%',
    marginTop: '10%',
    elevation: 3,
    borderRadius: 15,
  },
  menuInfo: {
    flex: 0.5,
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  menuQuantity: {
    flex: 0.2,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  menuAddBtn: {
    flex: 0.4,
    width: '75%',
    marginTop: '5%',
  },
  quantityBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    width: '35%',
    justifyContent: 'center',
    height: 28,
    borderStyle: 'solid',
    borderWidth: 1.2,
  },
  removeIcon: {
    position: 'relative',
    top: -3,
    left: -10,
  },
  addIcon: {
    position: 'relative',
    right: -17,
    bottom: 3,
  },
});
export default MenuDetailPage;
