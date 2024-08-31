const express = require("express");
const userRoute = require("./user.route");
const homeRoute = require("./home.route");
router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/home",
    route: homeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
