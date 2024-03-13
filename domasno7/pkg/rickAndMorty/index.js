const { getSection } = require("../config");

const CACHE4 = {};

const getCharacter = async (character) => {
  console.log("CACHE4", CACHE4);

  let now = new Date().getTime() / 1000;

  if (
    CACHE4[character] &&
    now <
      CACHE4[character].timestamp +
        getSection("rick_and_morty").cache_expiery_characters
  ) {
    return CACHE4[character];
  }

  const URL = `${
    getSection("rick_and_morty").API_URL_CHARACTERS
  }`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE4[character] = {
      timestamp: new Date().getTime() / 1000,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
    getCharacter,
};
