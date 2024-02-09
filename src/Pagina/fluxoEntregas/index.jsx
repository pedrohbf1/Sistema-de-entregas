import styled from "styled-components";
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import appInitialize from "../../firebase";
import { useEffect, useState } from "react";
import CadaEntregueAberta from "../../Componentes/CadaEntregaAberta";

const FluxoEntregas = () => {
  const db = getFirestore(appInitialize);
  const userCollectionRef = collection(db, "Entregas");

  const [todasEntregas, setTodasEntregas] = useState([]);

  const [selecionarDia, setSelecionarDia] = useState("hoje")

  const getFormattedPaymentMethod = (method) => {
    switch (method) {
      case "dinheiro":
        return "Dinheiro";
      case "cartao":
        return "Cartão";
      case "pagoNaLanchonete":
        return "Pago na lanchonete";
      case "pix":
        return "Pix";
      default:
        return "";
    }
  };

  const getDataComBaseNaOpcao = (opcao) => {
    const hoje = new Date();

    switch (opcao) {
      case 'hoje':
        const ultimas24Horas = new Date();
        ultimas24Horas.setHours(ultimas24Horas.getHours() - 24);
        return ultimas24Horas;

      case 'semana':
        const semanaAtras = new Date();
        semanaAtras.setDate(hoje.getDate() - 7);
        return semanaAtras;

      case 'mes':
        const mesAtras = new Date();
        mesAtras.setDate(hoje.getDate() - 30);
        return mesAtras;

      case 'ano':
        const anoAtras = new Date();
        anoAtras.setDate(hoje.getDate() - 365);
        return anoAtras;

      default:
        return null;
    }
  };

  const formatarData = (data) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const dataOpcao = getDataComBaseNaOpcao(selecionarDia);
        const todasEntregas = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => {
            const dataA = new Date(formatarData(a.dia));
            const dataB = new Date(formatarData(b.dia));
            return dataB - dataA;
          })
          .filter((entrega) => {
            const dataEntrega = formatarData(entrega.dia)
            const dataModificada = new Date(dataEntrega)
            
            return dataModificada >= dataOpcao
          })
          .filter((entrega) => {
            return entrega.entregue === true
          })
           
        setTodasEntregas(todasEntregas);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    getUsers();
  }, [selecionarDia]);

  return (
    <Container>
      <Titulo>Fluxo de entregas</Titulo>
      <Formulario>
        <SelecionarDia>
            <h3>Selecione o dia:</h3>
            <SelectStyled onChange={(e) => setSelecionarDia(e.target.value)}>
                <option value="hoje">Hoje</option>
                <option value="semana">Últimos 7 dias</option>
                <option value="mes">Último mês</option>
                <option value="ano">Último ano</option>
            </SelectStyled>
        </SelecionarDia>
        <TabelaContainer>
          <Tabela>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Endereço</th>
                <th>Pagamento</th>
                <th>Valor da compra</th>
                <th>Entregador</th>
              </tr>
            </thead>
            <tbody>
              {todasEntregas &&
                todasEntregas.map((entrega, index) => (
                    <TableRow key={entrega.id} $isEven={index % 2 === 0 ? "true" : "false"}>
                        <td>{entrega.dia} {entrega.horario}</td>
                        <td>{`${entrega.rua}, ${entrega.numero}, ${entrega.bairro}`}</td>
                        <td>{getFormattedPaymentMethod(entrega.formaPagamento)}</td>
                        <td>R${entrega.valorCompra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td>{entrega.entregador}</td>
                    </TableRow>
                ))}
            </tbody>
          </Tabela>
        </TabelaContainer>
      </Formulario>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: -125px;
`;

const Titulo = styled.h1`
  background-color: #17316e;
  color: #fff;
  padding: 20px;
  margin: 0;
  font-size: 24px;
  text-align: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const Formulario = styled.form`
  width: 100%;
  max-height: 500px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid #17316e;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow-y: auto;
`;

const TabelaContainer = styled.div`
  overflow-y: auto;
`;

const Tabela = styled.table`
  width: 100%;

  th,
  td {
    border: 1px solid #17316e;
    padding: 12px;
    text-align: left;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #17316e;
    color: #fff;
  }

  th:nth-child(1) {
    width: 13%;
  }

  th:nth-child(2) {
    width: 28%;
  }

  th:nth-child(3) {
    width: 14%;
  }

  th:nth-child(4),
  th:nth-child(5),
  th:nth-child(6) {
    width: 10%;
  }

  th:nth-child(7) {
    width: 13%;
  }

  th:nth-child(8) {
    width: 13%;
  }
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.$isEven === "true" ? "#fff" : "#F2F2F2")};

  td {
    border: 1px solid #17316e;
    padding: 12px;
    text-align: left;
  }

  td:nth-child(1) {
    width: 12%;
  }

  td:nth-child(2) {
    width: 28%;
  }

  td:nth-child(3) {
    width: 14%;
  }

  td:nth-child(4),
  td:nth-child(5),
  td:nth-child(6) {
    width: 10%;
  }

  td:nth-child(7) {
    width: 13%;
  }

  td:nth-child(8) {
    width: 13%;
  }
`;

const SelecionarDia = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;

  h3 {
    color: #17316e;
    margin: 0;
  }

  select {
    margin-top: 5px;
    padding: 5px;
    font-size: 18px;
    border: 1px solid #17316e;
    border-radius: 3px;
  }
`;

const SelectStyled = styled.select`
  margin-top: 5px;
  padding: 5px;
  font-size: 18px;
  border: 1px solid #17316e;
  border-radius: 3px;
`;




export default FluxoEntregas;
