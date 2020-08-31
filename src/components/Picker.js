import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VillagerTile from "./VillagerTile";
import InfoModal from "./InfoModal";
import FavoritesEsVeeGee from "./FavoritesSVG";
import useFavorites from "../hooks/useFavorites";
import useWindowDimensions from "../hooks/useWindowDimensions";

import villagersData from "./villagers.json";

const items = Object.keys(villagersData).map((key) => {
  const entry = villagersData[key];
  const returnValue = {
    id: entry.id,
    name: entry["name"]["name-USen"],
    species: entry.species,
    gender: entry.gender,
    personality: entry.personality,
    birthday: entry.birthday,
    catch: entry["catch-phrase"],
    saying: entry.saying,
    textColor: entry["text-color"],
    bubbleColor: entry["bubble-color"],
    icon: entry.icon_uri,
    image: entry.image_uri,
    favorite_image: entry.favorite_uri
  };
  return returnValue;
});
const PickerContainer = () => {
  const { height, width } = useWindowDimensions();
  const [batchSize, setBatchSize] = useState(0);
  const [state, dispatch] = useFavorites({
    storageKey: "favorites",
    items: items,
    maxBatchSize: batchSize
  });

  useEffect(() => {
    setBatchSize(
      width > 900 && height > 800 ? 10 : width > 900 && height < 800 ? 5 : 3
    );
  }, [width, height]);

  useEffect(() => {
    dispatch({ type: "BATCH_SIZE", batchSize });
  }, [dispatch, batchSize]);

  return (
    <PickerComponent
      evaluating={state.evaluating}
      favorites={state.favorites}
      dispatch={dispatch}
    />
  );
};

const IslandContainer = styled.div`
  display: grid;
  grid-template-rows: 3vh 20vh 50vh;
  grid-gap: 3rem;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  width: 60%;
  @media (max-width: 900px) {
    grid-template-rows: 3vh 20vh 40vh;
  }
  @media (max-height: 800px) {
    grid-template-rows: 3vh 20vh 40vh;
  }
`;

const FavoritesContainer = styled.div`
  display: grid;
  grid-template-rows: 3fr 5fr 3fr;
  background: #f8f5e5;
  width: 800px;
  border-radius: 50px;
  text-align: center;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 80vw;
  }
`;

const FavoritesTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const VillagerList = styled.ul`
  /* display: flex;
  flex-wrap: wrap; */
  display: grid;
  grid-gap: 30px;
  text-align: center;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-content: center;
  @media (min-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: 10px;
  }
  @media (max-height: 800px) {
    grid-auto-flow: column;
    grid-template-rows: 1fr;
  }
`;

const VillagerListItem = styled.li`
  display: flex;
  justify-content: center;
  list-style-type: none;
  flex: 1;
  margin: 0.125em;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 30px;
`;

const PickButton = styled.button`
  background: #54bda8;
  color: #fff;
  font-weight: bold;
  width: 4em;
  border-radius: 5px;
  margin-right: 10px;
  font-family: inherit;
  cursor: pointer;
  border: 0;
  border-radius: 30px;
  padding: 0.2em 0.5em;
  font-size: 1.5em;
  @media (min-width: 900px) {
    font-size: 2em;
  }
`;

const PickerButton = styled.button`
  background: #ccc;
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

const PickerComponent = ({ evaluating, favorites, dispatch }) => {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <IslandContainer>
        <div />
        <div
          style={{
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <FavoritesEsVeeGee style={{ zIndex: "-999" }} favorites={favorites} />
        </div>
        <FavoritesContainer>
          <FavoritesTitle>
            <div />
            <h1>Pick your favorite villager</h1>
            <InfoModal />
          </FavoritesTitle>
          <VillagerList>
            {evaluating.length > 0 &&
              evaluating.map((villager) => {
                return (
                  <VillagerListItem key={villager.name}>
                    <VillagerTile
                      villager={villager}
                      selected={selected}
                      setSelected={setSelected}
                      favorite={false}
                    />
                  </VillagerListItem>
                );
              })}
          </VillagerList>
          <ButtonContainer>
            <PickButton
              onClick={() => {
                dispatch({ type: "PICK_FAVORITES", picked: selected });
                setSelected([]);
              }}
            >
              Pick
            </PickButton>
            <div>
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
            </div>
          </ButtonContainer>
        </FavoritesContainer>
      </IslandContainer>
    </>
  );
};

export default PickerContainer;
