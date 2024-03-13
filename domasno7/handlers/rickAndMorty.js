const { getCharacter } = require("../pkg/rickAndMorty");

const getCharacterRickAndMorty = async (req, res) => {
  try {
    const data = await getCharacter(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    getCharacterRickAndMorty,
};