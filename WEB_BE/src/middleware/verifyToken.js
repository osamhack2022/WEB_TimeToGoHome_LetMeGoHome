import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        success: false,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      success: false,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
