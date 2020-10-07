import React, { useContext } from "react";
import styled from "styled-components";
import { CompleteContext } from "./CompleteContext";

const StyledHeader = styled.div`
  position: absolute;
  width: 100%;
  background: #88dbe7;
  background: ${(props) =>
    `linear-gradient(to right, #88dbe7 ${props.completed}, #97A5C4 ${props.completed})`};
  height: 3rem;
  top: 0;
`;

const Header = () => {
  const { completed } = useContext(CompleteContext);

  return (
    <StyledHeader completed={`${(100 * completed) / 391}`.split(".")[0] + "%"}>
      <h1 style={{ textAlign: "center", margin: 0 }}>ACNH Dreamies</h1>
    </StyledHeader>
  );
};

export default Header;
