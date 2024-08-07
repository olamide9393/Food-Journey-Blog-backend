const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");

// create a token
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// sign up user
const signUp = async (req, res) => {
  try {
    const { name, username,email,password } = req.body;
    // validator
    if (!name || !username || !email || !password) {
      throw Error("All field must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!password.match(passwordRegex)) {
      throw Error("Password is not strong enough");
    }

    // find if email exist
    const exists = await Auth.findOne({ email });
    if (exists) {
      throw Error("email already exist");
    }
    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // register user in database
    const response = await Auth.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    // const token = createToken(response._id);
    res.status(200).json({
      email,
      name,
      token: generateToken(response._id),
      message: "account createded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("All field must be filled");
    }
    // find if the email exist in database
    const response = await Auth.findOne({ email: email });
    // check the email here
    if (!response) {
      throw Error("invalid creadential");
    }
    // chek if password is correct
    const auth = await bcrypt.compare(password, response.password);
    if (!auth) {
      throw Error("invalid creadential");
    }
    res
      .json({
        message: "login success",
        token: generateToken(response._id),
        email,
        _id: response.id,
      
      })
      .status(200);
      // console.log(res);
    // res.json({token:generateToken(response._id)}).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};
// get current user
const getUser = async (req, res) => {
  try {
    const { _id, name, email } = await Auth.findById(req.user.id);
     
      res.status(200).json({name});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data." });
  }
};

// reset password
const reset = async(req, res) => {
 try {
  const { email } = req.body;
  const { id } = req.params;

  // validating email 
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  // find if email already exsit
  const exists = await Auth.findOne({ email });
  if (!exists) {
    throw Error("Email Does Not Exist");
  }
  const result = await Auth.findByIdAndUpdate(id,{ email },{ new: true });
  res.json(result);




 } catch (error) {
  console.log(error);
  
 } 
}



//  get user profile
const userProfile = async (req, res) => {
  try {
    const message = await Auth.findById(req.user.id);
    res.status(200).json({
      message,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data." });
  }
};

// update user

const updateUser = async (req, res) => {
  const user = await Auth.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw Error("no profile found");
  }
  const users = await Auth.findById(req.user.id);
  if (!users) {
    res.status(401);
    throw Error("user not found");
  }

  if (user.users.toString() !== users.id) {
    res.status(401);
    throw Error("not authorizaed");
  }
  try {
    const updateUser = await Auth.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.json(404).json(error);
  }
};
module.exports = { signUp, login, getUser, userProfile, updateUser,reset };
