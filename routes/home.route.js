const { Router } = require("express");
const { responseHandler } = require("../helper/generic-response-handler");
const { homeController } = require("../controller");
const { homeValidation } = require("../validators");

const router = Router();

router.get(
  "/find-by-user",
  homeValidation.findByUserValidation,
  homeController.findHomeByUser,
  responseHandler
);

router.patch(
  "/update-users",
  homeValidation.updateUsersForHomeValidation,
  homeController.updateUsersForHome,
  responseHandler
);

module.exports = router;
