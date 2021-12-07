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

export default function Main(){
    const nav = useNavigation()

    
    function logMed(){
        try {
            
            nav.navigate('LoginM')
        } catch (error) {
            console.warn(error)
            throw error
        }
   }
    function logU(){
        try {
            
            nav.navigate('Login')
        } catch (error) {
            console.warn(error)
            throw error
        }
   }
    

    return(
        <View style={styles.container}>
            <Image style={styles.imgLogin} source={require('../assests/logoLogin.png')}/>
            <Text style={styles.textoMain}>Bem Vindo ao Sp Medical Group</Text>
            <View style={styles.containerBTNS}>


            <TouchableOpacity
            onPress={logMed}
            style={styles.btnIniciar}
            >
                <Text style={styles.btntext}>Medico</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={logU}
            style={styles.btnIniciar}
            >
                <Text style={styles.btntext}>Paciente</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoMain:{
        marginTop: 50,
        color: 'rgba(126,212,148, 1)',
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 15,
        // textShadowColor: 'rgba(0, 0, 0, 0.75)',
        // textShadowOffset: { width: 1, height: 2 },
        // textShadowRadius: 1
    },
    btnIniciar:{
        backgroundColor: 'rgba(126,212,148, 1)',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 50
    },
    btntext:{
        // textTransform: 'uppercase',
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        color: 'rgba(255,255,255, 1)'
    },
    containerBTNS:{
        flexDirection:'row',
        width: 300,
        justifyContent: 'space-around'
    }
    

})

