const { validateUser, validateChat } = require("../utils/validators");
const User = require("../models/user");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.post("/auth", async (req, res) => {
  try {
    const { error } = validateUser.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ email: req.body.email }).select({ __v: 0 });
    if (user) {
      return res.json({ auth_token: user.generateAuthToken() });
    }

    user = new User(req.body);
    await user.save();

    res.json({ auth_token: user.generateAuthToken() });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occured." });
  }
});

router.post("/chats", auth, async (req, res) => {
  try {
    const { error } = validateChat.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    console.log("we are saving chats...");
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $push: { chats: req.body } }
    );
    if (!user)
      return res
        .status(404)
        .json({ error: "User with the given is not found." });

    res.json({ chat: user.chats[user.chats.length - 1] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An unexpected error occured." });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user)
      return res
        .status(404)
        .json({ error: "User with the given email is not found." });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occured." });
  }
});

module.exports = router;
