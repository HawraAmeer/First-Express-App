const express = require("express");

const db = require("./db/models");

const donutRoutes = require("./routes/donuts");

const app = express();

app.use(express.json());

app.use("/donuts", donutRoutes);

// app.get("/home", (req, res) => {
//   res.json({ message: "Hello, welcome to your home!" });
// });

db.sequelize.sync();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
