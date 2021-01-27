import React from "react";
import styled from "styled-components";

const Users = ({ name }) => {
  <DivNameUser>
    <SpanNameUser>{name}</SpanNameUser>
  </DivNameUser>;
};

const DivNameUser = styled.div`
  margin-left: 10px;
`;
const SpanNameUser = styled.span`
  color: #4f4f4f;
  font: var(--unnamed-font-style-italic) var(--unnamed-font-weight-bold) 18px/24px
    var(--unnamed-font-family-flexo);
`;

export default Users;
