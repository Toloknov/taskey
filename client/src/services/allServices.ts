import axios from "axios";
import api, { API_URL } from ".";
import { setLocalStorageToken, setLocalStorageUser } from "./localStorage";
import { ITaskAdd, ITaskRemove, ITaskUpdate } from "../types/data";

export default class AllService {
 
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
