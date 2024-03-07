const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./pkg/config");

const {
  login,
  register,
  refreshToken,
  resetPassword,
} = require("./handlers/auth");

const {
  getAllRecipes,
  createRecipe,
  getAlphabeticallyByTitle,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./handlers/recipes");

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
// moze da bide i put

app.get("/api/recipe", getAllRecipes);
app.post("/api/recipe", createRecipe);
app.get("/api/recipe/title/:user_id", getAlphabeticallyByTitle);
app.get("/api/recipe/:id", getOneRecipe);
app.put("/api/recipe/:id", updateRecipe);
app.delete("/api/recipe/:id", deleteRecipe);

// server startup
app.listen(10000, () => console.log("Server started at port 10000"));
