import Header from "../../components/header/header";
import "../../assets/css/admS.css";
import { Link } from "react-router-dom";
// import "../../assets/css/reset.css";


export default function Administracao() {
    return (
        <div>
            <Header />
            <main className="main_adm">
                <div class="main_container ">
                    
                    <div class="main_Selector"><Link to='/consultasadm'> Consultas </Link> </div>
                    <div class="main_Selector">Usuarios</div>
                </div>
                <div class="main_container ">
                    <div class="main_Selector">Clinicas</div>
                    <div class="main_Selector">Endereços</div>
                </div>

            </main>

        </div>
    )
}