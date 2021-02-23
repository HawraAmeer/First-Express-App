const express = require("express");
const passport = require("passport");

const {
  shopList,
  createShop,
  updateShop,
  deleteShop,
  fetchShop,
  shopDetail,
  createDonut,
} = require("../controllers/shopsController");

const upload = require("../middlewares/multer");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
    next();
  } else next({ status: 404, message: "Shop Not Found." });
});

router.get("/", shopList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createShop
);

router.get("/:shopId", shopDetail);

router.put("/:shopId", upload.single("image"), updateShop);

router.delete("/:shopId", deleteShop);

router.post(
  "/:shopId/donuts",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createDonut
);

module.exports = router;
