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
        margin: "auto",
        width: "100%",
        height: "auto"
      }}
    >
      <defs></defs>
      <path
        id="Dialogue"
        style={cls1}
        d="M281,17
        c309-50,396,20,363,74-10,16-36,36-95,49-66,14-161,19-267,25
        C-54,186-50-21,94,13,142,24,223,27,281,17"
      />
      {favDimensions.map((d, i) => {
        return (
          <React.Fragment key={`${i}`}>
            <clipPath id={`clipCircle${d.x}${d.y}`}>
              <circle r={imageSize / 2} cx={d.x} cy={d.y} />
            </clipPath>
            <image
              href={favorites[i]["favorite_image"]}
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
      <g>
        <rect
          x="0"
          y="100"
          rx="20"
          ry="20"
          width="8.5em"
          height="2.5em"
          stroke="#c2ab44"
          fill="#c2ab44"
          strokeWidth="5"
        />
        <text x="5" y="130" fontSize="2em" fill="#fff" fontWeight="bold">
          Favorites
        </text>
      </g>
    </svg>
  );
};

export default FavoritesEsVeeGee;
