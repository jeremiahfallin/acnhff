import React, { useState } from "react";
import styled from "styled-components";

const VillagerContainer = styled.div`
  display: grid;
  height: 100%;
  justify-content: center;
  align-content: center;
`;

const VillagerSpan = styled.span`
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 16vh;
  height: 16vh;
  padding: 3px;
  cursor: ${props => !props.favorite && "pointer"};
`;

const VillagerImage = styled.img`
  height: 18vh;
  width: 18vh;
  border: ${props => props.selected && `5px solid #2EA594`};
  border-radius: 5px;
`;

const VillagerTile = ({ villager, selected = [], setSelected, favorite }) => {
  const [currentSlide] = useState(0);
  const [clickedSlide, setClickedSlide] = useState(0);
  const selectedContainsVillager = villager =>
    selected.filter(v => v.id === villager.id).length > 0;

  const addToSelected = () => {
    const selectedVillagers = [...selected];
    if (!favorite && currentSlide === clickedSlide) {
      selectedContainsVillager(villager)
        ? selectedVillagers.splice(
            selected
              .map(e => {
                return e.id;
              })
              .indexOf(villager.id),
            1
          )
        : selectedVillagers.push(villager);
      setSelected(selectedVillagers);
    }
    setClickedSlide(currentSlide);
  };

  return (
    <VillagerContainer
      onMouseDown={() => setClickedSlide(currentSlide)}
      onMouseUp={() => addToSelected(villager, selected)}
    >
      <VillagerSpan favorite={favorite}>
        <VillagerImage
          src={villager.image}
          alt={villager.name}
          selected={selectedContainsVillager(villager)}
        />
      </VillagerSpan>
      <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
        {villager.name}
      </div>
    </VillagerContainer>
  );
};

export default VillagerTile;
