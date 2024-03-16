import { createSlice } from "@reduxjs/toolkit";
import AllService from "../services/allServices";
import { setLocalStorageUser } from "../services/localStorage";
import { IUpdateUser } from "../types/data";
import { AppDispatch, RootState } from "./store";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userRequestedSingIn: (state) => {
      state.isLoading = true;
    },
    userRequestedSingUp: (state) => {
      state.isLoading = true;
    },
    userReceved: (state, action) => {
      state.auth = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    userRequestFiled: (state, action) => {
      state.auth = null;
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const {
  userRequested,
  userRequestedSingIn,
  userRequestedSingUp,
  userReceved,
  userRequestFiled,
} = actions;

export const getUserStatus = (state: RootState) => state.auth.isLoading;
export const getUserError = (state: RootState) => state.auth.error;
export const getUser = (state: RootState) => state.auth.auth;

export const checkAuth = () => async (dispatch: AppDispatch) => {
  dispatch(userRequested());
  try {
    await AllService.checkAuth();
  } catch (error) {
    const errors = error?.response?.data;
    dispatch(userRequestFiled(errors));
  }
};
export const loadUserById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(userRequested());
  try {
    const dataUser = await AllService.getUserById(id);
    dispatch(userReceved(dataUser));
  } catch (error) {
    const errors = error?.response?.data;
    dispatch(userRequestFiled(errors));
  }
};
export const updateUserById =
  (id: string, payload: IUpdateUser) => async (dispatch: AppDispatch) => {
    dispatch(userRequested());
    try {
      const answer = await AllService.updateUserById(id, payload);
      const dataUser = await AllService.getUserById(id);
      dispatch(userReceved(dataUser));
      toast.success(answer);
    } catch (error) {
      const errors = error?.response?.data;
      dispatch(userRequestFiled(errors));
    }
  };

export const signIn = (payload, navigate) => async (dispatch: AppDispatch) => {
  dispatch(userRequestedSingIn());

  try {
    const dataUser = await AllService.login(payload);
    setLocalStorageUser(dataUser.user._id);
    dispatch(userReceved(dataUser.user));
    navigate("/");
  } catch (error) {
    const errors = error?.response?.data;
    dispatch(userRequestFiled(errors));
  }
};
export const signUp = (payload, navigate) => async (dispatch: AppDispatch) => {
  dispatch(userRequestedSingUp());
  try {
    const data = await AllService.registration(payload);
    setLocalStorageUser(data.user._id);
    dispatch(userReceved(data.user));
    navigate("/");
  } catch (error) {
    const errors = error?.response?.data;
    dispatch(userRequestFiled(errors));
  }
};
export const logout = (navigate) => async (dispatch: AppDispatch) => {
  dispatch(userRequested());
  try {
    await AllService.logout();
    navigate("/login");
  } catch (error) {
    const errors = error?.response?.data;

    dispatch(userRequestFiled(errors));
  }
};

export default userReducer;
