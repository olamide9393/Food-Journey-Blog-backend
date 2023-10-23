const express = require("express");
const { signUp, login, getUser, userProfile, updateUser, } = require("../controller/Auth");
const VarifyToken = require("../middleware/VarifyToken");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/getUser", VarifyToken, getUser);
router.get("/userProfile", VarifyToken, userProfile);
router.patch("/updateUser", VarifyToken, updateUser);
// router.patch("/:id", updateuser);


module.exports = router;
