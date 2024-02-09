import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import PaginaPadrao from "./PaginaPadrao"
import CadastrarEntrega from "./Pagina/cadastrarEntrega"
import EntregasAberto from "./Pagina/entregasAberto"
import FluxoEntregas from "./Pagina/fluxoEntregas"
import EntregasPorEntregador from "./Pagina/entregasPorEntregador"

function App() {

  return (
    <MainEstilizada>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaPadrao />}>
            <Route index element={<CadastrarEntrega  />} />
            <Route path="/entregasAberto" element={<EntregasAberto />} />
            <Route path="/fluxoEntregas" element={<FluxoEntregas />} />
            <Route path="/entregasEntregador" element={<EntregasPorEntregador />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainEstilizada>
  )
}

const MainEstilizada = styled.main`
  width: 100%;
  display: flex;
  gap: 45px;
`

export default App
