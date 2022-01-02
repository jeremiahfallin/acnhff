import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  padding-top: 5px;
`;

const SmallButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const PickButton = styled.button`
  background: #54bda8;
  color: #fff;
  font-weight: bold;
  width: 3.5em;
  border-radius: 5px;
  margin-right: 10px;
  font-family: inherit;
  cursor: pointer;
  border: 0;
  border-radius: 30px;
  padding: 0.2em 0.5em;
  font-size: 1.4em;
  @media (min-width: 900px) {
    font-size: 2em;
  }
`;

const PickerButton = styled.button`
  background: #ccc;
  color: #000;
  width: 4em;
  font-size: 1em;
  font-family: inherit;
  cursor: pointer;
  border: 0;
  border-radius: 30px;
  padding: 0.3em 0.5em;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const MobileControlButtons = ({ dispatch, selected, setSelected }) => {
  return (
    <ButtonContainer>
      <PickButton
        onClick={() => {
          dispatch({ type: "PICK_FAVORITES", picked: selected });
          setSelected([]);
        }}
      >
        Pick
      </PickButton>
      <SmallButtonContainer>
        <PickerButton
          onClick={() => {
            dispatch({ type: "PICK_FAVORITES", picked: selected });
            setSelected([]);
          }}
        >
          Pass
        </PickerButton>
        <PickerButton
          onClick={() => {
            dispatch({ type: "UNDO", picked: selected });
            setSelected([]);
          }}
        >
          Undo
        </PickerButton>
        <PickerButton
          onClick={() => {
            dispatch({ type: "RESET" });
            setSelected([]);
          }}
        >
          Reset
        </PickerButton>
      </SmallButtonContainer>
    </ButtonContainer>
  );
};

export default MobileControlButtons;
