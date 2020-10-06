import React, { useContext, useEffect, useState } from "react";
import { Image, CarouselContext } from "pure-react-carousel";
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
  width: 18vh;
  height: 18vh;
  padding: 3px;
  cursor: ${(props) => !props.favorite && "pointer"};
`;

const VillagerTile = ({ villager, selected = [], setSelected, favorite }) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  const [clickedSlide, setClickedSlide] = useState(0);
  const selectedContainsVillager = (villager) =>
    selected.filter((v) => v.id === villager.id).length > 0;

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  const addToSelected = () => {
    const selectedVillagers = [...selected];
    if (!favorite && currentSlide === clickedSlide) {
      selectedContainsVillager(villager)
        ? selectedVillagers.splice(
            selected
              .map((e) => {
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
        <Image
          src={villager.image}
          alt={villager.name}
          style={{ height: "18vh", width: "18vh" }}
          className={
            selectedContainsVillager(villager) ? "slide--selected" : ""
          }
        />
      </VillagerSpan>
      {!favorite && (
        <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          {villager.name}
        </div>
      )}
    </VillagerContainer>
  );
};

export default VillagerTile;
