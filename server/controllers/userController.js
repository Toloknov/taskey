import ApiError from "../exception/errorException.js";
import UserService from "../services/userService.js";
import { validationResult } from "express-validator";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/User.js";
import tokenService from "../services/tokenService.js";
class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors.errors[0].msg, errors.mapped()));
      }
      const { email, password, ...rest } = req.body;
      const data = await UserService.registration(email, password, rest);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("login errors", errors.mapped()));
      }
      const { email, password } = req.body;
      const data = await UserService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const { link } = req.params;
      if (!link) {
        throw new Error("Unauthorized");
      }
      await UserService.activate(link);
      return res.redirect(process.env.URL_CLIENT);
    } catch (e) {
      next(e);
    }
  }
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUser(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const payload = req.body;
      console.log(payload, id);
      await User.updateOne(
        { _id: id },
        {
          workInterval: payload.workInterval,
          breakInterval: payload.breakInterval,
          intervalCount: payload.intervalCount,
        }
      );
      res.json("success update");
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
