const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  recept: String,
  sostojki: String,
  vreme: String,
});

const Recipes = mongoose.model("Recipe", recipeSchema, "recipes");

const getAll = async (user_id) => {
  return await Recipes.find({ user_id });
};

const getOne = async (user_id, id) => {
  return await Recipes.find({ _id: id, user_id });
};

const getAllAlphabetically = async (user_id) => {
  return await Posts.find({ user_id }).sort({ recept: 1 });
};

const create = async (data) => {
  const recipe = new Recipes(data);
  return await recipe.save();
};

const update = async (id, data) => {
  return await Recipes.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await Recipes.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getOne,
  getAllAlphabetically,
  create,
  update,
  remove,
};
