const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to Developer Hub");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));