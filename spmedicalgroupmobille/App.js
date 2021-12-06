import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { Appearance, StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Consultas from './screens/ConsultasU'
import login from './screens/Login'
import loginM from './screens/LoginM';
import Main from './screens/Main'
import AppContext from './Component/AppContext';


const AuthStack = createStackNavigator(); 

export default function Stack() {
  const [email , setEmail] = useState('')
  const [senha , setSenha] = useState('')

  const userLogin = {
    Email: email,
    Senha: senha,
    setEmail,
    setSenha
  }
  return(
    <AppContext.Provider value={userLogin}>
      
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
          {/* <AuthStack.Screen name="Main" component={Main} /> */}
          <AuthStack.Screen name="LoginM" component={loginM} />
          <AuthStack.Screen name="Consultas" component={Consultas} /> 
          {/* <AuthStack.Screen name="ConsultasMed" component={ConsultasMed} />  */}

        </AuthStack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}