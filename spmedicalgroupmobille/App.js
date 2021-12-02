import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Consultas from './screens/ConsultasU'
import login from './screens/Login'


const AuthStack = createStackNavigator(); 

export default function Stack() {
  return(
    <NavigationContainer>
      <StatusBar
      hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Login" component={login} />
        <AuthStack.Screen name="Consultas" component={Consultas} /> 

      </AuthStack.Navigator>
    </NavigationContainer>
  );
}