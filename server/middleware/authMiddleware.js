import ApiError from "../exception/errorException.js";
import tokenService from "../services/tokenService.js";


export default async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      throw ApiError.unauthorized();
    }
    const data = await tokenService.verifyAccessToken(accessToken);
    if (!data) {
      throw ApiError.unauthorized();
    }
    req.user = data;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};