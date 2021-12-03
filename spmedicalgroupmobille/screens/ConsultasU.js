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

    const [listaConsul, setLC] = useState([])

    async function buscarConsul() {
        const token = await AsyncStorage.getItem('TokenU')

        const resp = await api.get('/Consultas/minhas', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })

        if (resp.status === 200) {
            setLC(resp.data)

        }
    }

    useEffect(buscarConsul, [])
    // useEffect(() => getResponse())


    //usar listaConsultas como render item.
    const renderItem = ({ item }) => {
        return (
            <View style={styles.ConsultaU}>
                <Text style={styles.NumeroC} >Consulta #{item.idConsulta}</Text>
                <Text>{item.idMedicoNavigation.nome}</Text>
                <Text>{item.idSituacaoNavigation.descrição}</Text>
                <Text>{Intl.DateTimeFormat("pt-BR", {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', hour12: true
                }).format(new Date(item.dataConsulta))}</Text>
            </View>
        )
    }


    return (



        <FlatList
            ListHeaderComponent={
                <>
                    <View style={styles.HeaderCon}>
                        <Image style={styles.imgLogoCons} source={require('../assests/LogoSpConsul.png')} />
                    </View>
                </>
            }
            contentContainerStyle={styles.container}
            data={listaConsul}
            keyExtractor={item => item.idConsulta}
            renderItem={renderItem}
        />




    )


}

const styles = StyleSheet.create({

    container: {

        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'rgba(138,230,151, 1)'
    },
    // container2: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'rgba(126,212,148, 1)',
    //     width: 411,
    //     height: 100
    // },
    HeaderCon: {
        width: 411,
        height: 100
        , backgroundColor: 'rgba(126,212,148, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute'
    },
    imgLogoCons: {
        width: 77,
        height: 77,
        // marginRight: 20

    },
    ConsultaU: {
        width: 297,
        height: 281,
        backgroundColor: 'rgba(131,190,223, 1)',
        borderRadius: 39,
        marginTop: 40,
        marginBottom: 22,
        alignItems: 'center',
        justifyContent: 'space-evenly'

    },
    NumeroC: {
        color: 'white',
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 23
    }
});
