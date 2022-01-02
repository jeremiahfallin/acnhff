import React, { useContext } from "react";
import styled from "styled-components";
import { CompleteContext } from "./CompleteContext";

const StyledHeader = styled.div`
  position: absolute;
  display: grid;
  align-items: center;
  width: 100%;
  background: #88dbe7;
  background: ${props =>
    `linear-gradient(to right, #88dbe7 ${props.completed}, #BBA0B2 ${props.completed})`};
  height: 3rem;
  top: 0;
  * {
    color: #1b1b1b;
  }
`;

const Header = () => {
  const { completed } = useContext(CompleteContext);

  return (
    <StyledHeader completed={`${(100 * completed) / 391}`.split(".")[0] + "%"}>
      <h1 style={{ textAlign: "center", margin: 0 }}>ACNH Villager Center</h1>
    </StyledHeader>
  );
};

export default Header;
