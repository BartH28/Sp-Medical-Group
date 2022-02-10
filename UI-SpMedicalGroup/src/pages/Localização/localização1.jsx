import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { Component } from "react";
import axios from "axios";

import Header from '../../components/header/header';

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaLocalizacoes: [],
            showingInfoWindow: false,
            marcadorAtivo: {},
            lugar: {},
        }
    };

    BuscarLocalizacoes = () => {
        axios("http://192.168.4.240:5000/api/Localizacao", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaLocalizacoes: resposta.data });
                }
            }).catch(erro => console.log(erro))
    }

    cliqueMarcador = (props, marker, e) =>
        this.setState({
            lugar: props,
            marcadorAtivo: marker,
            showingInfoWindow: true
        });


    componentDidMount() {
        this.BuscarLocalizacoes()
    }

    render() {
        return (
            <div>
                <Header />
                <main className='main_adm '>
                    <Map className='mapa' google={this.props.google} zoom={12}
                        initialCenter={{
                            lat: -23.53620139908343,
                            lng: -46.64622506172682
                        }}>

                        {

                            this.state.listaLocalizacoes.map((item) => {
                                // console.log(item);

                                return (
                                    <Marker onClick={this.cliqueMarcador}
                                        id={item.id}
                                        position={{ lat: item.latitude, lng: item.longitude }} />
                                )
                            })
                        }

                        <InfoWindow
                            marker={this.state.marcadorAtivo}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h1 style={{fontSize: 14, color:"#82C0D9"}}>Local do paciente</h1>
                            </div>
                        </InfoWindow>

                    </Map>
                </main>
            </div>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCpayHP2QP9ydgW0B6iMnPGMWo38bkfsS0")
})(Maps)
// apiKey: ("AIzaSyDBAKlR7YNlROT-q03Ra_Qpl_n_NiQRmdQ")