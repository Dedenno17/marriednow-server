const dotenv = require("dotenv");
const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

// CREATE SERVER
const app = express();

// CONFIG ENV
dotenv.config();

// PORT
const PORT = process.env.PORT || 5000;

// CONNECT TO MONGODB
dbConnect();

// SET UP SERVER
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// RUN SERVER
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
