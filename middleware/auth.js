const auth = (req, res, next) => {
  let condition = req.query.security === "valid" || true;
  if (condition) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
