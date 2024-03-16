import { useDispatch } from "react-redux";
import "./dashboard.scss";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";
import { getTask, loadTaskList } from "../../store/task";
import { getLocalStorageUser } from "../../services/localStorage";
import { useSelector } from "react-redux";
import { ITask } from "../../types/data";
const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(getTask);
  useEffect(() => {
    dispatch(loadTaskList(getLocalStorageUser()));
  }, []);
  const findColToTodoTask = (name: string) => {
    return tasks.filter((task: ITask) => task.todoTask === name).length;
  };
  return (
    <div className="dashboard">
      <div className="dashboard_box">
        <h3 className="dashboard_title">Total</h3>
        <p className="dashboard_col">{tasks.length}</p>
      </div>
      <div className="dashboard_box">
        <h3 className="dashboard_title">Completed task</h3>
        <p className="dashboard_col">{findColToTodoTask("completed")}</p>
      </div>
      <div className="dashboard_box">
        <h3 className="dashboard_title">Today tasks</h3>
        <p className="dashboard_col">{findColToTodoTask("today")}</p>
      </div>
      <div className="dashboard_box">
        <h3 className="dashboard_title">Week tasks</h3>
        <p className="dashboard_col">{findColToTodoTask("on this week")}</p>
      </div>
    </div>
  );
};

export default DashBoard;
