const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { postRoutes, profileRoutes, userRoutes } = require("./routes");
const { mongoURI } = require("./config/keys");

//create server
const app = express();
const PORT = process.env.PORT || 5000;
//eatablish db connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connection successfull !!!"))
  .catch(err => console.log("MongoDB connection error -->", err));

//add body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//use routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

//start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
