import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import TokenService from "./tokenService.js";
import { v4 as uuidv4 } from "uuid";
import MailService from "./mailService.js";
import ApiError from "../exception/errorException.js";

class UserService {
  async registration(email, password, rest) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.badRequest("Пользователь с таким емейл уже существует");
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const activationLink = uuidv4();
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
      image: `https://robohash.org/${(Math.random() + 1)
        .toString(36)
        .substring(7)}?set=set3`,
      ...rest,
    });
    await MailService.passMail(
      user.email,
      `${process.env.ACTIVATE_LINK}${activationLink}`
    );
    const token = await TokenService.createToken({ _id: user._id });
    await TokenService.saveToken(user._id, token.refreshToken);
    return { user, ...token };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.badRequest("Пользователь с таким email не существует", {
        email: { msg: "Email is not correct" },
      });
    }

    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
      throw ApiError.badRequest("Не правильный пароль", {
        password: { msg: "Password is not correct" },
      });
    }
    const tokens = TokenService.createToken({ _id: user._id });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    if (!token) {
      throw ApiError.badRequest("Чтобы выйти надо зайти )");
    }
    return token;
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.badRequest("Пользователь с таким ссылкай нет");
    }
    user.isActivated = true;
    await user.save();
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData = await TokenService.verifyRefreshToken(refreshToken);
    const token = await TokenService.findToken(refreshToken);

    if (!userData || !token) {
      throw ApiError.unauthorized();
    }

    const tokens = await TokenService.createToken({ _id: userData._id });
    await TokenService.saveToken(userData._id, tokens.refreshToken);
    return { user: userData, ...tokens };
  }
  async getUser(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }
  
}

export default new UserService();
