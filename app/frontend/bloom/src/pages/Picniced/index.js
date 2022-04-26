import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text, FlatList} from 'react-native';
import DoneCard from '../../components/DoneCard';

/**
 * LHJ | 2022.04.26
 * @name PicnicedPage
 * @api .
 * @des
 * 1. 컴포넌트 목록 : DoneCard,FlatList
 * 2. 페이지 기능 :
 * 피크닉 페이지 안에 있는 완료된 예약 탭이다.
 * 완료된 예약 목록을 보여주기 위해서 RN에서 기본 제공하는 FlatList(가변적인 크기의 목록을 리스트화 할 때 사용)와
 * 해당 리스트를 하나의 카드로 보여주기 위해서 DoneCard 컴포넌트를 사용함
 * 사용된 api로는 완료된 예약 불러오기, 리뷰 등록이 있다.
 */

const PicnicedPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  //getData에 완료된 예약 정보 가져오는 api를 넣자!!!
  const getData = () => {
    setLoading(true);
    fetch('http://jsonplaceholder.typicode.com/posts')
      //해당 api를 통해서 받아오는 정보는 userId, id, title, body이다.
      .then(res => res.json())
      .then(res => setData(res));
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    return <DoneCard item={item} />;
  };

  return (
    <View>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          //무한 스크롤때문에 넣은듯
          // onEndReached={() => {if(loading===false && pageNum<=totalPageCnt) getMyPillHistoryList()}}
          // onEndReachedThreshold={0.4}
        />
      </View>
    </View>
  );
};
export default PicnicedPage;
