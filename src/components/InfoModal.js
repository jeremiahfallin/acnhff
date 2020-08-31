import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const StyledInfo = styled.div`
  background: #f8f5e1;
  font-size: 1.75em;
  font-weight: bold;
`;

const StyledInfoHeader = styled.div`
  height: 100%;
  background: #54bda8;
  color: #f9f5e0;
  text-align: center;
  font-size: 1.1em;
  padding: 5px;
`;

const StyledContent = styled.div`
  margin: 20px;
  margin-top: 40px;
`;

const StyledInfoFooter = styled.div`
  height: 40px;
  background: #54bda8;
`;

const StyledInfoButton = styled.button`
  cursor: pointer;
  border: 2px solid #efe4d1;
  color: #efe4d1;
  border-radius: 15px 15px 15px 0;
  background: #f8f5e5;
  height: 30px;
  width: 30px;
  font-size: larger;
  font-weight: bold;
  margin-top: 5px;
`;

const customStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "75%",
    right: "45%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px"
  }
};

const InfoModal = () => {
  var subtitle;
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
