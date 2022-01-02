import React, { useState, useEffect, useContext } from "react";
import useFavorites from "../hooks/useFavorites";
import useWindowDimensions from "../hooks/useWindowDimensions";
import PickerComponent from "./PickerComponent";
import MobilePickerComponent from "./MobilePickerComponent";
import { CompleteContext } from "./CompleteContext";

// const items = Object.keys(villagersData).map(key => {
//   const entry = villagersData[key];
//   const returnValue = {
//     id: entry.id,
//     name: entry["name"]["name-USen"],
//     species: entry.species,
//     gender: entry.gender,
//     personality: entry.personality,
//     birthday: entry.birthday,
//     catch: entry["catch-phrase"],
//     saying: entry.saying,
//     textColor: entry["text-color"],
//     bubbleColor: entry["bubble-color"],
//     icon: entry.icon_uri,
//     image: entry.image_uri,
//     favorite_image: entry.favorite_uri,
//   };
//   return returnValue;
// });

const Picker = ({ villagers }) => {
  console.log(villagers);
  const { setCompleted } = useContext(CompleteContext);
  const { height, width } = useWindowDimensions();
  const [batchSize, setBatchSize] = useState(0);
  const [state, dispatch] = useFavorites({
    storageKey: "favorites",
    items: villagers,
    maxBatchSize: batchSize,
  });
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setCompleted(state.eliminated.length);
  }, [setCompleted, state.eliminated]);

  useEffect(() => {
    setBatchSize(
      width > 900 && height > 900 ? 10 : width > 900 ? 5 : width < 600 ? 10 : 3
    );
  }, [width, height]);

  useEffect(() => {
    dispatch({ type: "BATCH_SIZE", batchSize });
  }, [dispatch, batchSize]);

  if (width < 600 || height < 650) {
    return (
      <MobilePickerComponent
        evaluating={state.evaluating}
        favorites={state.favorites}
        {...{ dispatch, slideIndex, setSlideIndex }}
      />
    );
  } else {
    return (
      <PickerComponent
        evaluating={state.evaluating}
        favorites={state.favorites}
        {...{ dispatch }}
      />
    );
  }
};

export default Picker;
