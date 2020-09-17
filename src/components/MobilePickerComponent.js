import React, { useState } from "react";
import styled from "styled-components";
import VillagerTile from "./MobileVillagerTile";
import Dots from "./MobileDots";
import MobileControlButtons from "./MobileControlButtons";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
// import "pure-react-carousel/dist/react-carousel.es.css";

const SpaceCarousels = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ResetButton = styled.button`
  background: #88dbe7;
  color: #000;
  width: 4em;
  font-size: 1.1em;
  margin-right: 10px;
  font-family: inherit;
  cursor: pointer;
  border: 0;
  border-radius: 30px;
  padding: 0.3em 0.5em;
`;

const FavoritesContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const MobilePickerComponent = ({ evaluating, favorites, dispatch }) => {
  const [selected, setSelected] = useState([]);

  if (favorites.length < 10) {
    return (
      <SpaceCarousels>
        <CarouselProvider
          naturalSlideWidth={4}
          naturalSlideHeight={5}
          totalSlides={evaluating.length}
          visibleSlides={evaluating.length >= 2 ? 2 : evaluating.length}
          infinite={true}
          isIntrinsicHeight={true}
        >
          <MobileControlButtons {...{ dispatch, selected, setSelected }} />
          <Slider>
            {evaluating.map((villager, x) => {
              return (
                <Slide index={x} key={x}>
                  <VillagerTile
                    villager={villager}
                    selected={selected}
                    setSelected={setSelected}
                    favorite={false}
                  />
                </Slide>
              );
            })}
          </Slider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              paddingTop: "10px"
            }}
          >
            <Dots villagers={evaluating} selected={selected} />
          </div>
        </CarouselProvider>

        <CarouselProvider
          naturalSlideWidth={4}
          naturalSlideHeight={5}
          totalSlides={favorites.length}
          visibleSlides={favorites.length >= 2 ? 2 : favorites.length}
          infinite={true}
          isIntrinsicHeight={true}
        >
          <Slider>
            {favorites.map((villager, x) => {
              return (
                <Slide index={x} key={x}>
                  <VillagerTile
                    villager={villager}
                    selected={selected}
                    setSelected={setSelected}
                    favorite={true}
                  />
                </Slide>
              );
            })}
          </Slider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              paddingTop: "10px"
            }}
          >
            <DotGroup disableActiveDots />
          </div>
        </CarouselProvider>
      </SpaceCarousels>
    );
  } else {
    return (
      <FavoritesContainer>
        {favorites.map((v, i) => {
          return (
            <img
              src={favorites[i]["favorite_image"]}
              alt={favorites[i]}
              height={"80%"}
            />
          );
        })}
        <div style={{ bottom: 0, gridColumn: "span 2", paddingBottom: "5px" }}>
          {favorites.length >= 10 && (
            <ResetButton
              onClick={() => {
                dispatch({ type: "RESET" });
                setSelected([]);
              }}
            >
              Reset
            </ResetButton>
          )}
        </div>
      </FavoritesContainer>
    );
  }
};

export default MobilePickerComponent;
