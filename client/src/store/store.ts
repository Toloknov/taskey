import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import taskReducer from "./task";
import scheduleReducer from "./schedule";

const rootReducer = combineReducers({
  auth: userReducer,
  task: taskReducer,
  schedule: scheduleReducer,
});
export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
