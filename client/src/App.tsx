import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  MainContainer,
  Task,
  NotFound,
  DashBoard,
  Login,
  Register,
  Pomodoro,
  TimeBlock,
  Setting,
} from "./pages";
import { useEffect } from "react";
import { PrivateUser } from "./components";
import { getLocalStorageUser } from "./services/localStorage";
import { useDispatch } from "react-redux";
import { checkAuth, loadUserById } from "./store/user";
import { AppDispatch } from "./store/store";
import useTimer from "./hooks/useTimer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadScheduleList } from "./store/schedule";
import { IPropsPomodoro } from "./types/data";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());

    if (getLocalStorageUser()) {
      dispatch(loadUserById(getLocalStorageUser()));
      dispatch(loadScheduleList(getLocalStorageUser()));
    }
  }, []);

  const [
    minute,
    second,
    isCounting,
    steps,
    handleStop,
    handleStart,
    handlePause,
    maxCount,
    workInterval,
    breakInterval,
    btnForward,
    btnBack,
  ] = useTimer();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateUser />}>
          <Route path="/" element={<MainContainer />}>
            <Route index element={<Task />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route
              path="/pomodoro"
              element={
                <Pomodoro
                  minute={minute}
                  second={second}
                  isCounting={isCounting}
                  steps={steps}
                  onStop={handleStop}
                  onStart={handleStart}
                  onPause={handlePause}
                  maxCount={maxCount}
                  workInterval={workInterval}
                  breakInterval={breakInterval}
                  onForward={btnForward}
                  onBack={btnBack}
                />
              }
            />
            <Route path="/timeBlock" element={<TimeBlock />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
