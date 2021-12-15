import './App.css';
// import Header from '../src/components/header/header'
import '../src/assets/css/home.css'
import { Link } from "react-router-dom";

import imgForm from '../src/assets/img/logo_spmedgroup_v1 2.png'

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <main className="main_adm">
      <img className="logo-app" src={imgForm} alt="logo sp medical group" />
      <span className="BemVindo">Bem-Vindo ao Sp Medical Group</span>
        <div class="main_container ">
          <div class="main_Selector"><Link to='/loginmed'> Login Medico </Link> </div>
          <div class="main_Selector"><Link to='/login'> Login Usuario</Link></div>
        </div>
      </main>

    </div>
  );
}

export default App;
