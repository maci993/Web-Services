const {
  getAll,
  getAllAlphabetically,
  getOne,
  create,
  update,
  remove,
} = require("../pkg/recipes");

const { Recipes, validate } = require("../pkg/recipes/validate");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await getAll(req.auth.id);
    return res.status(200).send(recipes);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

const getOneRecipe = async (req, res) => {
  try {
    const data = await getOne(req.auth.id, req.params.id);
    if (!data) {
      return res.status(404).send("Recipe not found!");
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

const getAlphabeticallyByTitle = async (req, res) => {
  try {
    const data = await getAllAlphabetically(req.auth.id);
    if (!data) {
      return res.status(404).send("Recipes not found!");
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

const createRecipe = async (req, res) => {
  try {
    await validate(req.body, Recipes);
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    const newRecipe = await create(data);
    return res.status(200).send(newRecipe);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

const updateRecipe = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    const newRecipe = await update(req.params.id, data);
    return res.status(200).send(newRecipe);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(200).send(`Recipe with id: ${req.params.id} is removed!`);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  getAlphabeticallyByTitle,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
