import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
class TokenService {
  createToken(payload) {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    });
    return { refreshToken, accessToken };
  }
  async saveToken(userId, refreshToken) {
    const token = await Token.findOne({ user: userId });
    if (token) {
      token.refreshToken = refreshToken;
      await token.save();
      return token;
    }
    const newToken = await Token.create({ user: userId, refreshToken });
    return newToken;
  }
  async removeToken(refreshToken) {
    const token = await Token.deleteOne({ refreshToken });
    return token;
  }
  async verifyRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  async verifyAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
