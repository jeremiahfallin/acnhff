import React, { useState } from "react";
import styled from "styled-components";
import VillagerTile from "./MobileVillagerTile";
import MobileControlButtons from "./MobileControlButtons";
import Dots from "./MobileDots";
import Carousel from "nuka-carousel";

const SpaceCarousels = styled.div`
  display: grid;
  flex-direction: row;
  height: 100%;
  grid-template-rows: 1fr 1fr;
  gap: 1vh;
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
  justify-items: flex-end;
  align-items: center;
  height: 100%;
`;

const VillagerImage = styled.img`
  height: 100%;
  width: auto;
`;

const MobilePickerComponent = ({
  evaluating,
  favorites,
  dispatch,
  slideIndex,
  setSlideIndex,
}) => {
  const [selected, setSelected] = useState([]);

  if (favorites.length < 10) {
    return (
      <SpaceCarousels>
        <div>
          <MobileControlButtons {...{ dispatch, selected, setSelected }} />
          <Carousel
            slideIndex={slideIndex}
            afterSlide={slideIndex => setSlideIndex(slideIndex)}
            slidesToShow={2}
            renderBottomCenterControls={null}
            renderCenterLeftControls={null}
            renderCenterRightControls={null}
          >
            {evaluating.map((villager, x) => {
              return (
                <VillagerTile
                  key={x}
                  villager={villager}
                  selected={selected}
                  setSelected={setSelected}
                  favorite={false}
                />
              );
            })}
          </Carousel>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Dots
              villagers={evaluating}
              {...{ selected, slideIndex, setSlideIndex }}
            />
          </div>
        </div>
        <div>
          <Carousel
            slidesToShow={2}
            renderBottomCenterControls={null}
            renderCenterLeftControls={null}
            renderCenterRightControls={null}
          >
            {favorites.map((villager, x) => {
              return (
                <VillagerTile
                  key={x}
                  villager={villager}
                  selected={selected}
                  setSelected={setSelected}
                  favorite={true}
                />
              );
            })}
          </Carousel>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Dots
              villagers={favorites}
              {...{ selected, slideIndex, setSlideIndex }}
            />
          </div>
        </div>
      </SpaceCarousels>
    );
  } else {
    return (
      <FavoritesContainer>
        {favorites.map((v, i) => {
          return (
            <VillagerImage key={i} src={v.nh_details.photo_url} alt={v.name} />
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
