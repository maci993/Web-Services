const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: String,
  password: String,
  confirmPassword: String,
  fullName: String,
  oldPassword: String,
  newPassword: String,
  // wrongPass: Number,
  // succesfullLogin: Number,
});

const Account = mongoose.model("Account", accountSchema, "accounts");

const create = async (acc) => {
  const account = new Account(acc);
  return await account.save();
};

const getById = async (id) => {
  return await Account.findOne({ _id: id });
};

const getByEmail = async (email) => {
  return await Account.findOne({ email });
};

const setNewPassword = async (id, password) => {
  return await Account.updateOne({ _id: id }, { password });
};

const getAll = async () => {
  return await Account.find({});
};

const update = async (id, acc) => {
  return await Account.updateOne({ _id: id }, acc);
};

const remove = async (id) => {
  return await Account.deleteOne({ _id: id });
};

// const updateWrongPass = async (_id, wrongPass) => {
//   return await Account.updateOne({_id}, wrongPass);
// };

// const updateLogin = async (_id, succesfullLogin) => {
//   return await Account.updateOne({_id}, succesfullLogin);
// }

module.exports = {
  create,
  getById,
  getByEmail,
  setNewPassword,
  getAll,
  update,
  remove,
  // updateWrongPass,
  // updateLogin,
};
