const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    creator: { type: String, default: "" },
  },
  { timestamps: true }
);

const Theme = mongoose.model("Theme", ThemeSchema);
module.exports = Theme;
