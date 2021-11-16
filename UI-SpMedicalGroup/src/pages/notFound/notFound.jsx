import Header from "../../components/header/header";
import '../../assets/css/notFound.css'

export default function notFound() {

    return (
        <div>
            <Header />
            <main className="main_notfound">
                <p className="p_notfound">Pagina não encontrada - ERRO 404</p>
            </main>
        </div>

    )

}