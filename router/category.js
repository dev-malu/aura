const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const isCategory = await Category.findOne({
      name: name.toLowerCase().trim(),
    });
    if (isCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }
    const category = new Category({ name: name.toLowerCase().trim() });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({ error: "No such category exists" });
    }
    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json("Couldn't delete category");
  }
});

module.exports = router;
