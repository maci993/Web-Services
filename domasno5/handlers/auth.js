const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { create, getByEmail, setNewPassword } = require("../pkg/account");
const {
  validate,
  AccountLogin,
  AccountRegister,
  AccountReset,
} = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");

//login, register, refreshToken, forgotPassword, resetPassword

// brcypt go koristime da sifrirame password i da go proverime sifriranoto so originalniot password

const login = async (req, res) => {
  // koga se logirame ni se vrakja nov token
  try {
    await validate(req.body, AccountLogin);
    const { email, password } = req.body;
    const account = await getByEmail(email);

    if (!account) {
      return res.status(400).send("Account not found!");
    }
    // +1 failed login attempt

    // const isThisTrue = bcrypt.compareSync(password, account.password);

    if (!bcrypt.compareSync(password, account.password)) {
      return res.status(400).send("Wrong password!");
    }

    // Payload
    // Dosegasnoto vreme od 1 januari 1970 vo sekundi -> new Date().getTime() / 1000
    const payload = {
      fullName: account.fullName,
      email: account.email,
      id: account._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // 7 dena vo idnina
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);

    // JWT token delovi
    // xxxxx.yyyyy.zzzzz
    // header.payload.signature

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    //eyJmdWxsTmFtZSI6IlZhbmdlbCBIcmlzdG92IiwiZW1haWwiOiJoLnZhbmdlbDIyQGdtYWlsLmNvbSIsImlkIjoiNjVkY2Y5ZmQ0NWU0OTkzNTljYTk0NGM4IiwiZXhwIjoxNzA5NTg1NTk5LjE3NywiaWF0IjoxNzA4OTgwNzk5fQ.
    //_k702sS14ix0D1Em9cn2iNDIx7KkO1u9YsKVk5OSE14

    return res.status(200).send({ token }); // req.auth
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  // se vrakja novo kreiraniot korisnik
  try {
    await validate(req.body, AccountRegister);
    const { email, password, confirmPassword, fullName } = req.body;
    const exists = await getByEmail(email);
    // proveri dali postoi korisnik so toj email
    if (exists) {
      return res.status(400).send("Account with this email already exists!");
    }
    // proveri go confirmPassword poleto
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send("Confirm password is not the same as password!");
    }
    req.body.password = bcrypt.hashSync(password); // password-ot e sifriran i e nerazbirliv za nas lugjeto
    const acc = await create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const refreshToken = async (req, res) => {
  // koga pravime refresh na token na veke najaven korisnik ni se vrakja nov token so novo vazecko istekuvanje
  // req.auth postoi koga prethodno se generiral veke token
  const payload = {
    ...req.auth, // ova e nasiot korisnik koj prethodno bil najaven i probuva da go osvezi negoviot token
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // 7 dena vo idnina
  };
  // req.auth {
  //   fullName: 'Semos Edu',
  //   email: 'test@semos.com',
  //   id: '65df92c9c03b58dc90ee9a4e',
  //   exp: 1709756393.206,
  //   iat: 1709151593
  // }
  // req.auth {
  //   fullName: 'Vangel Hristov',
  //   email: 'h.vangel22@gmail.com',
  //   id: '65dcf9fd45e499359ca944c8',
  //   exp: 1709756520.711,
  //   iat: 1709151720
  // }

  const token = jwt.sign(payload, getSection("development").jwt_secret);
  return res.status(200).send({ token }); // req.auth
};

const resetPassword = async (req, res) => {
  // <form>
  // email -> email nema da vi se bara bidejki korisnikot ke go isprati od forgot pass
  // new password
  // old password
  // </form>
  await validate(req.body, AccountReset);
  const { newPassword, oldPassword, email } = req.body;

  const account = await getByEmail(email);

  console.log("account data", account);

  if (!account) {
    return res.status(400).send("Account with this email does not exist!");
  }

  // password: test123 -> cist tekst
  // password in db: $2a$10$y0e/LDTfoTV34GK3qPJCzunBn8bmj5HUQ5Cmlqstt4RuVRRPEA5uO
  // account.password go drzi sifriraniot password zapisan vo databazata

  // Incorrect old password
  if (!bcrypt.compareSync(oldPassword, account.password)) {
    return res.status(400).send("Incorrect old password!");
  }

  // Stariot password nemoze da bide kako noviot password
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

const forgotPassword = async (req, res) => {
  // korisnikot dali postoi vo nasata databaza, go barame istiot po email
  const exists = await getByEmail(req.body.email);
  if (!exists) {
    return res.status(400).send("Account with this email does not exist!");
  }

  // mailgun, nodemailer

  res.send("OK");
};

module.exports = {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
};
