import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { usersApi, apiDivida } from "../services/api";
import TopBar from "../components/TopBar";

import { FaPen, FaTrash } from "react-icons/fa";

function Home() {
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState({ id: 0, name: "" });
  const [motive, setMotive] = useState("");
  const [amount, setAmount] = useState("");
  const [divida, setDivida] = useState([]);
  const [userDebt, setUserDebt] = useState([]);
  const [loading, setLoading] = useState(true);
  // const response = await api.get(`/product/get-product-by-id/${id}`, {
  //   headers: {
  //     token: true,
  //   },
  // });

  function getDate(date) {
    let full_date = date;
    let day = full_date.substring(8, 10);
    let mouth = full_date.substring(5, 7);
    let year = full_date.substring(0, 4);
    let dateDivida = day + "-" + mouth + "-" + year;
    return dateDivida;
  }

  async function findUsers() {
    const userApi = await usersApi.get("/users");
    // console.log(userApi.data);
    setUsers(userApi.data);
    const dividaApi = await apiDivida.get(
      `/divida?uuid=4fc7ccbd-97d0-4a84-a06e-a436aee00403`
    );
    setDivida(dividaApi.data.result);
    console.log(dividaApi.data.result);
  }

  async function clickCardUser({ id, name }) {
    console.log("Id:" + id + "Cliente: " + name);
    setClient({ id: id, name: name });

    const dividasUser = divida.filter((item) => {
      return item.idUsuario === id;
    });
    setUserDebt(dividasUser);
    if (dividasUser.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    // setLoading(false);
    // dividasUser.length > 0 ? setLoading(false) : setLoading(true);

    console.log("Dividas do usuário!");
    console.log(dividasUser);

    // const dividaApi = await apiDivida.get(`/dividas/${id}`);
    // const dividaApi = await apiDivida.get(
    //   `/divida?uuid=4fc7ccbd-97d0-4a84-a06e-a436aee00403`
    // );
    // console.log(dividaApi.data);
  }

  async function addDebt() {
    let body = {
      idUsuario: client.id,
      motivo: motive,
      valor: amount,
    };
    const addDebt = await apiDivida.post(
      `/divida?uuid=4fc7ccbd-97d0-4a84-a06e-a436aee00403`,
      body
    );

    const dividaApi = await apiDivida.get(
      `/divida?uuid=4fc7ccbd-97d0-4a84-a06e-a436aee00403`
    );
    const dividasUser = dividaApi.data.result.filter((item) => {
      return item.idUsuario === client.id;
    });
    setUserDebt(dividasUser);
    console.log("Array com tds as dividas");
    console.log(dividaApi.data.result);
  }

  async function removeDebt(id) {
    const addDebt = await apiDivida.delete(
      `/divida/${id}?uuid=4fc7ccbd-97d0-4a84-a06e-a436aee00403`
    );

    const dividasUser = userDebt.filter((item) => {
      return item._id !== id;
    });
    setUserDebt([dividasUser]);
  }

  function handleClickMotive(e) {
    setMotive(e.target.value);
    // console.log(e.target.value);
  }

  function handleClickAmount(e) {
    setAmount(e.target.value);
    // console.log(e.target.value);
  }

  useEffect(() => {
    findUsers();
  }, []);
  return (
    <Main>
      <TopBar />
      <Wrapper>
        <Content>
          <DivPosition>
            <ListClients>
              <DivCardsBase>
                <div style={{ width: "100%", marginBottom: 10 }}>
                  Nossos Clientes
                </div>
                {users.map((item) => (
                  <DivCardContainer
                    onClick={() => clickCardUser(item)}
                    key={item.id}
                  >
                    <DivNameUser>
                      <SpanNameUser>{item.name}</SpanNameUser>
                    </DivNameUser>
                    {/* <DivButton>
                      <ButtonUpdate>Up</ButtonUpdate>
                      <ButtonRemove>Re</ButtonRemove>
                    </DivButton> */}
                  </DivCardContainer>
                ))}
              </DivCardsBase>
            </ListClients>
            <Operation>
              <DivFlexOperation>
                <DivDicaForm>
                  <SpanDicaUso>
                    Clique no card ao lado para selecionar um cliente!
                  </SpanDicaUso>
                </DivDicaForm>
                <DivBaseSelectTop2 style={{ background: "#228A95" }}>
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
                    Gerenciamento de Dividas
                  </SpanDividasCliente>
                </DivBaseResults>
                <DivBaseResults>
                  <DivInputs>
                    <DivAlignInput>
                      <SpanTitleInput>Motivo:</SpanTitleInput>
                      <Input
                        placeholder="Informe o motivo"
                        type="text"
                        // name="valor_desejado"
                        onChange={handleClickMotive}
                        value={motive}
                        disabled={false}
                      />
                    </DivAlignInput>

                    <DivAlignInput>
                      <SpanTitleInput2>Valor:</SpanTitleInput2>
                      <Input
                        placeholder="Informe o valor"
                        type="text"
                        // name="valor_desejado"
                        onChange={handleClickAmount}
                        value={amount}
                        disabled={false}
                      />
                    </DivAlignInput>
                    <DivContainerButtom>
                      <DivButtomAdd>
                        <ButtonValorDesejado onClick={addDebt}>
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
                    {loading === false ? (
                      <>
                        <DivDividasCliente>
                          <SpanDividasCliente>
                            Dividas do cliente
                          </SpanDividasCliente>
                        </DivDividasCliente>
                        <DivCardsDebt>
                          {userDebt.map((item) => (
                            <DivCardContainerDebt key={item._id}>
                              <div style={{ display: "grid" }}>
                                <DivNameUser>
                                  <SpanNameUser>
                                    Data: {getDate(item.criado)}
                                  </SpanNameUser>
                                </DivNameUser>
                                <DivNameUser>
                                  <SpanNameUser>
                                    Motivo: {item.motivo}
                                  </SpanNameUser>
                                </DivNameUser>
                                <DivNameUser>
                                  <SpanNameUser>
                                    Valor: {item.valor}
                                  </SpanNameUser>
                                </DivNameUser>
                              </div>
                              <DivButton>
                                <ButtonUpdate onClick={() => alert(item._id)}>
                                  <FaPen size={18} color={"#f8f8f8"} />
                                </ButtonUpdate>
                                <ButtonRemove
                                  onClick={() => removeDebt(item._id)}
                                >
                                  <FaTrash size={18} color={"#FF0000"} />
                                </ButtonRemove>
                              </DivButton>
                            </DivCardContainerDebt>
                          ))}
                        </DivCardsDebt>
                      </>
                    ) : (
                      <></>
                    )}
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
  background: #ffffff;
  display: grid;
  align-items: center;
`;
const Content = styled.div`
  width: 1280px;
  background: #ffffff;
  margin-top: 10px;
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
  margin: 0 10px 0 10px;
`;
const DivCardsDebt = styled.div`
  width: 100%;
  display: grid;
  margin: 0 0 10px 0;
`;
const ListClients = styled.div`
  width: 100%;
  justify-content: center;
  background: #ffffff;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Operation = styled.div`
  width: 100%;
  justify-content: center;
  background: #228a95;
  display: flex;
  align-items: center;
`;
const DivCardContainer = styled.div`
  cursor: pointer;
  width: 100%;
  height: 50px;
  background: var(--unnamed-color-ef9c4b);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 5px;
`;
const DivCardContainerDebt = styled.div`
  cursor: pointer;
  width: 100%;
  /* height: 50px;s */
  background: var(--unnamed-color-ef9c4b);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const DivNameUser = styled.div`
  margin-left: 10px;
`;
const SpanNameUser = styled.span`
  color: #4f4f4f;
  font: var(--unnamed-font-style-italic) var(--unnamed-font-weight-bold) 18px/24px
    var(--unnamed-font-family-flexo);
`;
const DivButton = styled.div`
  margin-right: 10px;
  display: flex;
`;
const ButtonUpdate = styled.div`
  margin: auto 5px auto 5px;
  display: flex;
`;
const ButtonRemove = styled.div`
  margin: auto 5px auto 5px;
  display: flex;
`;

const DivBaseSelectTop2 = styled.div`
  width: 100%;
  background: var(--unnamed-color-f8f8f8);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  /* width: 550px; */
  justify-content: space-between;
  /* margin-bottom: 20px; */
`;

const DivInputs = styled.div`
  width: 100%;
  align-items: center;
  display: grid;
  height: 96;
  margin-right: 20px;
  /* margin-bottom: 20px; */
  padding: 10px 0 0 20px;
`;

const Input = styled.input`
  font: var(--unnamed-font-style-italic) var(--unnamed-font-weight-bold) 18px/24px
    var(--unnamed-font-family-flexo);

  color: var(--unnamed-color-4f4f4f);
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
  margin-top: 10px;
`;
const DivAlignInput = styled.div`
  background: var(--unnamed-color-ef9c4b);
  display: flex;
  height: 62px;
  margin-bottom: 20px;
  border-radius: 5px;
`;
const DivDividasCliente = styled.div`
  justify-content: center;
  display: flex;
  margin: 0 auto 10px auto;
`;
const DivContainerButtom = styled.div`
  display: flex;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    display: grid;
    /* width: 400px;  */
  }
`;
const SpanDicaUso = styled.span`
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    22px/30px var(--unnamed-font-family-flexo);
  color: #ffffff;
  @media (max-width: 500px) {
    /* display: grid; */
    /* width: 400px;  */
  }
`;

export default Home;
