import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: #79e0b5;
  display: flex;
  flex-direction: column-reverse;
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
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
};

export default Footer;
