import jwt from "jsonwebtoken";

export const verifyToken = async (token, res) => {
  if (!token) {
    return res.json({
      success: false,
      message: "not logged in",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      return decoded.id;
    }
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
