import React, { Component, useState, useEffect }  from 'react';
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



export default function Login(){
    const[ emailU, setEmail] = useState('alexandre@gmail.com')
    const[ senhaU, setSenha] = useState('12345678')

    const nav = useNavigation()

    async function  efetuarLogin(){

        const resp = await api.post('/Login', {
            email: emailU,
            senha: senhaU
        })

        const token = resp.data.token;
        await AsyncStorage.setItem('TokenU', token);

        if (resp.status == 200) {
            console.warn(token)
            nav.navigate('Consultas')

        }


    } 

    return(
            <View style={styles.container}>
                <Image style={styles.imgLogin} source={require('../assests/logoLogin.png')}/>
                <Text style={styles.textLogin} >Bem-vindo, Usuario</Text>
                <TextInput style={styles.inputLogin}
                placeholder="Email" placeholderTextColor='rgba(196,196,196, 1)'
                keyboardType="email-address"
                onChangeText={() => setEmail}
                />
                <TextInput style={styles.inputLogin}
                placeholder="Senha" placeholderTextColor='rgba(196,196,196, 1)'
                keyboardType="default"
                secureTextEntry={true} 
                onChangeText={() => setSenha}
                />
                <Text style={styles.textLogin2} >Esqueceu a senha?</Text>

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
