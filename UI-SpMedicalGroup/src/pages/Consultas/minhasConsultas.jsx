import Header from "../../components/header/header";
import "../../assets/css/minhasConsultas.css"
import "../../assets/css/reset.css"
import { useEffect, useState } from "react";
import axios from "axios";
// import userEvent from "@testing-library/user-event";

export default function MinhasConsultas() {

    const [ListaMinhaConsultas, setLMC] = useState([])

    function buscarConsulta() {
        axios('http://localhost:5000/api/Consultas/minhas', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(r => {
                if (r.status === 200) {
                    setLMC(r.data);
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(buscarConsulta, [])

    return (
        <div>
            <Header />
            <main>
                <div className="container_main">
                    {
                        ListaMinhaConsultas.map((P) => {
                            return (
                                <div className="Container_Consulta">
                                    <div className="Container_legends" key={P.idConsulta}>
                                        <span className="legenda_consu">Conusulta #{P.idConsulta}</span>
                                        <span className="legenda_consu">Medico:</span>
                                        <span className="legenda_consu bgwhite" >{P.idMedicoNavigation.nome}</span>
                                        <span className="legenda_consu">Descrição:</span>
                                        <span className="legenda_consu bgwhite">{P.descricao}</span>
                                        <span className="legenda_consu">{
                                        Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                            hour: 'numeric', minute: 'numeric', hour12: true
                                        }).format(new Date(P.dataConsulta)) 
                                        }</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    

                </div>
            </main>
        </div>



    )

}