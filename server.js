const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
const path = require("path")

const app = express();

app.use(fileUpload());

const cors = require("cors");

//dotenv configuration
dotenv.config({ path: "./config/config.env" });

//database connection function
const connectDB = require("./config/connectdb");

//connect to DB
connectDB();

//Routes
const PlayerProfileRoute = require("./routes/PlayerProfileRoute")
const CoachProfileRoute = require("./routes/CoachesProfileRoute")
const UserRoute = require("./routes/UserRoute")

//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Express bodyparser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Initialize Passort
app.use(passport.initialize());
//get passport function
require("./config/passport")(passport);

//Use Routes
app.use("/", UserRoute)
app.use("/", PlayerProfileRoute)
app.use("/", CoachProfileRoute)
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build",     
    "index.html"));
  });
}


const PORT = process.env.PORT || 5000;
//app.set('port', process.env.PORT || 5000);

app.listen(PORT, () => console.log(`Server running on PORT localhost:${PORT}`));