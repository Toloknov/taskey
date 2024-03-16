import { NavLink, useNavigate } from "react-router-dom";
import dashboard from "../../assets/icons/dashboard.svg";
import task from "../../assets/icons/task.svg";
import time from "../../assets/icons/time.svg";
import timeBlock from "../../assets/icons/time-block.svg";
import setting from "../../assets/icons/setting.svg";
import exit from "../../assets/icons/exit.svg";

import "./sidePanel.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { logout } from "../../store/user";
interface IProps {
  setBurger: (burger: boolean) => void;
  burger: boolean;
}
const SidePanel = ({ burger, setBurger }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onExit = () => {
    dispatch(logout(navigate));
  };
  const handleClick = () => {
    if (window.screen.width <= 480) {
      setBurger(!burger);
    }
  };
  return (
    <ul className="sidePanel" style={{ display: burger ? "block" : "none" }}>
      <li className="sidePanel_list">
        <NavLink
          to="dashboard"
          className="sidePanel_link"
          onClick={handleClick}
        >
          <img src={dashboard} alt="dashboard" className="sidePanel_icon" />
          Dashboard
        </NavLink>
        <button onClick={onExit} className="sidePanel_remove">
          <img src={exit} alt="exit" />
        </button>
      </li>
      <li className="sidePanel_list">
        <NavLink
          to="/"
          className="sidePanel_link"
          onClick={handleClick}
        >
          <img src={task} alt="task" className="sidePanel_icon" />
          Task
        </NavLink>
      </li>
      <li className="sidePanel_list">
        <NavLink
          to="/pomodoro"
          className="sidePanel_link"
          onClick={handleClick}
        >
          <img src={time} alt="time" className="sidePanel_icon" />
          Pomodoro
        </NavLink>
      </li>
      <li className="sidePanel_list">
        <NavLink
          to="/timeBlock"
          className="sidePanel_link"
          onClick={handleClick}
        >
          {" "}
          <img src={timeBlock} alt="timeBlock" className="sidePanel_icon" />
          Time blocking
        </NavLink>
      </li>
      <li className="sidePanel_list">
        <NavLink
          to="/setting"
          className="sidePanel_link"
          onClick={handleClick}
        >
          {" "}
          <img src={setting} alt="setting" className="sidePanel_icon" />
          Settings
        </NavLink>
      </li>
    </ul>
  );
};

export default SidePanel;
