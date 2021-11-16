import Header from "../../components/header/header";
import { useState, useEffect } from 'react'
import axios from "axios";
import "../../assets/css/consultaS.css"
import "../../assets/css/reset.css"

export default function ConsultasAdm() {
    const [listaConsultas, setLC] = useState([])
    const [listaMed, setMed] = useState([])
    const listasituacao = [1 , 2, 3]
    const [listasipaciente, setpacient] = useState([])
    const [idmedico, setMedico] = useState(0)
    const [idpaciente, setPaciente] = useState(0)
    const [idsituacao, setSituacao] = useState(0)
    const [data, setData] = useState(new Date())
    const [loading, setLoading] = useState(false)

    function buscarConsultasadm() {
        axios('http://localhost:5000/api/Consultas/todas',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(r => {
                if (r.status === 200) {
                    setLC(r.data)
                    console.log(listaConsultas)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(buscarConsultasadm, [])

    function cadastrarConsultas(event){
        event.preventDefault()
        setLoading(true)

        let evento = {
            idusuario : idpaciente,
            idmedico : idmedico,
            dataConsulta : new Date(data),
            idsituacao : idsituacao
        }

        axios.post('http://localhost:5000/api/Consultas/agendamento', evento, {
            headers: {
                Authorization : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then((r) =>{
            if (r.status === 201) {
                console.log(r.data)
                setLoading(false)
            }
        })
        .catch((erro) => {
            console.log(erro)
            setLoading(false)
        })
        .then(buscarConsultasadm)

    }

    function buscarMedicos() {
        axios('http://localhost:5000/api/Medicos', {
            headers: {
                Authorization : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then((r) => {
            if (r.status === 200) {
                setMed(r.data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(buscarMedicos, [])

    function buscarPacientes() {
        axios('http://localhost:5000/api/Usuarios/', {
            headers: {
                Authorization : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then((r) =>{
            if (r.status === 200) {
                setpacient(r.data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(buscarPacientes, [])



    return (
        <div>
            <Header />
            <main className="mainCons">
                <section className="sec_table">

                    <table className="table_main">
                        <thead>
                            <tr>
                                <th className="th_main_tb">#</th>
                                <th className="th_main_tb">Medico</th>
                                <th className="th_main_tb">Paciente</th>
                                <th className="th_main_tb">Situação</th>
                                <th className="th_main_tb">Descrição</th>
                                <th className="th_main_tb">Data</th>
                                {/* <th className="th_main_tb">Descrição</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaConsultas.map( (consultas) => {
                                    return(
                                        <tr key={consultas.idConsulta}>
                                            <td>{consultas.idConsulta}</td>
                                            <td>{consultas.idMedicoNavigation.nome}</td>
                                            <td>{consultas.idUsuarioNavigation.nome}</td>
                                            <td>{consultas.idSituacaoNavigation.descrição}</td>
                                            <td>{consultas.descricao}</td>
                                            <td>{
                                            Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'numeric', day: 'numeric',
                                                hour: 'numeric', minute: 'numeric', hour12: false
                                            }).format(new Date(consultas.dataConsulta)) 
                                            
                                            }</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </section >
                <section className="sec_cad">
                    <form className="fomr_consu" onSubmit={cadastrarConsultas}>
                        <label for="sel_Med"> Medicos</label>
                        <select value={idmedico} onChange={(campo) => setMedico(campo.target.value)} name="Medicos" id="sel_Med">
                            <option value="0">Selecione o Medico da consulta</option>
                            {
                                listaMed.map((medicos) => {
                                    return(
                                        <option value={medicos.idMedico} key={medicos.idMedico}>{medicos.nome}</option>
                                    )
                                })
                            }
                        </select>
                        <label for="sel_Pa"> Paciente</label>
                        <select value={idpaciente} onChange={(campo) => setPaciente(campo.target.value) } name="Pacientes" id="sel_Pa">
                            <option value="0">Selecione o Paciente da consulta</option>
                            {
                                listasipaciente.map((pacientes) => {
                                    return(
                                        <option value={pacientes.idUsuario} key={pacientes.idUsuario}>{pacientes.nome}</option>
                                    )
                                })
                            }
                        </select>
                        <label for="sel_Sit"> Situação</label>
                        <select value={idsituacao} onChange={(campo) => setSituacao(campo.target.value)} name="Situação" id="sel_Pa">
                            
                            <option value="0" >Selecione a Situação da consulta</option>
                            <option value={listasituacao[0]} >Realizado</option>
                            <option value={listasituacao[1]}>Cancelado</option>
                            <option value={listasituacao[2]} >Agendado</option>
                        </select>
                        <input type="datetime-local" value={data} onChange={(campo) => setData(campo.target.value)} className="input_data" />
                        {/* <input className="input_form" type="text" placeholder="Descrição"/> */}
                        {
                            loading === false &&
                            <input type="submit"  className="btn_cadastrar" value="Cadastrar" />
                        }
                        {
                            loading === true &&
                            <input type="submit" disabled  className="btn_cadastrar" value="Loading..." />
                        }
                        

                    </form>
                </section>
            </main>

        </div>
    )
}