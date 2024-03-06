const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  create,
  getByEmail,
  updateLogin,
  updateWrongPass,
  setNewPassword,
  successfullLogin,
  unsuccessfulLogin,
} = require("../pkg/account");

const {
  validate,
  AccountLogin,
  AccountRegister,
  AccountReset,
} = require("../pkg/account/validate");

const { getSection } = require("../pkg/config");

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const { email, password } = req.body;
    const account = await getByEmail(email);
    if (!account) {
      return res.status(400).send("Account not found!");
    }
    if (!bcrypt.compareSync(password, account.password)) {
      await unsuccessfulLogin(email);
      // let wrongPass = account.wrongPass;
      // await updateWrongPass(account._id, wrongPass++);
      // await registerFailedLogin();
      return res.status(400).send("Wrong password!");
    }
    // let succesfullLogin = account.succesfullLogin;
    // await updateLogin(account._id, succesfullLogin++);

    // Payload
    
    const payload = {
      fullName: account.fullName,
      email: account.email,
      id: account._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // 7 dena vo idnina
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    if (token) {
          await successfullLogin(email);
    return res.status(200).send({ token });
  } 
    // let succesfullLogin = account.succesfullLogin
    // await updateLogin(account._id, succesfullLogin++);
    // }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, AccountRegister);
    const { email, password, confirmPassword, fullName} = req.body;
    const exists = await getByEmail(email);
    if (exists) {
      return res.status(400).send("Account with this email already exists!");
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send("Confirm password is not the same as password!");
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error!");
  }
};

const resetPassword = async (req, res) => {
  await validate(req.body, AccountReset);
  const { newPassword, oldPassword, email } = req.body;

  const account = await getByEmail(email);

  console.log("account data", account);

  if (!account) {
    return res.status(400).send("Account with this email does not exist!");
  }
  // Incorrect old password
  if (!bcrypt.compareSync(oldPassword, account.password)) {
    return res.status(400).send("Incorrect old password!");
  }

  if (newPassword === oldPassword) {
    return res.status(400).send("New password cannot be old password!");
  }

  // sifriraj go noviot password pred da go zapises vo databazata
  const newPasswordHashed = bcrypt.hashSync(newPassword);

  const userPasswordChanged = await setNewPassword(
    account._id.toString(),
    newPasswordHashed
  );
  console.log("userPass", userPasswordChanged);

  return res.status(200).send(userPasswordChanged);
};

const refreshToken = async (req, res) => {
  const payload = {
    ...req.auth,
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
  };
  const token = jwt.sign(payload, getSection("development").jwt_secret);
  return res.status(200).send({ token });
};

const forgotPassword = async (req, res) => {
  // korisnikot dali postoi vo nasata databaza, go barame istiot po email
  const exists = await getByEmail(req.body.email);
  if (!exists) {
    return res.status(400).send("Account with this email does not exist!");
  }
res.send("OK");
};

module.exports = {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
};
