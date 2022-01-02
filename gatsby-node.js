const fetch = require("isomorphic-fetch");

// url: https://api.nookipedia.com/villagers

async function fetchVillagersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const { createNode } = actions;
  const villagers = await fetch(
    "https://api.nookipedia.com/villagers?game=nh&nhdetails=true",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.GATSBY_NOOKIPEDIA_API_KEY,
        "Accept-Version": "2.0.0",
      },
    }
  ).then(res => res.json());

  villagers.forEach(villager => {
    const node = {
      id: createNodeId(`villager-${villager.id}`),
      parent: null,
      children: [],
      internal: {
        type: "Villager",
        mediaType: "application/json",
        contentDigest: createContentDigest(villager),
      },
    };

    createNode({ ...node, ...villager });
  });
}

exports.sourceNodes = async params => {
  await Promise.all([fetchVillagersAndTurnIntoNodes(params)]);
};
