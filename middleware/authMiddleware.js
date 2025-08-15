const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(411).json({
      messsage: "Unauthoried, PLease login first.",
    });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyToken);

    req.user = { id: verifyToken.id };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, invalid token.",
    });
  }
};

module.exports = authMiddleware;
