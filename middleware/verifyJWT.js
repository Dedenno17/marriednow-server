const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization;

  // check if headers is exist or not
  if (!authHeaders?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  const token = authHeaders.split(" ")[1];

  // verify jwt
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = decoded.UserInfo.username;
    req.isAdmin = decoded.UserInfo.isAdmin;
    next();
  });
};

module.exports = { verifyJWT };
