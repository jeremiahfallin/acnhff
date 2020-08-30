import React from "react";

const cls1 = { fill: "#f8f5e6", fillRule: "evenodd" };

const cls2 = { fill: "#efe4d2" };

const dimensions = [
  { x: "81", y: "50" },
  { x: "175", y: "63" },
  { x: "262", y: "63" },
  { x: "364", y: "50" },
  { x: "461", y: "39" },
  { x: "566", y: "39" },
  { x: "225", y: "129" },
  { x: "320", y: "117" },
  { x: "420", y: "106" },
  { x: "520", y: "96" }
];

const FavoritesEsVeeGee = ({ favorites }) => {
  let d = [...dimensions];
  let favDimensions = d.splice(0, favorites.length);
  let imageSize = 80;

  return (
    <svg
      id="Favorites_Dots"
      data-name="Favorites Dots"
      xmlns="http://www.w3.org/2000/svg"
      width="652"
      height="169"
      viewBox="0 -10 652 179"
      style={{
        margin: "auto"
      }}
    >
      <defs></defs>
      <path
        id="Dialogue"
        style={cls1}
        d="M281.406,17.427c309.056-50.949,396.418,20.89,363.625,74.918-10.148,16.719-36.337,36.8-95.853,49.816-66.462,14.539-161.993,19.055-267.772,25.1C-54.207,186.449-50.84-21.39,94.568,13.288,142.928,24.821,223.006,27.054,281.406,17.427Z"
      />
      {favDimensions.map((d, i) => {
        return (
          <React.Fragment key={`${i}`}>
            <clipPath id={`clipCircle${d.x}${d.y}`}>
              <circle r={imageSize / 2} cx={d.x} cy={d.y} />
            </clipPath>
            <image
              href={favorites[i]["image"]}
              height={imageSize}
              width={imageSize}
              x={d.x - imageSize / 2}
              y={d.y - imageSize / 2}
              clipPath={`url(#clipCircle${d.x}${d.y})`}
            />
          </React.Fragment>
        );
      })}
      {d.map((circle) => {
        return (
          <circle
            key={`${circle.x}${circle.y}`}
            style={cls2}
            cx={circle.x}
            cy={circle.y}
            r="11.828"
          />
        );
      })}
    </svg>
  );
};

export default FavoritesEsVeeGee;
