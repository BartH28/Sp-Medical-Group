import React, { Component, useState, useEffect, useContext }  from 'react';
import {

  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,

  View,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api'
import AppContext from '../Component/AppContext'



export default function loginM(){
    const myContext = useContext(AppContext)
    // const[ emailU, setEmail] = useState('')
    // const[ senhaU, setSenha] = useState('')

    const nav = useNavigation()

    async function  efetuarLogin(){

        const resp = await api.post('/LoginsMedicos/Login', {
            email: myContext.email,
            senha: myContext.senha
        })

        const token = resp.data.token;
        await AsyncStorage.setItem('TokenU', token);

        if (resp.status == 200) {
            // console.warn(token)
            nav.navigate('Consultas')

        }


    } 

    return(
            
            <View style={styles.container}>
                <View>
                
            </View>
                <Image style={styles.imgLogin} source={require('../assests/logoLogin.png')}/>
                <Text style={styles.textLogin} >Bem-vindo, Medico</Text>
                <TextInput style={styles.inputLogin}
                placeholder="Email" placeholderTextColor='rgba(196,196,196, 1)'
                keyboardType="email-address"
                onChangeText={() => myContext.setEmail}
                />
                <TextInput style={styles.inputLogin}
                placeholder="Senha" placeholderTextColor='rgba(196,196,196, 1)'
                keyboardType="default"
                secureTextEntry={true} 
                onChangeText={() => myContext.setSenha}
                />

                <TouchableOpacity
                    onPress={nav.navigate('Login')}
                >

                <Text style={styles.textLogin2} >Logar como Usario? {"\n"}    Clique Aqui</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={efetuarLogin}
                >
                    <Text style={styles.btntext}>Login</Text>
                </TouchableOpacity>

            </View>
       
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 1)'
    },

    imgLogin:{
        width:109,
        height: 119
    },
    textLogin:{
        fontSize: 16,
        color: 'rgba(129,223,153, 1)',
        paddingTop: 50,
        paddingBottom: 60
    },
    textLogin2:{
        fontSize: 16,
        color: 'rgba(129,223,153, 1)',
        paddingTop: 33,
        // paddingBottom: 60
    },
    inputLogin:{
        borderBottomWidth: 2,
        borderBottomColor:  'rgba(196,196,196, 1)',
        width: 336,
        height: 50,

    },
    btnLogin:{
        marginTop: 57,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(131,190,223, 1)',
        width: 80,
        height: 28,
        borderRadius: 89,
 
    },
    btntext:{
        color:'rgba(255,255,255, 1)'
    }
});
