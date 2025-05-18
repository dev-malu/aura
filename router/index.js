const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const productRoutes = require("./product");
const categoryRoutes = require("./category");
const subcategoryRoutes = require("./subcategory");
const auth = require("../middleware/auth");

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/subcategory", subcategoryRoutes);

module.exports = router;
