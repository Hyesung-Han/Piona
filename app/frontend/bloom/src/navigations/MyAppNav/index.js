import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../pages/Main';


const MyApp = () => {

    const Stack = createNativeStackNavigator();
    const TopTab = createMaterialTopTabNavigator();
    const Tab = createBottomTabNavigator();

    function HomeNav({navigation}) {
      return (
        <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center',
          initialRouteName : 'Homes'
        }}>
          <Stack.Screen name="Homes" component={HomePage} options={{title: '홈'}}/>
        </Stack.Navigator>
      );
    }

    return (
    <Stack.Navigator
      screenOptions={{
        headerShown : false
        }}>
          <Stack.Screen name="LoginScreen" component={HomeNav} />

      </Stack.Navigator>
    );
}

export default MyApp;
