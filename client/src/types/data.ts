export interface IData {
  [key: string]: string;
}
export interface IUser  {
  email: string;
  activationLink: string;
  createdAt: string;
  image: string;
  isActivated: boolean;
  name: string;
  password: string;
  updatedAt: string;
  _id: string;
  __v: number;
  breakInterval: number;
  intervalCount: number;
  workInterval: number;
}
export interface ITask {
  _id: string;
  user: string;
  task: string;
  dateCompletion: string;
  todoTask: string;
  isCompleted: boolean;
  priority: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ITaskAdd {
  id: string;
  text: string;
  todoTask: string;
  dateCompletion: string | undefined;
}
export interface ITaskRemove {
  id: string;
  userId: string;
}
export interface ITaskUpdate {
  id: string | undefined;
  text?: string;
  isCompleted?: boolean;
  todoTaskName?: string;
  dateCompletion?: string;
  priority?: IPriority;
  userId: string;
}
export interface IPriority {
  value: string;
  background: string;
  color: string;
}
export interface IPropsPomodoro {
  minute: string;
  second: string;
  steps: number[];
  isCounting: boolean;
  workInterval: number;
  breakInterval: number;
  maxCount: number;
  onStop: () => void;
  onStart: () => void;
  onPause: () => void;
  onBack: () => void;
  onForward: () => void;
}

export interface IUpdateUser {
  workInterval: number;
  breakInterval: number;
  intervalCount: number;
}
export interface ISchedule {
  _id: string;
  __v: number;
  user: string;
  updatedAt: string;
  time: string;
  text: string;
  order: number;
  createdAt: string;
  bg: {
    background: string;
    color: string;
    value: string;
  };
}
