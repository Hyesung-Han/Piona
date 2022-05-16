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
  Modal,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MenuDetailAPI} from '../../utils/Axios';
// import {cartAPI} from '../../utils/Axios';
import {getNotResList} from '../../utils/Axios';
import CalenderModal from '../../components/CalenderModal';

/**
 * CSW, LDJ, LHJ | 2022.05.12
 * @name MenuDetailPage
 * @api 1. MenuDetailAPI/get
 *      2. getNotResList
 * @des
 * 메뉴 상세정보를 보여주는 페이지
 * 모달을 띄울때 getNotResList API를 호출하여 모달에 넘겨줌
 *  */

const MenuDetailPage = ({navigation, route}) => {
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);
  const item_id = route.params.item_id;
  const [quantityStatus, setquantityStaus] = useState(1);
  const [data, setData] = useState([]);
  const [notRedData, setnotRedData] = useState([]);
  const shop_number = data.shop_number;
  const [calenderModal, setCalenderModal] = useState(false);
  // const [resDateAtt, setResDateAtt] = useState({
  //   data: '',
  //   att: `{
  //       customStyles: {
  //         container: {
  //           backgroundColor: 'green',
  //         },
  //         text: {
  //           color: 'black',
  //           fontWeight: 'bold',
  //         },
  //       },
  //     },`,
  // });
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

  // const rendering = () => {
  //   const result = [];
  //   for (let i = 0; i < notRedData.length; i++) {
  //     result.push(setResDateAtt(notRedData[i]));
  //   }
  //   return result;
  // };

  const getNotReservationList = async () => {
    try {
      const res = await getNotResList(item_id, 10, token);
      //const sss = res.data.data;
      if (res.data.result === 'success') {
        //setnotRedData(res.data.data);
        //setnotRedData(...notRedData, sss);
        //console.log(sss);
        setnotRedData(res.data.data);
        //etTheArray(oldArray => [...oldArray, newElement]);
        // console.log(res.data.data);
        // console.log(Array.isArray(res.data.data));
        // console.log(typeof res.data.data);
      }
      //반복문으로 처리해서 모달로 넘겨주기
      //setResDateAtt();
      // console.log('1');
      // console.log(res.data.data);
      //console.log(notRedData);
    } catch (error) {
      console.log('예약 불가일 불러오기 실패', error);
    }
  };

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
            borderRadius: 5,
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
          //onPress={addCart}
          onPress={() => {
            setCalenderModal(true);
            getNotReservationList();
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            {data.price * quantityStatus} 원 담기
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType={'fade'} transparent={true} visible={calenderModal}>
        <CalenderModal
          // data={data => handleData(data)},
          item_id={item_id}
          quantityStatus={quantityStatus}
          shop_number={shop_number}
          user_id={user_id}
          token={token}
          notRedData={notRedData}
          exit={data => setCalenderModal(data)}
        />
      </Modal>
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
    width: '80%',
    marginTop: '10%',
    elevation: 3,
    borderRadius: 5,
  },
  menuInfo: {
    flex: 0.5,
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '80%',
  },
  menuQuantity: {
    flex: 0.2,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  menuAddBtn: {
    flex: 0.4,
    width: '80%',
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
