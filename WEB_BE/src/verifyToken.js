import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers["x-access-token"], process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.json({
        success: false,
        message: "token expired",
      });
    }
    return res.json({
      success: false,
      message: "invalid token",
    });
  }
};
