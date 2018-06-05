const express = require("express");
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

//use routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

//start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
