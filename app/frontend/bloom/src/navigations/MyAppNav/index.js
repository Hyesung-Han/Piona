import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainPage from '../../pages/Main';
import AlarmPage from '../../pages/Alarm';
import CartPage from '../../pages/Cart';
import ChangeInfoPage from '../../pages/ChangeInfo';
import InitPage from '../../pages/Init';
import MapPage from '../../pages/Map';
import MenuDetailPage from '../../pages/MenuDetail';
import MyInfoPage from '../../pages/MyInfo';
import PicnicingPage from '../../pages/Picnicing';
import PicnicedPage from '../../pages/Picniced';
import PwdChectPage from '../../pages/PwdCheck';
import SearchResultPage from '../../pages/SearchResult';
import ShopPage from '../../pages/Shop';
import ShopHomePage from '../../pages/ShopHome';
import ShopMenuPage from '../../pages/ShopMenu';
import ShopReviewPage from '../../pages/ShopReview';
import SignInPage from '../../pages/SignIn';
import SignUpPage from '../../pages/SignUp';
import WishListPage from '../../pages/WishList';

const MyApp = () => {
  const Stack = createNativeStackNavigator();
  const TopTab = createMaterialTopTabNavigator();
  const Tab = createBottomTabNavigator();

  function MainNav({navigation}) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          initialRouteName: 'Home',
        }}>
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={{title: '홈'}}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResultPage}
          options={{title: '검색', headerRight: null}}
        />
        <Stack.Screen
          name="Shop"
          component={ShopPage}
          options={{title: '가게'}}
        />
      </Stack.Navigator>
    );
  }

  function WishListNav({navigation}) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="WishList"
          component={WishListPage}
          options={{title: '위시리스트'}}
        />
        <Stack.Screen
          name="Shop"
          component={ShopPage}
          options={{title: '가게'}}
        />
      </Stack.Navigator>
    );
  }

  function MyAppNav() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          initialRouteName: 'Home',
          tabBarActiveTintColor: 'black',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen
          name="Main"
          component={MainNav}
          options={{tabBarLabel: '홈'}}
        />
        <Tab.Screen
          name="WishList"
          component={WishListNav}
          options={{title: '위시리스트'}}
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
