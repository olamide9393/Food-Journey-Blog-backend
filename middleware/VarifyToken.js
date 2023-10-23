const jwt = require("jsonwebtoken");
const Auth = require("../model/Auth");

const VarifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Only set req.user if token is successfully verified
      req.user = await Auth.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send(error.message);
    }
  } else {
    // Handle the case where there is no Authorization header
    res.status(401).send("No token provided");
  }
};

module.exports = VarifyToken;
