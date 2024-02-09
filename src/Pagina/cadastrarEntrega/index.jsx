import React, { useState } from "react";
import styled from "styled-components";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import appInitialize from '../../firebase.js'
import ModalEntregaCadastrada from "../../Componentes/ModalEntregaCadastrada/index.jsx";

const CadastrarEntrega = ({ setAtualizarDados }) => {
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [valorCompra, setValorCompra] = useState(0);
  const [entregador, setEntregador] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [trocoPara, setTrocoPara] = useState(0);
  const [troco, setTroco] = useState(0);

  const [exibirBotao, setExibirBotao] = useState(false)

  const [campoIncompleto, setCampoIncompleto] = useState(false)
  const [entregaCadastrada, setEntregaCadastrada] = useState(false)

  const formasPagamento = [
    { id: "dinheiro", label: "Dinheiro" },
    { id: "pix", label: "Pix" },
    { id: "cartao", label: "Cartão" },
    { id: "pagoNaLanchonete", label: "Pago na Lanchonete" },
  ];

  const db = getFirestore(appInitialize)
  const userCollectionRef = collection(db, "Entregas")

  const handleFormaPagamentoChange = (id) => {
    setFormaPagamento(id);
  };

  const calcularTroco = (e) => {
    e.preventDefault()

    const trocoParaConvertido = trocoPara.replace(/,/g, '.');
    const valorCompraConvertido = valorCompra.replace(/,/g, '.')

    setTroco(trocoParaConvertido - valorCompraConvertido);
    setExibirBotao(true)
  };

  function aceitarApenasNumeros (numero) {
    const valorNumerico = numero.replace(/[^\d]/g, '');
    setNumero(valorNumerico)
  }

  function aceitarApenasNumerosEVirgula(valor, set) {

    const valorNumerico = valor.replace(/[^\d,]/g, '');
  
    const valorComUmaVirgula = valorNumerico.replace(/,+/g, ',');
    
    set(valorComUmaVirgula)
    
  }
  
    const hoje = new Date();

    
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + 1; 
    const dia = hoje.getDate();
    const horas = hoje.getHours();
    const minutos = hoje.getMinutes();
    const segundos = hoje.getSeconds();

    const dataFormatada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano} ${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;

    async function cadastrarEntrega (e) {
      e.preventDefault()

      try {
          if (rua == "" || bairro == "" || numero == "" || valorCompra == 0 || formaPagamento == "" || entregador == "") {
              setCampoIncompleto(true)
          } else {
            const entrega = await addDoc(userCollectionRef, {
                dia: dataFormatada,
                rua: rua,
                bairro: bairro,
                numero: numero,
                valorCompra: valorCompra,
                entregador: entregador,
                formaPagamento: formaPagamento,
                valorAReceber: troco,
                troco: trocoPara,
                entregue: false
            })
            console.log(entrega)
            setCampoIncompleto(false)
            setEntregaCadastrada(true)
            setRua("")
            setNumero("")
            setBairro("")
            setValorCompra(0)
            setEntregador("")
            setFormaPagamento("")
            setTrocoPara(0)
            setTroco(0)
            setExibirBotao(false)
          }
      } catch(error) {
          console.log("Erro ao cadastrar a entrega", error)
          alert("Erro ao registrar a entrega.")
      }
    }

  return (
    <Container>
      <Titulo>Cadastrar Entregas</Titulo>
      <Formulario>
        <CampoTriplo>
          <CampoRua>
            <Label htmlFor="rua">Rua</Label>
            <Input
              type="text"
              id="rua"
              placeholder="Insira a rua..."
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </CampoRua>

          <CampoBairro>
            <Label htmlFor="bairro">Bairro</Label>
            <Input
              type="text"
              id="bairro"
              placeholder="Insira o bairro..."
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </CampoBairro>

          <CampoNumero>
            <Label htmlFor="numero">Número</Label>
            <InputNumerico
              type="text"
              id="numero"
              placeholder="Insira o número..."
              value={numero}
              onChange={(e) => aceitarApenasNumeros(e.target.value)}
            />
          </CampoNumero>
        </CampoTriplo>

        <CampoTriploEspacado>
          <Campo>
            <Label htmlFor="valorTotal">Valor total da compra</Label>
            <DivInput>
              <Simbolo>R$</Simbolo>
              <InputNumerico
                type="text"
                id="valorTotal"
                value={valorCompra}
                onChange={(e) => aceitarApenasNumerosEVirgula(e.target.value, setValorCompra)}
              />
            </DivInput>
          </Campo>

          <Campo style={{ alignItems: "center" }}>
            <Label>Forma de Pagamento</Label>
            <OpcoesFormaPagamento>
                {formasPagamento.map((forma) => (
                    <DivFormaDePagamento
                    key={forma.label}
                    onClick={() => handleFormaPagamentoChange(forma.id)}
                    selecionado={formaPagamento === forma.id ? 'true' : 'false'} // Corrigido aqui
                    >
                    {forma.label}
                    </DivFormaDePagamento>
                ))}
            </OpcoesFormaPagamento>
          </Campo>

          <Campo style={{ width: "20%" }}>
            <Label htmlFor="entregador">Entregador</Label>
            <Input
              type="text"
              id="entregador"
              placeholder="Digite o nome do entregador..."
              value={entregador}
              onChange={(e) => setEntregador(e.target.value)}
            />
          </Campo>
        </CampoTriploEspacado>

        {formaPagamento !== "dinheiro" ? (
          <Botao type="submit" onClick={(e) => cadastrarEntrega(e)} >Cadastrar</Botao>
        ) : (
            <>
                <CampoTriploEspacado style={{justifyContent: "space-around" }}>
                    <Campo style={{alignItems: "center"}}>
                        <Label htmlFor="trocoPara">Troco para...</Label>
                        <section>
                            <Input
                            type="text"
                            id="trocoPara"
                            placeholder="Digite o valor..."
                            value={trocoPara}
                            onChange={(e) => aceitarApenasNumerosEVirgula(e.target.value, setTrocoPara)}
                            style={{width: "100%", marginBottom: "10px"}}
                            />
                            <CalculateButton onClick={(e) => calcularTroco(e)}>Calcular</CalculateButton>
                        </section>
                    </Campo>
                    {troco !== 0 && (
                    <Subtitle>O troco a receber é R${troco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Subtitle>
                    )}
                </CampoTriploEspacado>
                    {exibirBotao && <Botao type="submit" onClick={(e) => cadastrarEntrega(e)} >Cadastrar</Botao>}
                </>
            )
        }
        {campoIncompleto && <p style={{textAlign: "center", color: "red", marginTop: "10px"}}>Preencha todos os campos</p>}
        </Formulario>
        {entregaCadastrada && <ModalEntregaCadastrada setEntregaCadastrada={setEntregaCadastrada} />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
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
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid #17316e;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const CampoTriplo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  @media (max-width: 1040px) {
    display: flex;
    flex-direction: column;
  }
`;

const CampoTriploEspacado = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
  @media (max-width: 1040px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`;

const CampoNumero = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 120px;
  margin-right: 8px;
`;

const CampoRua = styled.div`
  flex: 40%;
  display: flex;
  flex-direction: column;
`;

const CampoBairro = styled.div`
  flex: 30%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const DivInput = styled.div`
  display: flex;
  align-items: center;
`;

const Simbolo = styled.span`
  font-size: 18px;
  margin-right: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const InputNumerico = styled(Input)`
  text-align: right;
`;

const OpcoesFormaPagamento = styled.div`
  display: flex;
  gap: 15px;
`;

const DivFormaDePagamento = styled.div`
  padding: 20px;
  border: 1px solid #17316e;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${(props) => (props.selecionado === 'true' ? "#17316e" : "#fff")};
  color: ${(props) => (props.selecionado === 'true' ? "#fff" : "#17316e")};
`;

const Botao = styled.button`
  width: 100%;
  background-color: #17316e;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0d2249;
  }
`;

const CalculateButton = styled.button`
  background-color: #17316e;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0d1b3a;
  }
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 16px;
  margin-bottom: 15px;
`;

export default CadastrarEntrega;

