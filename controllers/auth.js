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

// REGISTER
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check duplicate
  const duplicateUserByUsername = await User.findOne({ username })
    .lean()
    .exec();
  const duplicateUserByEmail = await User.findOne({ email }).lean().exec();

  if (duplicateUserByUsername) {
    return res.status(409).json({ message: "Username already exist" });
  }
  if (duplicateUserByEmail) {
    return res.status(409).json({ message: "Email already exist" });
  }

  // hashed password
  const hashPassword = await bycript.hash(password, 10);

  // create user
  const objUser = { username, email, password: hashPassword };
  const user = await User.create(objUser);

  if (user) {
    return res.status(201).json({ message: "New User successfully created" });
  } else {
    return res.status(404).json({ message: "Invalid data received" });
  }
});

// GET USER DATA BY ACCESS TOKEN
const getProfileUser = asyncHandler(async (req, res) => {
  const username = req.user;

  // find user by decoding access token
  const user = await User.findOne({ username }).select("-password").lean();

  // check if there are no user found
  if (!user) {
    return res.status(404).json({ message: "User is not found" });
  }

  res.status(200).json(user);
});

// REFRESH TOKEN
const refreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  // create access token
  const refreshToken = cookies.mnrt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const user = await User.findOne({ username: decoded.username });

      if (!user) return res.status(401).json({ message: "Unauthorize" });

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

      res.status(200).json({ accessToken });
    })
  );
});

module.exports = { login, register, getProfileUser, refreshToken };
