const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");

router.get("/", async (req, res) => {
  try {
    const subcategories = await SubCategory.find(req.query?.filter).populate({
      path: "parent",
      select: "name",
    });
    res.json(subcategories);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Unable to fetch subcategory" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, sizes, parent } = req.body;

    const isSubcategory = await SubCategory.findOne({ name });
    if (isSubcategory)
      return res.status(400).json({ message: "Subcategory already present" });

    const subcategory = new SubCategory({
      name: name.trim(),
      sizes,
      parent,
    });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Unable to create sub category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const issubcategory = await SubCategory.findById(req.params.id);
    if (!issubcategory)
      return res.status(400).json({ error: "Unable to find subcategory" });
    await SubCategory.deleteOne();
    res.status(200).json({ message: "SubCategory delted succesfully" });
  } catch (e) {
    res.status(500).json({ error: "Unable to delete subcategory" });
  }
});

module.exports = router;
