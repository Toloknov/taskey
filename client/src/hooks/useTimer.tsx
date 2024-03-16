import { useSelector } from "react-redux";
import { IUser } from "../types/data";
import { getUser } from "../store/user";
import { useEffect, useState } from "react";
import { createArray, getPadTime } from "../utils/utils";

const useTimer= () => {
  const user: IUser = useSelector(getUser);

  const time: number = user && user.workInterval * 60;
  const relax: number = user && user.breakInterval;
  const maxCount: number = user && user.intervalCount;

  const [isCounting, setIsCounting] = useState(false);
  const [timerLeft, setTimerLeft] = useState(time);
  const [oneBreak, setOneBreak] = useState(false);
  const [workInterval, setWorkInterval] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);

  const steps: number[] = createArray(maxCount);
  const minute: string = getPadTime(Math.floor(timerLeft / 60));
  const second: string = getPadTime(timerLeft - Number(minute) * 60);

  const handleStart = () => {
    if (timerLeft === 0) setTimerLeft(time);
    setIsCounting(true);
  };
  const handleStop = () => {
    setIsCounting(false);
  };
  const handlePause = () => {
    setIsCounting(false);
    setTimerLeft(time);
    setWorkInterval(0);
    setBreakInterval(0);
  };
  const btnForward = (): void => {
    setWorkInterval((prev) => prev + 1);
    setBreakInterval((prev) => prev + 1);
  };
  const btnBack:()=>void = (): void => {
    setWorkInterval((prev) => prev - 1);
    setBreakInterval((prev) => prev - 1);
  };
  useEffect(() => {
    setTimerLeft(time);
  }, [time]);
  useEffect(() => {
    const audio = new Audio("/media/clock.mp3");

    if (isCounting) {
      const interval = setInterval(() => {
        if (workInterval === maxCount) {
          setBreakInterval(maxCount);
          setTimerLeft(0);
        }
        setTimerLeft((prev) => (prev > 0 ? prev - 1 : 0));
        if (time === timerLeft) {
          audio.play();
          setWorkInterval((prev) => prev + 1);
        }
        if (timerLeft === 1) {
          if (!oneBreak && workInterval !== maxCount) {
            audio.play();
            setOneBreak(true);
            setTimerLeft(relax);
          }
          if (oneBreak && breakInterval !== maxCount) {
            setBreakInterval((prev) => prev + 1);
            setTimerLeft(time);
            setOneBreak(false);
          }
        }
      }, 1000);
      if (timerLeft === 0) setIsCounting(false);

      return () => clearInterval(interval);
    }
  }, [isCounting, timerLeft]);

  return [
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
  ];
};

export default useTimer;
