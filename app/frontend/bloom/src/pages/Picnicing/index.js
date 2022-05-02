import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Dimensions, Alert, Text, FlatList} from 'react-native';
import PicnicCard from '../../components/PicnicCard';

/**
 * LHJ | 2022.05.02
 * @name PicnicingPage
 * @api /picnic, /picnic
 * @des
 * 1. 컴포넌트 목록 : PicnicCard, FlatList
 * 2. 페이지 기능 :
 * 피크닉 페이지 안에 있는 진행중인 예약 탭이다.
 * 진행중인 예약 목록을 보여주기 위해서 RN에서 기본 제공하는 FlatList(가변적인 크기의 목록을 리스트화 할 때 사용)와
 * 해당 리스트를 하나의 카드로 보여주기 위해서 PicnicCard 컴포넌트를 사용함
 * 사용된 api로는 /picnic(나의 예약현황 보기), /picnic(예약 취소)가 있다.
 */

const PicnicingPage = ({navigation}) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  //getData에 진행중인 예약을 가져오는 api를 넣자!!!
  const getData = () => {
    setLoading(true);
    fetch('http://jsonplaceholder.typicode.com/posts')
      //해당 api를 통해서 받아오는 정보는 userId, id, title, body이다.
      .then(res => res.json())
      .then(res => setData(res));
  };

  const DATA = [
    //괄호 하나하나가 item이 된다.
    {
      shopName: '호진이가게',
      date: '2020-20-20',
      desc: '호진이가게,ㅁㄴㅇ',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          itemId: 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '소원이가게',
      date: '2020-20-20',
      desc: '소원이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '혜성이가게',
      date: '2020-20-20',
      desc: '혜성이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '동준이형가게',
      date: '2020-20-20',
      desc: '동준이형가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '정아누나가게',
      date: '2020-20-20',
      desc: '정아누나가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '윤택이형가게',
      date: '2020-20-20',
      desc: '윤택이형가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '호진이가게',
      date: '2020-20-20',
      desc: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '호진이가게',
      date: '2020-20-20',
      desc: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '호진이가게',
      date: '2020-20-20',
      desc: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
    {
      shopName: '호진이가게',
      date: '2020-20-20',
      desc: '호진이가게',
      imgUrl: 'https://reactjs.org/logo-og.png',
      detail: [
        {
          "itemId": 1,
          "itemName": "피크닉매트 대형",
          "quantity": 1,
          "price": 10000,
          "description": "6인이 사용가능한 대형 피크닉 매트입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        },
        {
          "itemId": 3,
          "itemName": "블루투스 스피커",
          "quantity": 1,
          "price": 2000,
          "description": "놀면서 쓰기 좋은 블루투스 스피커입니다",
          "imageUrl": "https://reactjs.org/logo-og.png",
        }
      ],
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    return <PicnicCard item={item} />;
  };

  return (
    <View>
      <View>
        <FlatList
          //리스트의 소스를 담는 속성
          //data={data}
          data={DATA}
          //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
          renderItem={renderItem}
          //item의 고유의 키를 부여하는 속성
          keyExtractor={item => String(item.id)}
        />
      </View>
    </View>
  );
};
export default PicnicingPage;
