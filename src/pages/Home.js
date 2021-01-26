import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { usersApi } from "../services/api";
import TopBar from "../components/TopBar";

function Home() {
  const apiUsers = [
    { id: 1, name: "João de Oliveira" },
    { id: 2, name: "Paulo Morais Arruda" },
  ];
  const apiDebt = [
    { id: 1, placeholder_id: 1, motivo: "Parcela 3 carro", valor: 199.99 },
    { id: 2, placeholder_id: 1, motivo: "Compra de imóvel", valor: 20000 },
    { id: 3, placeholder_id: 2, motivo: "Ida ao shopping", valor: 200 },
  ];
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState([]);
  // const response = await api.get(`/product/get-product-by-id/${id}`, {
  //   headers: {
  //     token: true,
  //   },
  // });

  async function findUsers() {
    const userApi = await usersApi.get("/users");
    console.log(userApi.data);
    setUsers(userApi.data);
  }

  function clickCardUser({ id, name }) {
    console.log("Id:" + id + "Cliente: " + name);
    setClient({ id: id, name: name });
  }

  function UsersList() {
    setUsers(apiUsers);
  }

  useEffect(() => {
    UsersList();
  }, []);
  return (
    <Main>
      <TopBar />
      <Wrapper>
        <Content>
          <DivPosition>
            <ListClients>
              <DivCardsBase>
                {users.map((item) => (
                  <DivCardContainer
                    onClick={() => clickCardUser(item)}
                    key={item.id}
                  >
                    <DivNameUser>
                      <SpanNameUser>{item.name}</SpanNameUser>
                    </DivNameUser>
                    <DivButton>
                      <ButtonUpdate>Up</ButtonUpdate>
                      <ButtonRemove>Re</ButtonRemove>
                    </DivButton>
                  </DivCardContainer>
                ))}
              </DivCardsBase>
            </ListClients>
            <Operation>
              <DivFlexOperation>
                <DivDicaForm>
                  <span style={{ fontSize: 30 }}>
                    Clique no card ao lado para selecionar um cliente!
                  </span>
                </DivDicaForm>
                <DivBaseSelectTop2 style={{ background: "#E8FFE3" }}>
                  <DivInputs>
                    <Input
                      placeholder="Nome cliente"
                      type="text"
                      name="valor_desejado"
                      value={client.name}
                      disabled={true}
                    />
                  </DivInputs>
                </DivBaseSelectTop2>
                <DivBaseResults>
                  <SpanDividasCliente>
                    Gerenciamneto de Dividas
                  </SpanDividasCliente>
                </DivBaseResults>
                <DivBaseResults>
                  <DivInputs>
                    <DivAlignInput>
                      <SpanTitleInput>Motivo:</SpanTitleInput>
                      <Input
                        placeholder="Informe o motivo"
                        type="text"
                        name="valor_desejado"
                        value={client.name}
                        disabled={false}
                      />
                    </DivAlignInput>

                    <DivAlignInput>
                      <SpanTitleInput2>Valor:</SpanTitleInput2>
                      <Input
                        placeholder="Informe o valor"
                        type="text"
                        name="valor_desejado"
                        value={client.name}
                        disabled={false}
                      />
                    </DivAlignInput>
                    <DivContainerButtom>
                      <DivButtomAdd>
                        <ButtonValorDesejado onClick={() => {}}>
                          <SpanButtonValorDesejado>
                            Adicionar
                          </SpanButtonValorDesejado>
                        </ButtonValorDesejado>
                      </DivButtomAdd>
                      <DivButtomCancel>
                        <ButtonValorDesejado onClick={() => {}}>
                          <SpanButtonValorDesejado>
                            Cancelar
                          </SpanButtonValorDesejado>
                        </ButtonValorDesejado>
                      </DivButtomCancel>
                    </DivContainerButtom>
                    <DivDividasCliente>
                      <SpanDividasCliente>
                        Dividas do cliente
                      </SpanDividasCliente>
                    </DivDividasCliente>
                    <DivCardsDebt>
                      <DivCardContainer onClick={() => clickCardUser(0)}>
                        <DivNameUser>
                          <SpanNameUser>Motivo: Compra do carro</SpanNameUser>
                        </DivNameUser>
                        <DivNameUser>
                          <SpanNameUser>Valor: 20000</SpanNameUser>
                        </DivNameUser>
                        <DivButton>
                          <ButtonUpdate>Up</ButtonUpdate>
                          <ButtonRemove>Re</ButtonRemove>
                        </DivButton>
                      </DivCardContainer>
                    </DivCardsDebt>
                  </DivInputs>
                </DivBaseResults>
              </DivFlexOperation>
            </Operation>
          </DivPosition>
        </Content>
      </Wrapper>
    </Main>
  );
}

