const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");


const animalRoutes = require("./routes/animal.js");
const farmerRoutes = require("./routes/farmer.js");
const examinationRoutes = require("./routes/examination.js");

const port = process.env.PORT || 5000;

dotenv.config();

const connect = async () => {
  try {
      await mongoose.connect(process.env.MONGOOSE);
      console.log("connected to mongodb");
  } catch (err) {
      console.log(err);
  }
}

// middleware
app.use(express.json());
app.use(morgan("common")); // konsola log veriyor
app.use(cors());

app.use("/animal",animalRoutes);
app.use("/farmer",farmerRoutes);
app.use("/examination",examinationRoutes);

const server = app.listen(port, () => {
  connect();
  console.log("Server is running on port ", port);
});