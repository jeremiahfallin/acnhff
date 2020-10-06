import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CarouselContext } from "pure-react-carousel";

const DotGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  padding-bottom: 5px;
`;

const Dot = styled.button`
  height: 25px;
  width: 25px;
  background: ${(props) => (props.background ? `#88dbe7` : `#79e0b5`)};
  border: 0;
  border: ${(props) => props.border && `2px solid #2ea594`};
  border-radius: 25px;
  cursor: pointer;
  margin: 0 5px;
`;

const Dots = ({ villagers, selected }) => {
  const carouselContext = useContext(CarouselContext);
  const selectedContainsVillager = (villager) =>
    selected.filter((v) => v.id === villager.id).length > 0;

  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <DotGroup>
      {villagers &&
        villagers.map((ev, index) => {
          return (
            <Dot
              key={ev.id}
              background={index === currentSlide || index - 1 === currentSlide}
              border={selectedContainsVillager(ev)}
              onClick={(e) => {
                carouselContext.setStoreState({
                  currentSlide:
                    index !== villagers.length - 1 ? index : index - 1
                });
              }}
            />
          );
        })}
    </DotGroup>
  );
};

export default Dots;
