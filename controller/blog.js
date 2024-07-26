const Blog = require("../model/blog");

// create blog
const createBlog = async (req, res) => {
  const { title, category, ingredients, description,photo } = req.body;
  try {
    const response = await Blog.create({
      title,
      category,
      description,
      photo,
      ingredients,
    });
    res.json({ message: "Added", response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all blog
const getblog = async (req, res) => {
  try {
    const result = await Blog.find();
    res.json({ status: 200, result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single blog
const getSingleBlog = async(req, res)=>{
  const {id} = req.params
  try{
           const result = await Blog.findById(id)
           res.json(result)

  }catch(err){
           res.json(err)
           console.log(err);
  }
}

// update blog
const updateblog = async (req, res) => {
  const { id } = req.params;
  const { title, category, photo, description } = req.body;
  try {
    const result = await Blog.findByIdAndUpdate(id,{ title, category, ingredients, description,photo },{ new: true });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

// delete blog
const deleteblog = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.json({ message: "deleted" });
  } catch (error) {
    res.json({ error, message: "dhdhh" });
    console.log(error);
  }
};

module.exports = { createBlog, getblog, updateblog, deleteblog,getSingleBlog };
