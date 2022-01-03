import React from "react";
import styled from "styled-components";
import InfoModal from "./InfoModal";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Wrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: #79e0b5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLink = styled.a`
  &:visited {
    color: #000;
  }
  color: #000;
  text-decoration: none;
  padding-right: 10px;
  padding-bottom: 3px;
`;

const ModalWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Footer = () => {
  const { width, height } = useWindowDimensions();
  return (
    <Wrapper>
      {(width < 600 || height < 650) && (
        <ModalWrapper>
          <InfoModal />
        </ModalWrapper>
      )}
      <LinksWrapper>
        <FooterLink href="https://github.com/jeremiahfallin">
          code: Jeremiah Fallin
        </FooterLink>
        <FooterLink href="https://kristiluu.com/Kristi-Luu-81f0bbfff7c6472086310860f1f1ff8f">
          design: Kristi Luu
        </FooterLink>
      </LinksWrapper>
    </Wrapper>
  );
};

export default Footer;
