import axios from "axios";
import api, { API_URL } from ".";
import { setLocalStorageToken, setLocalStorageUser } from "./localStorage";
import { ITaskAdd, ITaskRemove, ITaskUpdate } from "../types/data";

export default class AllService {
  static async searchStreet(strCity: string, strStreet: string) {
    const city = await axios.get(
      `https://api.dmsolutions.com.ua:2661/api/Cities?sRequest=${strCity}&sLang=ru_RU`,
      {
        headers: {
          Authorization:
            "Bearer EV2kktNuRDUdN0H-7Gqyzy8JZNXAfdR5948EXlAGQS8D-fuYj-7OVPeZ4DGXuY81JtpqS_ebiP6CddBZJn96gHBMpcPWTadS_KLZvJ_rHGHtf-xW2WTsLhtFEyTL-Z-NZ_2T6-QtiE8g9IBvxv2b3rA-A8H_voeBYpJFxiilav7IdBTTPQ2_Vzt35zEjYhPCzhYdb0SyPlBbLo5tLcf8r6s0jocxn_c3EI5kJ0rogjGnjs68ru4WFdxPAhE_NDnTvvqroGvu-V5SC21pOZhshG13Hq6oNcP9avHO-rSbmjy0vt4pTuytP9fPulE3DiPjyowP61uu5n2ZutmoF5JxoFlQsVz_V3tBZvakM_TK86GYYTji7sjJJTYTDmjJLVA1frVhLR7qHursEOFJfh04uQ4ZrU5-5eWvHI3SkzHW6uv6roHhPMVB74FkKf34Lg2wkssDChwBoqkTXMK0y0wfAqICl1XkkF9Y23uDd5u2iCJn3gy811MLBxaHnYg6LgsC",
        },
      }
    );
    const { data } = await axios.get(
      `https://api.dmsolutions.com.ua:2661/api/Streets?sRequest=${strStreet}&stMoniker=${city.data[0].st_moniker}&sLang=uk_UA`,
      {
        headers: {
          Authorization:
            "Bearer EV2kktNuRDUdN0H-7Gqyzy8JZNXAfdR5948EXlAGQS8D-fuYj-7OVPeZ4DGXuY81JtpqS_ebiP6CddBZJn96gHBMpcPWTadS_KLZvJ_rHGHtf-xW2WTsLhtFEyTL-Z-NZ_2T6-QtiE8g9IBvxv2b3rA-A8H_voeBYpJFxiilav7IdBTTPQ2_Vzt35zEjYhPCzhYdb0SyPlBbLo5tLcf8r6s0jocxn_c3EI5kJ0rogjGnjs68ru4WFdxPAhE_NDnTvvqroGvu-V5SC21pOZhshG13Hq6oNcP9avHO-rSbmjy0vt4pTuytP9fPulE3DiPjyowP61uu5n2ZutmoF5JxoFlQsVz_V3tBZvakM_TK86GYYTji7sjJJTYTDmjJLVA1frVhLR7qHursEOFJfh04uQ4ZrU5-5eWvHI3SkzHW6uv6roHhPMVB74FkKf34Lg2wkssDChwBoqkTXMK0y0wfAqICl1XkkF9Y23uDd5u2iCJn3gy811MLBxaHnYg6LgsC",
        },
      }
    );
    return data;
  }

  static async registration(payload: object) {
    const { data } = await api.post("/registration", payload);
    localStorage.setItem("token", data.accessToken);
    return data;
  }

  static async login(payload: object) {
    const { data } = await api.post("/login", { ...payload });
    localStorage.setItem("token", data.accessToken);
    return data;
  }
  static async logout() {
    const { data } = await api.post("/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return data;
  }

  static async checkAuth() {
    const { data } = await axios.get(API_URL + "/refresh", {
      withCredentials: true,
    });
    if (data) {
      setLocalStorageUser(data.user._id);
      setLocalStorageToken(data.accessToken);
    }
    return data;
  }
  static async getUserById(id: number | string) {
    const { data } = await api.get(`/user/${id}`);
    return data;
  }
  static async updateUserById(id: number | string, payload) {
    const { data } = await api.patch(`/user/${id}`, payload);
    return data;
  }
  static async getTask(id: number | string) {
    const { data } = await api.get(`/task/${id}`);
    return data;
  }
  static async addTask(payload: ITaskAdd) {
    const { data } = await api.post(`/addTask/${payload.id}`, {
      text: payload.text,
      todoTask: payload.todoTask,
      dateCompletion: payload.dateCompletion,
    });
    return data;
  }
  static async removeTask(payload: ITaskRemove) {
    const { data } = await api.delete(`/removeTask`, {
      params: { id: payload.id, userId: payload.userId },
    });
    return data;
  }
  static async updateTask(payload: ITaskUpdate) {
    const { data } = await api.patch("updateTask", payload);
    return data;
  }
  static async getSchedule(id: string) {
    const { data } = await api.get(`/schedule/${id}`);
    return data;
  }
  static async addSchedule(payload) {
    const { data } = await api.post(`/schedule`, {
      userId: payload.userId,
      text: payload.text,
      color: payload.color,
      time: payload.time,
    });
    return data;
  }
  static async removeSchedule(payload) {
    const { data } = await api.delete(`/schedule`, {
      params: { id: payload.id, userId: payload.userId },
    });
    return data;
  }
  static async updateSchedule(payload) {
    const { data } = await api.patch("schedule", payload);
    return data;
  }
}
