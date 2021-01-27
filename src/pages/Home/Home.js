import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { usersApi, apiDivida } from "../../services/api";
import TopBar from "../../components/TopBar";

import { FaPen, FaTrash } from "react-icons/fa";

function Home() {
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState({ id: 0, name: "" });
  const [motive, setMotive] = useState("");
  const [amount, setAmount] = useState("");
  // const [divida, setDivida] = useState([]);
  const [userDebt, setUserDebt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState("POST");
  const [_id, set_Id] = useState(0);

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
    setUsers(userApi.data);
    await apiDivida.get(`/divida?uuid=${process.env.REACT_APP_KEY}`);
  }

  async function clickCardUser({ id, name }) {
    setClient({ id: id, name: name });
    setMotive("");
    setAmount("");

    const dividaApi = await apiDivida.get(
      `/divida?uuid=${process.env.REACT_APP_KEY}`
    );

    const div = dividaApi.data.result;

    const dividasUser = div.filter((item) => {
      return item.idUsuario === id;
    });
    setOption("POST");
    setUserDebt(dividasUser);
    if (dividasUser.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }

  async function addDebt() {
    let body = {
      idUsuario: client.id,
      motivo: motive,
      valor: amount,
    };
    await apiDivida.post(`/divida?uuid=${process.env.REACT_APP_KEY}`, body);

    const dividaApi = await apiDivida.get(
      `/divida?uuid=${process.env.REACT_APP_KEY}`
    );
    const dividasUser = dividaApi.data.result.filter((item) => {
      return item.idUsuario === client.id;
    });
    setLoading(false);
    setUserDebt(dividasUser);
    setMotive("");
    setAmount("");
  }

  async function removeDebt(item) {
    await apiDivida.delete(
      `/divida/${item._id}?uuid=${process.env.REACT_APP_KEY}`
    );

    const dividasUser = userDebt.filter((el) => {
      return el._id !== item._id;
    });

    setUserDebt(dividasUser);
  }

  function handleClickMotive(e) {
    setMotive(e.target.value);
  }

  function handleClickAmount(e) {
    setAmount(e.target.value);
  }

  function cancel() {
    setOption("POST");
    setMotive("");
    setAmount("");
  }

  function handleUpdate(item) {
    setOption("UPDATE");
    set_Id(item._id);
    setMotive(item.motivo);
    setAmount(item.valor);
  }

  async function update() {
    let body = {
      idUsuario: client.id,
      motivo: motive,
      valor: amount,
    };
    await apiDivida.put(
      `/divida/${_id}?uuid=${process.env.REACT_APP_KEY}`,
      body
    );

    let newUpdateDebt = userDebt.filter((item) => {
      return item._id === _id;
    });

    let newUpdateDebt2 = userDebt.filter((item) => {
      return item._id !== _id;
    });

    const { idUsuario, criado } = newUpdateDebt[0];

    let newUp = {
      _id: _id,
      idUsuario: idUsuario,
      criado: criado,
      motivo: motive,
      valor: amount,
    };

    newUpdateDebt2.push(newUp);
    setUserDebt(newUpdateDebt2);
    setOption("POST");
    setMotive("");
    setAmount("");
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
                <SpanTitleTableCliente>Nossos Clientes</SpanTitleTableCliente>
                {users.map((item) => (
                  <DivCardContainer
                    onClick={() => clickCardUser(item)}
                    key={item.id}
                  >
                    <DivNameUser>
                      <SpanNameUser>{item.name}</SpanNameUser>
                    </DivNameUser>
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
                        onChange={handleClickMotive}
                        value={motive}
                        disabled={client.id !== 0 ? false : true}
                      />
                    </DivAlignInput>

                    <DivAlignInput>
                      <SpanTitleInput2>Valor:</SpanTitleInput2>
                      <Input
                        placeholder="Informe o valor"
                        type="text"
                        onChange={handleClickAmount}
                        value={amount}
                        disabled={client.id !== 0 ? false : true}
                      />
                    </DivAlignInput>
                    <DivContainerButtom>
                      {option === "POST" ? (
                        motive && amount !== "" ? (
                          <DivButtomAdd>
                            <ButtonAddActive onClick={addDebt}>
                              <SpanButtonValorDesejado>
                                Adicionar
                              </SpanButtonValorDesejado>
                            </ButtonAddActive>
                          </DivButtomAdd>
                        ) : (
                          <DivButtomAdd>
                            <ButtonAddNoActive>
                              <SpanButtonValorDesejado>
                                Adicionar
                              </SpanButtonValorDesejado>
                            </ButtonAddNoActive>
                          </DivButtomAdd>
                        )
                      ) : motive && amount !== "" ? (
                        <DivButtomAdd>
                          <ButtonAddActive onClick={update}>
                            <SpanButtonValorDesejado>
                              Atualizar
                            </SpanButtonValorDesejado>
                          </ButtonAddActive>
                        </DivButtomAdd>
                      ) : (
                        <DivButtomAdd>
                          <ButtonAddNoActive>
                            <SpanButtonValorDesejado>
                              Atualizar
                            </SpanButtonValorDesejado>
                          </ButtonAddNoActive>
                        </DivButtomAdd>
                      )}

                      <DivButtomCancel>
                        <ButtonAddActive onClick={cancel}>
                          <SpanButtonValorDesejado>
                            Cancelar
                          </SpanButtonValorDesejado>
                        </ButtonAddActive>
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
                                <ButtonUpdate
                                  onClick={() => handleUpdate(item)}
                                >
                                  <FaPen size={18} color={"#4f4f4f"} />
                                </ButtonUpdate>
                                <ButtonRemove onClick={() => removeDebt(item)}>
                                  <FaTrash size={18} color={"#4f4f4f"} />
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
  /* cursor: pointer; */
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
  cursor: pointer;
`;
const ButtonRemove = styled.div`
  margin: auto 5px auto 5px;
  display: flex;
  cursor: pointer;
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
const ButtonAddActive = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--unnamed-color-ef9c4b) 0% 0% no-repeat padding-box;
  border-radius: 5px;
  cursor: pointer;
`;
const ButtonAddNoActive = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--unnamed-color-986a3c) 0% 0% no-repeat padding-box;
  border-radius: 5px;
  /* cursor: pointer; */
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
const SpanTitleTableCliente = styled.span`
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    22px/30px var(--unnamed-font-family-flexo);
  color: #4f4f4f;
  @media (max-width: 500px) {
    /* display: grid; */
    /* width: 400px;  */
  }
`;

export default Home;
