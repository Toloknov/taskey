import "./pomodoro.scss";
import start from "../../assets/icons/start.svg";
import pause from "../../assets/icons/pause.svg";
import reset from "../../assets/icons/reset-reload.svg";
import { IPropsPomodoro } from "../../types/data";

const Pomodoro = ({
  minute,
  second,
  isCounting,
  workInterval,
  breakInterval,
  steps,
  maxCount,
  onStop,
  onStart,
  onPause,
  onForward,
  onBack,
}: IPropsPomodoro) => {

  return (
    <div className="timer">
      <div>
        <span className="timer_minute">{minute}</span>
        <span className="timer_colon">:</span>
        <span className="timer_second">{second}</span>
      </div>
      <div className="timer_box">
        <button
          className="timer_btn"
          onClick={onBack}
          disabled={breakInterval === 0 ? true : false}
        >
          <svg
            fill="#2e2e2d"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <style type="text/css"></style>
            <path d="M9,18l7-6L9,6V18z" />
          </svg>
        </button>
        {steps.map((step) => (
          <div
            key={step}
            className={
              `timer_step ` +
              (step === workInterval ? "start" : "") +
              (breakInterval >= step ? " passed" : "")
            }
          ></div>
        ))}
        <button
          className="timer_btn"
          onClick={onForward}
          disabled={breakInterval === maxCount ? true : false}
        >
          <svg
            fill="#2e2e2d"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <style type="text/css"></style>
            <path d="M9,18l7-6L9,6V18z" />
          </svg>
        </button>
      </div>

      {isCounting ? (
        <button className="timer_btn-pause" onClick={onStop}>
          <img src={pause} alt="startOrPause" className="timer_icon" />
        </button>
      ) : (
        <button
          className="timer_btn-start"
          onClick={onStart}
          disabled={breakInterval === maxCount}
        >
          <img src={start} alt="startOrPause" className="timer_icon" />
        </button>
      )}

      <button className="timer_btn-reset" onClick={onPause}>
        {" "}
        <img src={reset} alt="reset" className="timer_icon" />
      </button>
    </div>
  );
};

export default Pomodoro;
