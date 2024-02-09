import { useState } from "react"
import styled from "styled-components"
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import appInitialize from "../../firebase";
import ModalEntregue from "../ModalEntregue";

const CadaEntregueAberta = ({ entrega, index, onModalEntregue, modalEntregue, setModalEntregue }) => {

    const db = getFirestore(appInitialize)

    async function marcarEntregaComoEntregue (entrega) {

        try {
          const entregaDoc = doc(db, "Entregas", entrega)
          await updateDoc(entregaDoc, {
            entregue: true
          })
          onModalEntregue()
        } catch (error) {
          alert("Erro ao marcar entrega como entregue. Abra o console para saber mais")
          console.log(error)
        }
      }
    
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

    return (
        <TableRow $isEven={index % 2 === 0 ? "true" : "false"}>
            <td>{entrega.dia}</td>
            <td>{`${entrega.rua}, ${entrega.numero}, ${entrega.bairro}`}</td>
            <td>{getFormattedPaymentMethod(entrega.formaPagamento)}</td>
            <td>R${entrega.valorCompra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>R${entrega.troco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>R${entrega.valorAReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>{entrega.entregador}</td>
            <td>
                <EntregueButton onClick={(e) => {e.preventDefault(), marcarEntregaComoEntregue(entrega.id)}}>Entregue</EntregueButton>
            </td>
            {modalEntregue && <ModalEntregue setModalEntregue={setModalEntregue} />}
        </TableRow>
    )
}

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

export default CadaEntregueAberta