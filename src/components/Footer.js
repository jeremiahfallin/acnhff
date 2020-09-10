import React from "react";
import styled from "styled-components";
import InfoModal from "./InfoModal";
import useWindowDimensions from "../hooks/useWindowDimensions";

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: #79e0b5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledLinksContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 3px;
`;

const StyledFooterLinks = styled.a`
  &:visited {
    color: #000;
  }
  color: #000;
  text-decoration: none;
  margin-right: 10px;
`;

const Footer = () => {
  const { width, height } = useWindowDimensions();
  return (
    <StyledFooter>
      {(width < 600 || height < 650) && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px"
          }}
        >
          <InfoModal />
        </span>
      )}
      <StyledLinksContainer>
        <StyledLinkContainer>
          <StyledFooterLinks href="https://github.com/jeremiahfallin">
            © Tacit Tech
          </StyledFooterLinks>
        </StyledLinkContainer>
        <StyledLinkContainer>
          <StyledFooterLinks href="https://kristiluu.com/Kristi-Luu-81f0bbfff7c6472086310860f1f1ff8f">
            site design: Kristi Luu
          </StyledFooterLinks>
        </StyledLinkContainer>
      </StyledLinksContainer>
    </StyledFooter>
  );
};

export default Footer;
