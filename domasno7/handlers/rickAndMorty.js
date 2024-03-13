const { getCharacter } = require("../pkg/rickAndMorty");

const getCharacterRickAndMorty = async (req, res) => {
  try {
    const new_id = Number(req.params.id)
    const data = await getCharacter(new_id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    getCharacterRickAndMorty,
};
