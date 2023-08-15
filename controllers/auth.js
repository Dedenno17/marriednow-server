const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN
const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  let user;

  // check what user input, email or username
  if (!username) {
    if (!email | !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    user = await User.findOne({ username }).exec();
  } else if (!email) {
    if (!username | !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    user = await User.findOne({ username }).exec();
  }

  // check if user exist or not
  if (!user) {
    return res.status(404).json({ message: "Username or Email is wrong" });
  }

  const match = await bycript.compare(password, user.password);

  // check if password match or not
  if (!match) {
    return res.status(404).json({ message: "Password is wrong" });
  }

  // create jwt access & refresh token
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.username,
        isAdmin: user.isAdmin,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // create secure cookie with refresh token
  res.cookie("mnrt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({ accessToken });
});

module.exports = { login };
