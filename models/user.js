const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  chats: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = function (cb) {
  const token = jwt.sign(
    { name: this.name, email: this.email },
    "adilsiddiqui"
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
