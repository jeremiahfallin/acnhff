import React from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import "@reach/dialog/styles.css";

const StyledInfo = styled.div`
  background: #f8f5e1;
  font-size: 1.5em;
  font-weight: bold;
  height: calc(100%);
  overflow: hidden;
  border-radius: 25px;
`;

const StyledInfoHeader = styled.div`
  height: 100%;
  background: #54bda8;
  color: #f9f5e0;
  text-align: center;
  font-size: 1.1em;
  padding: 5px 0;
  width: 100%;
  height: 3rem;
  top: 0;
  display: grid;
  align-items: center;
`;

const StyledContent = styled.div`
  padding-top: 3rem;
  margin: 20px;
  height: 100%;
  padding-bottom: 40px;
`;

const StyledInfoFooter = styled.div`
  height: 40px;
  background: #54bda8;
  bottom: 0;
  width: 100%;
`;

const StyledInfoButton = styled.button`
  cursor: pointer;
  border: 3px solid hsl(38deg 66% 66%);
  color: hsl(38deg 66% 66%);
  border-radius: 15px 15px 15px 0;
  background: #f8f5e5;
  height: 30px;
  width: 30px;
  font-size: larger;
  font-weight: bold;
`;

const InfoModal = () => {
  const { width } = useWindowDimensions();
  const customStyles = {
    content: {
      padding: "0",
      top: "50%",
      left: width > 600 ? "65%" : "50%",
      right: width > 600 ? "45%" : "50%",
      bottom: "auto",
      width: width > 600 ? "auto" : "90vw",
      height: width > 600 ? "auto" : "90vh",
      margin: "0",
      transform: "translate(-50%, -50%)",
      borderRadius: "30px",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <StyledInfoButton onClick={openModal}>?</StyledInfoButton>
      <DialogOverlay
        style={customStyles}
        isOpen={modalIsOpen}
        onDismiss={closeModal}
      >
        <DialogContent
          aria-label="Announcement"
          style={{
            padding: "0",
            width: "min(40ch, 80%)",
            borderRadius: "30px",
          }}
        >
          <StyledInfo>
            <StyledInfoHeader>Learn more!</StyledInfoHeader>
            <StyledContent>
              For each group of villagers, click{" "}
              <span style={{ color: "#EC3F59" }}>one or more</span> of your
              favorites and press the{" "}
              <span style={{ color: "#54bda8" }}>pick</span> button. Eventually,
              your favorite villagers will show up in your favorites.
            </StyledContent>
            <StyledInfoFooter />
          </StyledInfo>
        </DialogContent>
      </DialogOverlay>
    </div>
  );
};

export default InfoModal;