const Main = styled.main`
  display: grid;
`;
const Wrapper = styled.div`
  width: 100%;
  justify-content: center;
  background: #f3f3f3;
  display: grid;
  align-items: center;
`;
const Content = styled.div`
  width: 1280px;
  background: blue;
  @media (min-width: 576px) {
    width: 576px;
  }
  @media (min-width: 768px) {
    width: 768px;
  }
  @media (min-width: 1200px) {
    width: 1280px;
  }
`;
const DivPosition = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: flex-start;
`;
const DivCardsBase = styled.div`
  width: 100%;
  display: grid;
  margin: 10px 10px 0 10px;
`;
const DivCardsDebt = styled.div`
  width: 100%;
  display: grid;
  margin: 0 0 10px 0;
`;
const ListClients = styled.div`
  width: 100%;
  justify-content: center;
  background: green;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Operation = styled.div`
  width: 100%;
  justify-content: center;
  background: brown;
  display: flex;
  align-items: center;
`;
const DivCardContainer = styled.div`
  cursor: pointer;
  width: 100%;
  height: 50px;
  background: pink;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DivNameUser = styled.div`
  margin-left: 10px;
`;
const SpanNameUser = styled.span``;
const DivButton = styled.div`
  margin-right: 10px;
`;
const ButtonUpdate = styled.button``;
const ButtonRemove = styled.button``;

const DivBaseSelectTop2 = styled.div`
  width: 100%;
  background: var(--unnamed-color-f8f8f8);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  /* width: 550px; */
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DivInputs = styled.div`
  width: 100%;
  align-items: center;
  display: grid;
  height: 96;
  margin-right: 20px;
  /* margin-bottom: 20px; */
  padding: 20px 0 0 20px;
`;

const Input = styled.input`
  font: var(--unnamed-font-style-italic) var(--unnamed-font-weight-bold) 18px/24px
    var(--unnamed-font-family-flexo);

  color: var(--unnamed-color-ef9c4b);
  text-align: center;
  border-width: 0px;
  border: none;
  box-shadow: none;
  outline: none !important;
  background: var(--unnamed-color-ffffff);

  width: 100%;
  height: 60px;
  border-radius: 5px;
  /* margin: 10px 0  10px 0; */
  /* padding: 0 20px 0 20px; */
  margin-bottom: 20px;
`;
const DivBaseResults = styled.div`
  justify-content: center;
  display: flex;
`;
const DivButtomAdd = styled.div`
  width: 100%;
  margin-right: 5px;
  @media (max-width: 575px) {
    /* width: 400px; */
    justify-content: center;
    display: flex;
    margin-top: 20px;
  }
`;
const DivButtomCancel = styled.div`
  width: 100%;
  margin-left: 5px;
  @media (max-width: 575px) {
    /* width: 400px; */
    justify-content: center;
    display: flex;
    margin-top: 20px;
  }
`;
const ButtonValorDesejado = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--unnamed-color-ef9c4b) 0% 0% no-repeat padding-box;
  border-radius: 5px;
  cursor: pointer;
`;
const SpanButtonValorDesejado = styled.span`
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    22px/30px var(--unnamed-font-family-flexo);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);
`;
const SpanDividasCliente = styled.span`
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    22px/30px var(--unnamed-font-family-flexo);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);
`;
const SpanTitleInput = styled.span`
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/30px var(--unnamed-font-family-flexo);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);

  width: 60px;
  margin: auto 10px auto 10px;
`;
const SpanTitleInput2 = styled.span`
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/30px var(--unnamed-font-family-flexo);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);

  width: 68px;
  margin: auto 10px auto 10px;
`;
const DivFlexOperation = styled.div`
  width: 100%;
  display: grid;
`;
const DivDicaForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const DivAlignInput = styled.div`
  background: red;
  display: flex;
  height: 62px;
  margin-bottom: 20px;
`;
const DivDividasCliente = styled.div`
  justify-content: center;
  display: flex;
  margin: 10px auto 10px auto;
`;
const DivContainerButtom = styled.div`
  display: flex;
  @media(max-width: 500px) {
    display: grid;
    /* width: 400px;  */
  }
`;

export default Home;
