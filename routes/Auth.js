const express = require("express");
const { signUp, login, getUser, userProfile, updateUser, reset, } = require("../controller/Auth");
const VarifyToken = require("../middleware/VarifyToken");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/getUser", VarifyToken, getUser);
router.get("/userProfile", VarifyToken, userProfile);
router.patch("/updateUser", VarifyToken, updateUser);
router.patch("/reset", VarifyToken, reset);
// router.patch("/:id", updateuser);
module.exports = router;
