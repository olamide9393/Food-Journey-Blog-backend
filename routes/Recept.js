const express = require("express");
const { createRecept, getRecept, updateRecept, deleteRecept, getSingleRecept } = require("../controller/Recept");
const VarifyToken = require("../middleware/VarifyToken");
const router = express.Router();

router.post("/createRecept", createRecept)
router.get("/getRecept", getRecept)
router.get("/:id", getSingleRecept)
router.post("/updateRecept", updateRecept)
router.delete("/deleteRecept", deleteRecept)
module.exports = router;
