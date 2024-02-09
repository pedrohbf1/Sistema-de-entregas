import { Link, useLocation } from "react-router-dom"
import styles from './titulo.module.css'

const Titulo = ({to, nome}) => {

    const navigate = useLocation()

    return (
        <div>
            <Link className={`
                ${styles.titulo}
                ${navigate.pathname === to ? styles.tituloDestacado : ""}
            `} to={to}>
                {nome}
            </Link>
        </div>
    )
}

export default Titulo