const express = require("express");
const { createBlog, getblog, updateblog, deleteblog, getSingleBlog } = require("../controller/blog");
const VarifyToken = require("../middleware/VarifyToken");
const router = express.Router();

router.post("/createBlog", createBlog)
router.get("/getBlog", getblog)
router.post("/updateBlog", updateblog)
router.get("/:id", getSingleBlog)
router.delete("/deleteBlog", deleteblog)
module.exports = router;