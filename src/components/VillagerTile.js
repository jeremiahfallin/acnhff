import React from "react";
import styled from "styled-components";

const VillagerContainer = styled.div`
  display: grid;
  height: 100%;
  align-content: center;
`;

const VillagerSpan = styled.span`
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 100px;
  height: 100px;
  padding: 3px;
  cursor: ${props => !props.favorite && "pointer"};
`;

const VillagerImage = styled.img`
  left: -3px;
  height: 100px;
  width: 100px;
  border: ${props => props.selected && `4px solid #2EA594`};
  border-radius: ${props => props.selected && "5px"};
`;

const VillagerTile = ({ villager, selected = [], setSelected, favorite }) => {
  const selectedContainsVillager = villager =>
    selected.filter(v => v.id === villager.id).length > 0;

  return (
    <VillagerContainer
      onClick={() => {
        const selectedVillagers = [...selected];
        if (!favorite) {
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
      }}
    >
      <div>
        <VillagerSpan favorite={favorite}>
          <VillagerImage
            src={villager.nh_details.photo_url}
            alt={villager.name}
            selected={selectedContainsVillager(villager)}
          />
        </VillagerSpan>
        {!favorite && (
          <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
            {villager.name}
          </div>
        )}
      </div>
    </VillagerContainer>
  );
};

export default VillagerTile;
