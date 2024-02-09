import styled from 'styled-components';

const ModalEntregue = ({setModalEntregue}) => {

  return (
    <ModalOverlay onClick={() => setModalEntregue(false)}>
      <ModalContainer>
        <ModalHeader>
          <h2>Entrega recebida</h2>
          <CloseButton onClick={() => setModalEntregue(false)}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          <p>O entregador já levou a entrega ao seu destino!</p>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.span`
  cursor: pointer;
  font-size: 20px;
  color: #aaa;
`;

const ModalContent = styled.div`
  margin-top: 10px;
`;

export default ModalEntregue;
