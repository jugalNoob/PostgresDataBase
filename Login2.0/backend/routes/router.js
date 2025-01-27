const express = require("express");
const router = new express.Router();
const controllers=require("../controollers/userControllers")
const auth=require("../jwt/auth")

router.post("/sign", controllers.first);

router.post("/login", controllers.login);

router.get("/protected", auth, controllers.auths);

module.exports = router;