import styled from "styled-components";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import appInitialize from "../../firebase";
import { useEffect, useState } from "react";
import ModalEntregue from "../../Componentes/ModalEntregue";
import CadaEntregueAberta from "../../Componentes/CadaEntregaAberta";

const EntregasAberto = () => {
  const db = getFirestore(appInitialize);
  const userCollectionRef = collection(db, "Entregas");

  const [todasEntregas, setTodasEntregas] = useState([]);

  const [modalEntregue, setModalEntregue] = useState(false);
  
  useEffect(() => {
    const pegarEntregas = async () => {
      const data = await getDocs(userCollectionRef);
      const entregasOrdenadas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => (a.dia < b.dia ? 1 : -1)).filter((entrega) => entrega.entregue === false)
      setTodasEntregas(entregasOrdenadas);
    };
    pegarEntregas();
  }, [modalEntregue]);


  const handleModalEntregue = () => {
    setModalEntregue(true);
  };

  return (
    <Container>
      <Titulo>Entregas em Aberto</Titulo>
      <Formulario>
        <TabelaContainer>
          <Tabela>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Endereço</th>
                <th>Pagamento</th>
                <th>Valor da compra</th>
                <th>Troco</th>
                <th>Valor à receber</th>
                <th>Entregador</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todasEntregas &&
                todasEntregas.map((entrega, index) => (
                  <CadaEntregueAberta 
                    key={entrega.id} 
                    entrega={entrega}
                    index={index}
                    onModalEntregue={handleModalEntregue} 
                    modalEntregue={modalEntregue}
                    setModalEntregue={setModalEntregue}
                  />
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
  background-color: ${(props) => (props.isEven === "true" ? "#fff" : "#F2F2F2")};

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

const EntregueButton = styled.button`
  background-color: #17316e;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    background-color: #214581; 
    transform: scale(1.1);
  }
`;




export default EntregasAberto;
