import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { parseJwt, usuarioAutenticado } from '../src/Services/auth';
import {Route , BrowserRouter as Router,Redirect, Switch} from 'react-router-dom';

import Login from '../src/pages/login/login';
import minhasConsultas from './pages/Consultas/minhasConsultas';
import Administracao from '../src/pages/adm/adm';
import notFound from './pages/notFound/notFound';
import ConsultasAdm from './pages/Consultas/consultasadm';
import MinhasConsultasMed from './pages/medico/consultasMed';
import LoginMed from './pages/login/loginMed';
import Map from './pages/Localização/localizacao'

const Permissaoadm = ({ component : Component}) => (
  <Route 
  render={(props) =>
    usuarioAutenticado() && parseJwt().role === '1' ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  }
  />
);
const Permissaomed= ({ component : Component}) => (
  <Route 
  render={(props) =>
    usuarioAutenticado() && parseJwt().role === '3' ? (
      <Component {...props} />
    ) : (
      <Redirect to="/loginmed" />
    )
  }
  />
);


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login} />
        <Route path="/loginMed" component={LoginMed} />
        <Route path="/consultas" component={minhasConsultas} />
        <Permissaoadm path="/adm" component={Administracao}/>
        <Permissaoadm path="/localizacao" component={Map}/>
        <Route path="/notFound" component={notFound}/>
        <Permissaoadm path="/consultasadm" component={ConsultasAdm}/>
        <Permissaomed path="/medico" component={MinhasConsultasMed}/>
        <Redirect to="/notFound"/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
