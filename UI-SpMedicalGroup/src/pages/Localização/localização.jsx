// import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
// import { useState,useEffect } from 'react';
// import axios from 'axios';


// import Header from '../../components/header/header';

// function Maps(){
//     const[listaLocalizacoes, setLL] = useState([])

//     const[showingInfoWindow, setInfowindow] = useState(false)
//     const[marcador, setMarker] = useState({})
//     const[lugar, setPlace] = useState({})


//     // showingInfoWindow: false,
//     //         marcadorAtivo: {},
//     //         lugar: {},

//     function buscarListaLocal(){
//         axios("http://192.168.5.154:5000/api/Localizacao")
//         .then(resp => {
//             if (resp.status === 200) {
//                 setLL(resp.data)
//             }
//         })
//         .catch(erro => console.log(erro))
//     }

//     function onclickMarker(props, marker){
//         setPlace(props)
//         setMarker(marker)
//         setInfowindow(true)
//     }

//     useEffect(buscarListaLocal, [])

//     return(
//         <div>
//             <Header/>
//             <main>
//                 <Map google={React.PropTypes.object} zoom={10} initialCenter={{
//                     lat: -23.53620139908343,
//                     lng: -46.64622506172682
//                 } }>

//                     {
//                         listaLocalizacoes.map((item) => {
//                             return (
//                                 <Marker
//                                     onClick={onclickMarker}
//                                     item={item.id}
//                                     position={{ lat: item.latitude, lng: item.longitude }}
//                                 />

//                             )
//                         })
//                     }

//                     <InfoWindow
//                         marker={marcador}
//                         visible={showingInfoWindow}
//                     >
//                         <div>
//                             <h1>oi</h1>
//                         </div>

//                     </InfoWindow>
//                 </Map>    

//             </main>
//         </div>
//     )
// }

// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyD1XnQk1ZLEbBXcSBS3_UZlEHHkO0S6v5M")
// })(Maps)