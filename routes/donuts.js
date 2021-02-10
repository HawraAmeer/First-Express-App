const express = require("express");

const {
  donutList,
  createDonut,
  updateDonut,
  deleteDonut,
  fetchDonut,
  donutDetail,
} = require("../controllers/donutsController");

const router = express.Router();

router.param("donutId", async (req, res, next, donutId) => {
  const foundDonut = await fetchDonut(donutId, next);
  if (foundDonut) {
    req.donut = foundDonut;
    next();
  } else next({ status: 404, message: "Donut Not Found." });
});

router.get("/", donutList);

router.post("/", createDonut);

router.get("/:donutId", donutDetail);

router.put("/:donutId", updateDonut);

router.delete("/:donutId", deleteDonut);

module.exports = router;
