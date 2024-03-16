import { ITask } from "./../types/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AllService from "../services/allServices";
import { ITaskAdd, ITaskRemove, ITaskUpdate } from "../types/data";
import { AppDispatch, RootState } from "./store";

interface IState {
  entities: ITask[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IState = {
  entities: [],
  isLoading: true,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskRequested: (state) => {
      state.isLoading = true;
    },
    addTaskReceved: (state, action: PayloadAction<ITask>) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    taskReceved: (state, action: PayloadAction<ITask[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    taskRequestFiled: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: taskReducer, actions } = taskSlice;
const { taskRequested, taskReceved, taskRequestFiled, addTaskReceved } =
  actions;
export const loadTaskList =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(taskRequested());
    try {
      const tasks = await AllService.getTask(userId);
      dispatch(taskReceved(tasks));
    } catch (e) {
      dispatch(taskRequestFiled(e.message));
    }
  };
export const addTask = (payload: ITaskAdd) => async (dispatch: AppDispatch) => {
  dispatch(taskRequested());
  try {
    const task = await AllService.addTask(payload);
    dispatch(addTaskReceved(task));
  } catch (e) {
    dispatch(taskRequestFiled(e.message));
  }
};
export const updateTask =
  (payload: ITaskUpdate) => async (dispatch: AppDispatch) => {
    dispatch(taskRequested());
    try {
      await AllService.updateTask(payload);
      const tasks = await AllService.getTask(payload.userId);
      dispatch(taskReceved(tasks));
    } catch (e) {
      dispatch(taskRequestFiled(e.message));
    }
  };
export const removeTask =
  (payload: ITaskRemove) => async (dispatch: AppDispatch) => {
    dispatch(taskRequested());
    try {
      await AllService.removeTask(payload);
      const tasks = await AllService.getTask(payload.userId);
      dispatch(taskReceved(tasks));
    } catch (e) {
      dispatch(taskRequestFiled(e.message));
    }
  };
export const getTaskStatus = (state: RootState) => state.task.isLoading;
export const getTask = (state: RootState) => state.task.entities;

export const getTaskById = (id: string) => (state: RootState) => {
  if (state.task.entities) {
    return state.task.entities.find((task) => task._id === id);
  }
};
export default taskReducer;
