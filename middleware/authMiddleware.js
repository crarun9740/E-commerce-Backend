const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token;

  // 1️⃣ Try to get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Or get token from cookies (if using cookie-based JWT)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, please login first.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, invalid token.",
    });
  }
};

module.exports = authMiddleware;
