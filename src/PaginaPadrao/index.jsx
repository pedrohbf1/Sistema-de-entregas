import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Titulo from "../Componentes/Titulos";

const PaginaPadrao = () => {
    return (
        <>
            <HeaderEstilizada>
                <Logo src="/public/pauloLanchesTeste.webp" alt="" />
                <Menu>
                    <Titulo to="/" nome="Cadastrar entrega" />
                    <Titulo to="/entregasAberto" nome="Entregas em aberto" />
                    <Titulo to="/fluxoEntregas" nome="Fluxo de entregas" />
                    <Titulo to="/entregasEntregador" nome="Entregas por entregador" />
                </Menu>
            </HeaderEstilizada>

            <Centralizador>
                <Outlet />
            </Centralizador>
        </>
    );
};

const HeaderEstilizada = styled.header`
    width: 18%;
    min-height: 100vh;
    max-width: 100%;
    background-color: #17316e;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
`;

const Logo = styled.img`
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 20px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Centralizador = styled.main`
    display: flex;
    margin-top: 200px;
    flex-grow: 1;
    box-sizing: border-box;
    margin-right: 45px;
`;

export default PaginaPadrao;
