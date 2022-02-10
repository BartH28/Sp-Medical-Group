import Header from "../../components/header/header";
import "../../assets/css/minhasConsultas.css"
import "../../assets/css/reset.css"
import { useEffect, useState } from "react";
import axios from "axios";
// import userEvent from "@testing-library/user-event";

export default function MinhasConsultasMed() {

    const [ListaMinhaConsultasMed, setLMCM] = useState([])
    const [novaDesc, setDesc] = useState('')
    const [idConsu, setIdCons] = useState('')

    function buscarConsultamed() {
        axios('http://192.168.4.240:5000/api/Consultas/minhasmed', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(r => {
                if (r.status === 200) {
                    setLMCM(r.data);
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(buscarConsultamed, [])

    function alterarDesc(event){
        event.preventDefault()

        let descricao = {
            Descricao : novaDesc
        }

       

        axios.patch('http://192.168.4.240:5000/api/Consultas/descricao/' + idConsu, descricao ,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .catch((error) => console.log(error))
        .then(setIdCons(0))
        .then(buscarConsultamed)
    }

     function  buscarIdConsulta(Consulta){
        setIdCons( Consulta)
        console.log(idConsu)
        
    }

    return (
        <div>
            <Header />
            <main>
                <div className="container_main">
                    {
                        ListaMinhaConsultasMed.map((P) => {
                            return (
                                <div className="Container_Consulta">
                                    <div className="Container_legends" key={P.idConsulta}>
                                        <span className="legenda_consu">Conusulta #{P.idConsulta}</span>
                                        <span className="legenda_consu">Paciente:</span>
                                        <span className="legenda_consu bgwhite" >{P.idUsuarioNavigation.nome}</span>
                                        <span className="legenda_consu">Descrição:</span>
                                        <span className="legenda_consu bgwhite">{P.descricao}</span>
                                        <form onSubmit={alterarDesc}>
                                            <input onFocus={() => buscarIdConsulta(P.idConsulta)} onChange={(campo) => setDesc(campo.target.value)} className="bgAzul" placeholder="Insira a nova Descrição aqui" type="text" />
                                            <button type="submit" className="btn_cadastrar marg_btn ">Alterar Descrição</button>
                                        </form>
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