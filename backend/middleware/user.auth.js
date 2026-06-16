import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ success: false, message: "Please login to continue" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "Session expired. Please login again.",
        });
      }
      return res.json({ success: false, message: "Please login to continue" });
    }
  } catch (error) {
    res.json({ success: false, message: "Please login to continue" });
  }
};

export default userAuth;
