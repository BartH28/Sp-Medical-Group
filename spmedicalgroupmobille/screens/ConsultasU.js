import React, { Component, useEffect, useState } from 'react';
import {

    StyleSheet,
    Text,
    Image,
    TextInput,
    FlatList,
    View,
    ScrollView,
    SectionList
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function Consultas() {

    const[listaConsul , setLC] = useState([])

    async function buscarConsul(){
        const token = await AsyncStorage.getItem('TokenU')

        const resp = await api.get('/Consultas/minhas',  {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        } )

        setLC(resp.data)

        console.warn(resp.data)

        
    }

    useEffect(buscarConsul, [])


    //usar listaConsultas como render item.
    function renderItem(item)  {

        <View>
           <Text>
               alala
           </Text>

        </View>
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.HeaderCon}>
                <Image style={styles.imgLogoCons} source={require('../assests/LogoSpConsul.png')} />
            </View>

            {/* <FlatList
                contentContainerStyle={styles.container}
                data={this.state.listaProjetos}
                keyExtractor={item => item.idProjeto}
                renderItem={renderItem}
            /> */}


        </View>

    )

   
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'rgba(138,230,151, 1)'
    },
    HeaderCon: {
        width: 411,
        height: 100
        , backgroundColor: 'rgba(126,212,148, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgLogoCons: {
        width: 77,
        height: 77,
        // marginRight: 20

    }
});
