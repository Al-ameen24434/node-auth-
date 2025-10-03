const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Token is not valid",
        });
      }
      req.userInfo = user;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = authMiddleware;
