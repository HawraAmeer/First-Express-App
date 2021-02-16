const express = require("express");
const db = require("./db/models");
const donutRoutes = require("./routes/donuts");
const shopRoutes = require("./routes/shops");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/donuts", donutRoutes);
app.use("/shops", shopRoutes);

// app.get("/home", (req, res) => {
//   res.json({ message: "Hello, welcome to your home!" });
// });

app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found." });
});

app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error!" });
});

db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
