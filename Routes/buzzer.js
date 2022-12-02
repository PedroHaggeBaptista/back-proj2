const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const buzzerController = require("../controllers/buzzer");


//Criar registro de palestra e todos os alunos que participaram
router.get(
    "/ligar/:topic",
    [param("topic", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    buzzerController.ligarBuzzer
);

router.get(
    "/desligar/:topic",
    [param("topic", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    buzzerController.desligarBuzzer
);

//Exporta o ROUTER
module.exports = router;
