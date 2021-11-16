import React from "react"
import logo from "../../assets/img/logo_spmedgroup_v1 2.png"
import {Link} from "react-router-dom"
import "../../assets/css/headerS.css"
import { parseJwt, usuarioAutenticado } from "../../Services/auth"

export default function Header(){
    return(
        <header>
            <div className="header-bg">
                <nav className='nav-header'>
                    <Link className="links_h" to="/medico">Medico</Link>
                    <Link className="links_h"  to="/consultas">Consultas</Link>
                    
                   <Link className="links_h" to="/adm">Administração</Link>
                    
                    
                    <span className="dot"><img className="logo_Header" src={logo} alt="Logo do Sp Medical Group" /></span>
                </nav>
                <nav className="nav-headerB">
                    {
                        usuarioAutenticado() && parseJwt().role === '3' ? 
                        <Link className="btn_login" to="/loginmed">Login</Link> : <Link className="btn_login" to="/login">Login</Link> 
                    }
                    
                    
                </nav>
            </div>
        </header>
    )
}