const express = require("express");

const {
  donutList,
  updateDonut,
  deleteDonut,
  fetchDonut,
  donutDetail,
} = require("../controllers/donutsController");

const upload = require("../middlewares/multer");

const router = express.Router();

router.param("donutId", async (req, res, next, donutId) => {
  const foundDonut = await fetchDonut(donutId, next);
  if (foundDonut) {
    req.donut = foundDonut;
    next();
  } else next({ status: 404, message: "Donut Not Found." });
});

router.get("/", donutList);

router.get("/:donutId", donutDetail);

router.put("/:donutId", upload.single("image"), updateDonut);

router.delete("/:donutId", deleteDonut);

module.exports = router;
