const express = require("express");

const {
  donutList,
  createDonut,
  updateDonut,
  deleteDonut,
} = require("../controllers/donutsController");

const router = express.Router();

router.get("/", donutList);

router.post("/", createDonut);

router.put("/:donutId", updateDonut);

router.delete("/:donutId", deleteDonut);

module.exports = router;
