import { useDispatch, useSelector } from "react-redux";
import "./task.scss";
import { addTask, getTask, loadTaskList, removeTask } from "../../store/task";
import { useCallback, useEffect, useState } from "react";
import { getLocalStorageUser } from "../../services/localStorage";
import { Option } from "../../ui/option";
import { IData, ITask } from "../../types/data";
import { AppDispatch } from "../../store/store";
import dayjs from "dayjs";

const Task: React.FC = () => {
  const [data, setData] = useState<IData>({});
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(getTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addTaskBluer = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (data[e.target.name]) {
        dispatch(
          addTask({
            id: getLocalStorageUser(),
            text: data[e.target.name],
            todoTask: e.target.name,
            dateCompletion: dayjs(new Date()).format("MMMM D, YYYY"),
          })
        );
      }
      setData((prev) => ({ ...prev, [e.target.name]: "" }));
    },
    [data]
  );
  const deleteTask = (id: string): void => {
    dispatch(removeTask({ id, userId: getLocalStorageUser() }));
  };

  useEffect(() => {
    dispatch(loadTaskList(getLocalStorageUser()));
  }, [addTaskBluer]);

  return (
    <div className="task">
      <ul className="task_lists">
        <Option
          tasks={tasks}
          onDelete={deleteTask}
          name="today"
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        >
          <input
            autoComplete="off"
            type="text"
            className="task_input"
            value={data.today || ""}
            onChange={handleChange}
            onBlur={addTaskBluer}
            name="today"
            placeholder="Add task"
          />
        </Option>

        <Option
          tasks={tasks}
          onDelete={deleteTask}
          name="tomorrow"
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        >
          <input
            autoComplete="off"
            type="text"
            className="task_input"
            placeholder="Add task"
            name="tomorrow"
            value={data.tomorrow || ""}
            onChange={handleChange}
            onBlur={addTaskBluer}
          />
        </Option>

        <Option
          tasks={tasks}
          onDelete={deleteTask}
          name="on this week"
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        >
          <input
            autoComplete="off"
            type="text"
            className="task_input"
            placeholder="Add task"
            name="on this week"
            value={data["on this week"] || ""}
            onChange={handleChange}
            onBlur={addTaskBluer}
          />
        </Option>

        <Option
          tasks={tasks}
          onDelete={deleteTask}
          name="on next week"
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        >
          <input
            autoComplete="off"
            type="text"
            className="task_input"
            placeholder="Add task"
            name="on next week"
            value={data["on next week"] || ""}
            onChange={handleChange}
            onBlur={addTaskBluer}
          />
        </Option>

        <Option
          tasks={tasks}
          onDelete={deleteTask}
          name="later"
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        >
          <input
            autoComplete="off"
            type="text"
            className="task_input"
            placeholder="Add task"
            name="later"
            value={data.later || ""}
            onChange={handleChange}
            onBlur={addTaskBluer}
          />
        </Option>

        <Option
          tasks={tasks}
          onDelete={deleteTask}
          name="completed"
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        >
          <></>
        </Option>
      </ul>
    </div>
  );
};

export default Task;
