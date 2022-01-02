import { useReducer } from "react";

function copyObject() {
  // Returns a deep copy of the given object(s), with properties of later
  // objects overriding those of earlier objects.
  var result = {};
  var a, key;

  for (a = 0; a < arguments.length; a++) {
    for (key in arguments[a]) {
      if (arguments[a].hasOwnProperty(key)) {
        if (arguments[a][key] && typeof arguments[a][key] === "object") {
          if (Array.isArray(arguments[a][key])) {
            result[key] = copyArray(arguments[a][key]);
          } else {
            result[key] = copyObject(arguments[a][key]);
          }
        } else {
          result[key] = arguments[a][key];
        }
      }
    }
  }
  return result;
}

function copyArray(array) {
  // Returns a deep copy of the given data array.
  var result = [];
  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i] && typeof array[i] === "object") {
      if (Array.isArray(array[i])) {
        result[i] = copyArray(array[i]);
      } else {
        result[i] = copyObject(array[i]);
      }
    } else {
      result[i] = array[i];
    }
  }
  return result;
}

const batchSize = (arr, maxBatchSize) =>
  Math.ceil(arr.length / 5) < maxBatchSize
    ? Math.ceil(arr.length / 5) > 3
      ? Math.ceil(arr.length / 5)
      : arr.length > 2
      ? 3
      : arr.length > 1
      ? 2
      : arr.length > 0
      ? 1
      : 0
    : maxBatchSize;

const getEvaluating = (array, n) => {
  let result = new Array(n),
    len = array.length,
    taken = new Array(len);
  // if (n > len)
  //   throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = array[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

let checker = (arr, target) => target.every(v => arr.includes(v));

const foundFavorite = (pickedIDs, favorites, allEliminated) => {
  let favoriteIDs;
  if (favorites.length > 0) {
    favoriteIDs = [
      ...favorites.map(f => {
        return f.id;
      }),
      ...pickedIDs,
    ];
  } else {
    favoriteIDs = [...pickedIDs];
  }

  const newArray = allEliminated
    .filter(e => {
      return checker(favoriteIDs, e.eliminatedBy);
    })
    .map(e => {
      return e.e;
    });

  const returnEliminated = allEliminated.filter(e => {
    return !checker(favoriteIDs, e.eliminatedBy);
  });

  return [newArray, returnEliminated];
};

const getPickState = (
  pfs,
  evaluating,
  eliminated,
  favorites,
  remainingArray,
  maxBatchSize
) => {
  const pickedIDs = pfs.map(pf => {
    return pf.id;
  });
  const evaluatingWithoutPicked = evaluating.filter(
    ev => !pickedIDs.includes(ev.id)
  );
  let newEliminated = evaluatingWithoutPicked.map(e => {
    return { e, eliminatedBy: pickedIDs };
  });
  const eliminatedIDs = [...newEliminated].map(el => {
    return el.e.id;
  });
  let newRemainingArray = remainingArray.filter(
    el => !eliminatedIDs.includes(el.id)
  );

  const newFavorites =
    newRemainingArray.length === 1 ? [...newRemainingArray] : [];
  if (newFavorites.length === 1) {
    [newRemainingArray, newEliminated] = foundFavorite(
      pickedIDs,
      [...newFavorites, ...favorites],
      [...eliminated, ...newEliminated]
    );
  } else {
    newEliminated = [...newEliminated, ...eliminated];
  }

  const newEvaluating = getEvaluating(
    newRemainingArray,
    batchSize(newRemainingArray, maxBatchSize)
  );

  return [newRemainingArray, newEvaluating, newEliminated, newFavorites];
};

const saveState = (localStorageKey, state) => {
  // Saves the given state in localStorage, assuming it is available.
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

const loadState = localStorageKey => {
  // Returns the state stored in localStorage, if there is one.
  var state;
  try {
    state = JSON.parse(localStorage.getItem(localStorageKey));
  } catch (e) {
    return null;
  }

  return state;
};

export default function useFavoriteReducer({
  storageKey,
  items,
  maxBatchSize = 10,
}) {
  const defaultState = {
    localStorageKey: storageKey,
    favorites: [],
    eliminated: [],
    evaluating: getEvaluating(copyArray(items), batchSize(items, maxBatchSize)),
    remainingArray: items,
    maxBatchSize: maxBatchSize,
    previousState: null,
  };
  let initialState = defaultState;
  if (loadState(storageKey) !== null) {
    initialState = loadState(storageKey);
  }

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START": {
        return { ...state };
      }
      case "PICK_FAVORITES": {
        let newState;
        if (action.picked.length > 0) {
          const [
            newRemainingArray,
            newEvaluating,
            newEliminated,
            newFavorites,
          ] = getPickState(
            action.picked,
            copyArray(state.evaluating),
            copyArray(state.eliminated),
            copyArray(state.favorites),
            copyArray(state.remainingArray),
            maxBatchSize
          );
          newState = {
            ...state,
            eliminated: newEliminated,
            evaluating: newEvaluating,
            remainingArray: newRemainingArray,
            favorites: [...state.favorites, ...newFavorites],
            previousState: { ...copyObject(state), previousState: null },
          };
          saveState(state.localStorageKey, newState);

          return newState;
        } else {
          newState = {
            ...state,
            evaluating: getEvaluating(
              copyArray(state.remainingArray),
              batchSize(state.remainingArray, maxBatchSize)
            ),
          };
          saveState(state.localStorageKey, newState);
          return newState;
        }
      }
      case "PASS": {
        let newState = {
          ...state,
          previousState: { ...copyObject(state), previousState: null },
          evaluating: getEvaluating(
            copyArray(state.remainingArray),
            batchSize(state.remainingArray, maxBatchSize)
          ),
        };
        saveState(state.localStorageKey, newState);
        return newState;
      }
      case "UNDO": {
        if (state.previousState === null) {
          return { ...state };
        } else {
          let newState = {
            ...state.previousState,
          };
          saveState(state.localStorageKey, newState);
          return newState;
        }
      }
      case "REDO": {
        // TODO
        return {
          ...state,
        };
      }
      case "RESET": {
        const newState = {
          ...defaultState,
          previousState: { ...copyObject(state), previousState: null },
        };
        saveState(state.localStorageKey, newState);
        return newState;
      }
      case "BATCH_SIZE": {
        return {
          ...state,
          maxBatchSize: action.batchSize,
          evaluating: getEvaluating(
            copyArray(state.remainingArray),
            batchSize(state.remainingArray, maxBatchSize)
          ),
        };
      }

      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  return [state, dispatch];
}
