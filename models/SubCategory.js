const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sizes: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
