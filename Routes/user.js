const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const userController = require("../controllers/user");

const AuthMiddleware = require("../Middlewares/Auth");

//Criação de usuário
router.post(
    "/Register",
    [body("name", "Nome é necessário").exists({ checkFalsy: true })],
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    [body("pass", "Senha é necessário").exists({ checkFalsy: true })],
    userController.register
);

//Login de usuário
router.post(
    "/Login",
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    [body("pass", "Senha é necessário").exists({ checkFalsy: true })],
    userController.Login
);

router.get(
    "/Infos",
    AuthMiddleware.unsureAuthenticated,
    userController.Infos
);

//Exporta o ROUTER
module.exports = router;
