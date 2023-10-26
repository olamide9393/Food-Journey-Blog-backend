require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
// const cookieParser = require("cookie-parser");

const app = express();
// const corsOptions = {
//   origin: "https://bulk-sms-23yv.onrender.com",
// };
// middleware

app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const Auth = require("./routes/Auth");
const Blog = require("./routes/blog");
const Recept = require("./routes/Recept");

const port = process.env.port || 5000
const connectDB = require("./connect");
const { urlencoded } = require("express");


// routes
app.use("/api/v1/auth/", Auth);
app.use("/api/v1/blog/", Blog);
app.use("/api/v1/recept/", Recept);

// image upload
const storage = multer.diskStorage({
  destination:(req,file,fn)=> {
    fn(null,"images")
  },
  filename:(req,file,fn)=>{
    // fn(null,req.body.name)
    fn(null,"image1.jpg")
  }
})
const upload=multer({storage:storage})
app.post('/api/v1/upload/', upload.single('file'),(req,res)=>{
  res.status(200).json('image has been upload')
})





const start = async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(port, function () {
    console.log("Server is running on port " + port);
  });
};
start();
