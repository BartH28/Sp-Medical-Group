import React from "react"
import logo from "../../assets/img/logo_spmedgroup_v1 2.png"
import { Link, useHistory } from "react-router-dom"
import "../../assets/css/headerS.css"
import { parseJwt, usuarioAutenticado } from "../../Services/auth"
import { slide as Menu } from 'react-burger-menu'

export default function Header() {
    const _history = useHistory

    function goHome() {


        _history.push('/')
    }

    var styles = {
        bmBurgerButton: {
          position: 'fixed',
          width: '36px',
          height: '30px',
          left: '36px',
          top: '65px'
        },
        bmBurgerBars: {
          background: '#83BEDF'
        },
        bmBurgerBarsHover: {
          background: '#a90000'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: '#83BEDF',
          padding: '2.5em 1.5em 0',
          fontSize: '1.15em'
        },
        // bmMorphShape: {
        //   fill: '#373a47'
        // },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em'
        },
        bmItem: {
          display: 'flex'
        },
        bmOverlay: {
        //   overflox-x: 'hidden',  
          background: 'rgba(0, 0, 0, 0.3)'
        }
      } 

    return (
        <header>
            <div className="header-bg">
                <nav className='nav-header'>
                    {/* <Menu  > */}

                        <Link className="links_h" to="/medico">Medico</Link>
                        <Link className="links_h" to="/consultas">Consultas</Link>

                        <Link className="links_h" to="/adm">Administração</Link>
                    {/* </Menu> */}


                    <span className="dot"><Link  to="/"><img className="logo_Header" src={logo} alt="Logo do Sp Medical Group" /></Link></span>
                </nav>
                <nav className="nav-headerB">
                    {
                        usuarioAutenticado() && parseJwt().role === '3' ?
                            <Link className="btn_login_H" to="/loginmed">Login</Link> : <Link className="btn_login_H" to="/login">Login</Link>
                    }


                </nav>
            </div>
        </header>
    )
}