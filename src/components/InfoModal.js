import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";

const StyledInfo = styled.div`
  background: #f8f5e1;
  font-size: 1.75em;
  font-weight: bold;
  height: calc(100%);
  overflow: hidden;
`;

const StyledInfoHeader = styled.div`
  height: 100%;
  background: #54bda8;
  color: #f9f5e0;
  text-align: center;
  font-size: 1.1em;
  padding: 5px 0;

  position: absolute;
  width: 100%;
  height: 3rem;
  top: 0;
`;

const StyledContent = styled.div`
  padding-top: 3rem;
  margin: 20px;
  height: 100%;
  padding-bottom: 40px;
`;

const StyledInfoFooter = styled.div`
  position: absolute;
  height: 40px;
  background: #54bda8;
  bottom: 0;
  width: 100%;
`;

const StyledInfoButton = styled.button`
  cursor: pointer;
  border: 3px solid #efe4d1;
  color: #efe4d1;
  border-radius: 15px 15px 15px 0;
  background: #f8f5e5;
  height: 30px;
  width: 30px;
  font-size: larger;
  font-weight: bold;
`;

const InfoModal = () => {
  const { width } = useWindowDimensions();
  var subtitle;
  const customStyles = {
    content: {
      padding: "0",
      top: "50%",
      left: width > 600 ? "65%" : "50%",
      right: width > 600 ? "45%" : "50%",
      bottom: "auto",
      width: width > 600 ? "auto" : "90vw",
      height: width > 600 ? "auto" : "90vh",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "30px"
    }
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f9f5e0";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <StyledInfoButton onClick={openModal}>?</StyledInfoButton>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StyledInfo>
          <StyledInfoHeader ref={(_subtitle) => (subtitle = _subtitle)}>
            Learn more!
          </StyledInfoHeader>
          <StyledContent>
            For each group of villagers, click{" "}
            <span style={{ color: "#EC3F59" }}>one or more</span> of your
            favorites and press the{" "}
            <span style={{ color: "#54bda8" }}>pick</span> button. Eventually,
            your favorite villagers will show up in your favorites.
          </StyledContent>
          <StyledInfoFooter />
        </StyledInfo>
      </Modal>
    </div>
  );
};

export default InfoModal;
