const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403).json({
      sucess: false,
      message: "Access denied, admin only",
    });
  }
  next();
};

module.exports = isAdmin;
