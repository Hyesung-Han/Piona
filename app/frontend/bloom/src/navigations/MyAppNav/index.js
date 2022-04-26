import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MainPage from '../../pages/Main';
import AlarmPage from '../../pages/Alarm';
import CartPage from '../../pages/Cart';
import ChangeInfoPage from '../../pages/ChangeInfo';
import SignPage from '../../pages/Sign';
import MapPage from '../../pages/Map';
import MenuDetailPage from '../../pages/MenuDetail';
import MyInfoPage from '../../pages/MyInfo';
import PicnicingPage from '../../pages/Picnicing';
import PicnicedPage from '../../pages/Picniced';
import PwdCheckPage from '../../pages/PwdCheck';
import SearchResultPage from '../../pages/SearchResult';
import ShopPage from '../../pages/Shop';
import ShopHomePage from '../../pages/ShopHome';
import ShopMenuPage from '../../pages/ShopMenu';
import ShopReviewPage from '../../pages/ShopReview';
import WishListPage from '../../pages/WishList';

/**
 * CSW | 2022.04.26
 * @name MyApp
 * @des
 * App 화면에 들어가는 Nav(BottomTap, TopTab, Icons) 모아놓은 페이지
 * 모든 페이지들과 아이콘이 포함되어있음
 * TODO
 * 1. 각자 페이지 완성하고 나면 각 페이지에서 props로 받아야하는 정보(가게이름, 상품이름 등등) 처리를 위해서 코드수정이 필요함
 *  */

const MyApp = () => {
  const Stack = createNativeStackNavigator();
  const TopTab = createMaterialTopTabNavigator();
  const Tab = createBottomTabNavigator();

  function MainNav({navigation}) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          initialRouteName: 'Homes',
          headerStyle: {
            backgroundColor: '#F2A7B3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }}>
        <Stack.Screen
          name="Homes"
          component={MainPage}
          options={{
            title: '홈',
            headerRight: () => (
              <Icon.Button
                onPress={() =>
                  navigation.navigate('Alarm', {navigation: `${navigation}`})
                }
                name="notifications-outline"
                color="white"
                backgroundColor="#F2A7B3"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchResultPage}
          options={{title: '검색결과'}}
        />
        <Stack.Screen
          name="Alarm"
          component={AlarmPage}
          options={{title: '알람', headerRight: null}}
        />
        <Stack.Screen
          name="ShopDetail"
          component={TopTabStackShopScreen}
          options={{title: '가게 상세정보'}}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
          options={{title: '지도'}}
        />
      </Stack.Navigator>
    );
  }

  function TopTabStackShopScreen() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          headerShown: false,
        }}>
        <Stack.Screen
          name="Shoptap"
          component={ShopNav}
          options={{title: '가게이름'}}
        />
      </Stack.Navigator>
    );
  }
  function ShopNav() {
    return (
      <TopTab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: 'black',
          tabBarIndicatorStyle: {backgroundColor: '#F2A7B3'},
          tabBarStyle: {
            backgroundColor: '#white',
          },
          tabBarLabelStyle: {fontSize: 12},
          initialRouteName: 'ShopHome',
        }}>
        <TopTab.Screen
          name="ShopHome"
          component={ShopHomePage}
          options={{title: '홈'}}
        />
        <TopTab.Screen
          name="ShopMenu"
          component={ShopMenuPage}
          options={{title: '메뉴'}}
        />
        <TopTab.Screen
          name="ShopReview"
          component={ShopReviewPage}
          options={{title: '리뷰'}}
        />
      </TopTab.Navigator>
    );
  }

  function WishListNav({navigation}) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#F2A7B3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }}>
        <Stack.Screen
          name="WishLists"
          component={WishListPage}
          options={{title: '위시리스트'}}
        />
        <Stack.Screen
          name="Shops"
          component={ShopPage}
          options={{title: '가게'}}
        />
      </Stack.Navigator>
    );
  }

  function TopTabStackPicnicScreen() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#F2A7B3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }}>
        <Stack.Screen
          name="PicnicTap"
          component={PicnicNav}
          options={{title: '피크닉'}}
        />
      </Stack.Navigator>
    );
  }
  function PicnicNav() {
    return (
      <TopTab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: 'black',
          tabBarIndicatorStyle: {backgroundColor: '#F2A7B3'},
          tabBarStyle: {
            backgroundColor: '#white',
          },
          tabBarLabelStyle: {fontSize: 12},
          initialRouteName: 'Picnicing',
        }}>
        <TopTab.Screen
          name="Picnicing"
          component={PicnicingPage}
          options={{title: '진행중인 예약'}}
        />
        <TopTab.Screen
          name="Picniced"
          component={PicnicedPage}
          options={{title: '완료된 예약'}}
        />
      </TopTab.Navigator>
    );
  }
  function CartNav() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#F2A7B3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }}>
        <Stack.Screen
          name="Carts"
          component={CartPage}
          options={{title: '장바구니'}}
        />
        <Stack.Screen
          name="Menus"
          component={MenuDetailPage}
          options={{title: '상품상세페이지'}}
        />
      </Stack.Navigator>
    );
  }

  function MyInfoNav() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          initialRouteName: 'MyInfos',
          headerStyle: {
            backgroundColor: '#F2A7B3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }}>
        <Stack.Screen
          name="MyInfos"
          component={MyInfoPage}
          options={{title: '내 정보'}}
        />
        <Stack.Screen
          name="PwdCheck"
          component={PwdCheckPage}
          options={{title: '비밀번호 확인'}}
        />
        <Stack.Screen
          name="ChangeInfo"
          component={ChangeInfoPage}
          options={{title: '내 정보 수정'}}
        />
      </Stack.Navigator>
    );
  }

  function MyAppNav() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          initialRouteName: 'Home',
          tabBarActiveTintColor: '#F2A7B3',
          tabBarInactiveTintColor: '#6A6A6A',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen
          name="Home"
          component={MainNav}
          options={{
            tabBarLabel: '홈',
            tabBarLabelStyle: {fontSize: 11},
            tabBarIcon: ({focused}) => (
              <Icon
                name="home-outline"
                style={{color: focused ? '#F2A7B3' : '#6A6A6A'}}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WishList"
          component={WishListNav}
          options={{
            title: '위시리스트',
            tabBarLabelStyle: {fontSize: 11},
            tabBarIcon: ({focused}) => (
              <Icon
                name="heart-outline"
                style={{color: focused ? '#F2A7B3' : '#6A6A6A'}}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Picnic"
          component={TopTabStackPicnicScreen}
          options={{
            title: '피크닉',
            tabBarLabelStyle: {fontSize: 11},
            tabBarIcon: ({focused}) => (
              <Icon
                name="flower-outline"
                style={{color: focused ? '#F2A7B3' : '#6A6A6A'}}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartNav}
          options={{
            title: '장바구니',
            tabBarLabelStyle: {fontSize: 11},
            tabBarIcon: ({focused}) => (
              <Icon
                name="cart-outline"
                style={{color: focused ? '#F2A7B3' : '#6A6A6A'}}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MyInfo"
          component={MyInfoNav}
          options={{
            title: '내정보',
            tabBarLabelStyle: {fontSize: 11},
            tabBarIcon: ({focused}) => (
              <Icon
                name="person-outline"
                style={{color: focused ? '#F2A7B3' : '#6A6A6A'}}
                size={25}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="appScreen" component={MyAppNav} />
    </Stack.Navigator>
  );
};

export default MyApp;
