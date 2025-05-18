const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");

router.post("/", async (req, res) => {
  try {
    const { name, sizes, category } = req.body;

    const isSubcategory = await SubCategory.findOne({ name });
    if (isSubcategory)
      return res.status(400).json({ message: "Subcategory already present" });

    const subcategory = new SubCategory({
      name: name.trim(),
      sizes,
      parent: category,
    });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Unable to create sub category" });
  }
});

module.exports = router;
