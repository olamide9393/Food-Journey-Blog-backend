const Recept = require("../model/Recept");

// create recept
const createRecept = async (req, res) => {
  const { title, category, ingredients, description,photo,preparation } = req.body;
  try {
    const response = await Recept.create({
      title,
      category,
      ingredients,
      description,
      photo,
      preparation
    });
    res.json({ message: "Added", response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all Recept
const getRecept = async (req, res) => {
  try {
    const result = await Recept.find();
    res.json({ status: 200, result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single recept
const getSingleRecept = async(req, res)=>{
  const {id} = req.params
  try{
           const result = await Recept.findById(id)
           res.json(result)

  }catch(err){
           res.json(err)
           console.log(err);
  }
}

// update Recept
const updateRecept = async (req, res) => {
  const { id } = req.params;
  const { title, category, ingredients, description,instructions } = req.body;
  try {
    const result = await Recept.findByIdAndUpdate(
      id,
      { title, category, ingredients, description },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

// delete Recept
const deleteRecept = async (req, res) => {
  const { id } = req.params;
  try {
    await Recept.findByIdAndDelete(id);
    res.json({ message: "deleted" });
  } catch (error) {
    res.json({ error, message: "dhdhh" });
    console.log(error);
  }
};

module.exports = { createRecept, getRecept,getSingleRecept, updateRecept, deleteRecept };
