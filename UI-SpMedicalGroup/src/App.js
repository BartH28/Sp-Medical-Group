import './App.css';
import Header from '../src/components/header/header'
import '../src/assets/css/home.css'
import { Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <main className="main_adm">
        <div class="main_container ">
          <div class="main_Selector"><Link to='/loginmed'> Login Medico </Link> </div>
          <div class="main_Selector"><Link to='/login'> Login Usuario</Link></div>
        </div>
      </main>

    </div>
  );
}

export default App;
