const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./pkg/config");
const { login, register, refreshToken, resetPassword } = require("./handlers/auth");

require("./pkg/db");

const app = express();

// middlewares
app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      //dokolku sme na nekoja od ovie pateki nema da ni bara da bideme avtenticirani
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/reset-password",
    ],
  })
);

// routes -  GET, POST, PUT, PATCH, DELETE
app.post("/api/auth/login", login);
app.get("/api/auth/refresh-token", refreshToken);
app.post("/api/auth/register", register);
app.post("/api/auth/reset-password", resetPassword);
// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});