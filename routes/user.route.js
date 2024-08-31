const { Router } = require("express");
const { responseHandler } = require("../helper/generic-response-handler");
const { userController } = require("../controller");
const { userValidation } = require("../validators");

const router = Router();

router.get("/find-all", userController.getAllUsers, responseHandler);

router.get(
  "/find-by-home",
  userValidation.findByHomeValidation,
  userController.findUsersByHome,
  responseHandler
);

module.exports = router;
