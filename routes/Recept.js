const express = require("express");
const { createRecept, getRecept, updateRecept, deleteRecept } = require("../controller/Recept");
const VarifyToken = require("../middleware/VarifyToken");
const router = express.Router();

router.post("/createRecept", createRecept)
router.get("/getRecept", getRecept)
router.post("/updateRecept", updateRecept)
router.delete("/deleteRecept", deleteRecept)
module.exports = router;
