const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Hash password
userSchema.pre("save", async function (next) {
  if (this.password && (this.isNew || this.isModified("password"))) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
