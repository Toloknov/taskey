import { getSchedule } from './schedule';
import { Ischedule } from "./../types/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AllService from "../services/allServices";
import { IscheduleAdd, IscheduleRemove, IscheduleUpdate } from "../types/data";
import { AppDispatch, RootState } from "./store";

interface IState {
  entities: Ischedule[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IState = {
  entities: [],
  isLoading: true,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    scheduleRequested: (state) => {
      state.isLoading = true;
    },
    addScheduleReceved: (state, action: PayloadAction<Ischedule>) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    scheduleReceved: (state, action: PayloadAction<Ischedule[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    scheduleRequestFiled: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: scheduleReducer, actions } = scheduleSlice;
const { scheduleRequested, scheduleReceved, scheduleRequestFiled, addScheduleReceved } =
  actions;
export const loadScheduleList =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(scheduleRequested());
    try {
      const schedules = await AllService.getSchedule(userId);
      dispatch(scheduleReceved(schedules));
    } catch (e) {
      dispatch(scheduleRequestFiled(e.message));
    }
  };
export const addSchedule = (payload: IscheduleAdd) => async (dispatch: AppDispatch) => {
  dispatch(scheduleRequested());
  try {
    const schedule = await AllService.addSchedule(payload);
    dispatch(addScheduleReceved(schedule));
  } catch (e) {
    dispatch(scheduleRequestFiled(e.message));
  }
};
export const updateSchedule =
  (payload: IscheduleUpdate) => async (dispatch: AppDispatch) => {
    dispatch(scheduleRequested());
    try {
      await AllService.updateSchedule(payload);
      const schedules = await AllService.getSchedule(payload.userId);
      dispatch(scheduleReceved(schedules));
    } catch (e) {
      dispatch(scheduleRequestFiled(e.message));
    }
  };
export const removeSchedule =
  (payload: IscheduleRemove) => async (dispatch: AppDispatch) => {
    dispatch(scheduleRequested());
    try {
      await AllService.removeSchedule(payload);
      const schedules = await AllService.getSchedule(payload.userId);
      dispatch(scheduleReceved(schedules));
    } catch (e) {
      dispatch(scheduleRequestFiled(e.message));
    }
  };
export const getScheduleStatus = (state: RootState) => state.schedule.isLoading;
export const getSchedule = (state: RootState) => state.schedule.entities;

export const getScheduleById = (id: string) => (state: RootState) => {
  if (state.schedule.entities) {
    return state.schedule.entities.find((schedule) => schedule._id === id);
  }
};
export default scheduleReducer;
