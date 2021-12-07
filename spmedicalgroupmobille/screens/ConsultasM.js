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

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function ConsultasMed() {

    const [listaConsul, setLC] = useState([])

    const nav = useNavigation()

    async function Logout(){

        try {
            await AsyncStorage.removeItem('TokenM')
            nav.navigate('LoginM')
            
        } catch (error) {
            throw error
        }
       
    }

    useEffect(async function buscarConsul() {
        const token = await AsyncStorage.getItem('TokenM')

        const resp = await api.get('/Consultas/minhasmed', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })

        if (resp.status === 200) {
            setLC(resp.data)

        }
    }, [])
    // useEffect(() => getResponse())


    //usar listaConsultas como render item.
    const renderItem = ({ item }) => {
        return (
            <View style={styles.ConsultaU}>
                <Text style={styles.NumeroC} >Consulta #{item.idConsulta}</Text>
                <Text style={styles.textC}>{item.idUsuarioNavigation.nome}</Text>
                <Text style={styles.textC}>{item.descricao}</Text>
                <Text style={styles.textC}>{item.idSituacaoNavigation.descrição}</Text>
                <Text style={styles.textC}>{Intl.DateTimeFormat("pt-BR", {
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
                        <TouchableOpacity
                            style={styles.btnLogin}
                            onPress={Logout}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
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
        backgroundColor: 'rgba(138,230,151, 1)',

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
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection:'row'
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
        justifyContent: 'space-evenly',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,

    },
    NumeroC: {
        color: 'white',
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 23,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 3 },
        textShadowRadius: 1
    },
    textC: {
        color: 'white',
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 1
    },
    btnLogin:{
        // marginTop: 57,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(131,190,223, 1)',
        width: 80,
        height: 28,
        borderRadius: 89,
 
    },
});