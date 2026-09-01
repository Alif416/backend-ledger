const express = require("express");
const authController = require("../controllers/auth.controller");
const asyncHandler = require("../middlewares/asyncHandler");

const router = express.Router();

router.post("/register", asyncHandler(authController.register.bind(authController)));
router.post("/login", asyncHandler(authController.login.bind(authController)));

module.exports = router;
