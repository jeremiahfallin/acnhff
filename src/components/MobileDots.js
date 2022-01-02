import React from "react";
import styled from "styled-components";

const DotGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  padding-bottom: 5px;
`;

const Dot = styled.button`
  height: 25px;
  width: 25px;
  background: ${props => (props.background ? `#88dbe7` : `#79e0b5`)};
  border: 0;
  border: ${props => props.border && `2px solid #2ea594`};
  border-radius: 25px;
  cursor: pointer;
  margin: 0 5px;
`;

const Dots = ({ villagers, selected, slideIndex, setSlideIndex }) => {
  const selectedContainsVillager = villager =>
    selected.filter(v => v.id === villager.id).length > 0;

  return (
    <DotGroup>
      {villagers &&
        villagers.map((ev, index) => {
          return (
            <Dot
              key={ev.id}
              background={index === slideIndex || index - 1 === slideIndex}
              border={selectedContainsVillager(ev)}
              onClick={e => {
                setSlideIndex(
                  index !== villagers.length - 1 ? index : index - 1
                );
              }}
            />
          );
        })}
    </DotGroup>
  );
};

export default Dots;
