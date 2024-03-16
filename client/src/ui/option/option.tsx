import { forwardRef, useRef, useState } from "react";
import "./option.scss";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/task";
import { getLocalStorageUser } from "../../services/localStorage";
import { IData, IPriority, ITask } from "../../types/data";
import { AppDispatch } from "../../store/store";
import { autoSize } from "../../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import dayjs from "dayjs";
import { SelectForm } from "../../common";
import remove from "../../assets/icons/remove.svg";

interface IProps {
  tasks: ITask[];
  onDelete: (id: string) => void;
  name: string;
  currentTask: ITask | null;
  setCurrentTask: (task: ITask | null) => void;
  children: JSX.Element | JSX.Element[];
}

const Option = ({
  tasks,
  onDelete,
  name,
  currentTask,
  setCurrentTask,
  children,
}: IProps) => {
  const [data, setData] = useState<IData>({});

  const dispatch = useDispatch<AppDispatch>();
  const refInputFocus = useRef<React.RefObject<HTMLDivElement>>(null);
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateTaskBluer = (
    e: React.KeyboardEvent<HTMLTextAreaElement> | string,
    id: string,
    todoTaskName?: string,
    priority?: IPriority
  ) => {
    if (typeof e === "string") {
      dispatch(
        updateTask({
          id,
          dateCompletion: e,
          userId: getLocalStorageUser(),
          todoTaskName,
        })
      );
    } else {
      dispatch(
        updateTask({
          id,
          text: data[e.target.name],
          userId: getLocalStorageUser(),
          todoTaskName,
          priority: {
            background: priority?.background ?? "",
            color: priority?.color ?? "",
            value: priority?.value ?? "",
          },
        })
      );
    }
  };

  const changeCompleted = (completed: boolean, id: string) => {
    dispatch(
      updateTask({
        id,
        isCompleted: !completed,
        userId: getLocalStorageUser(),
      })
    );
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    task: ITask
  ) => {
    setCurrentTask(task);
  };

  const dragLeaveHandler = () => {
  };
  const dragEndHandler = (
    e: React.DragEvent<HTMLLIElement | HTMLDivElement>
  ) => {

    const target = e.target as HTMLDivElement;

    target.classList.add("drag-end");
  };

  const dragOverHandler = (
    e: React.DragEvent<HTMLLIElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("options_list")) {
      target.classList.add("drag-over");
      setTimeout(() => {
        target.classList.remove("drag-over");
      }, 1000);
    }
  };

  const dropHandler = (
    e: React.DragEvent<HTMLLIElement | HTMLDivElement>,
    todoTask: string
  ) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.classList.add("drag-end");
    dispatch(
      updateTask({
        id: currentTask?._id,
        userId: getLocalStorageUser(),
        todoTaskName: todoTask,
        isCompleted: false,
      })
    );
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="options_datepicker" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <li
      className="options_list"
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, name)}
    >
      <span className="options_name">{name}</span>
      {tasks &&
        tasks
          .filter((t) => t.todoTask === name)
          .map((task) => (
            <div
              key={task._id}
              className={
                "options " +
                (dayjs(task.dateCompletion).diff(dayjs(new Date()), "day") <
                  0 && task.todoTask !== "completed"
                  ? "error"
                  : "")
              }
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, task)}
              onDragLeave={dragLeaveHandler}
              onDragEnd={dragEndHandler}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, task.todoTask)}
            >
              <label htmlFor="item" className="options_objective">
                {task.todoTask === "completed" ? (
                  <>
                    <span className="options_fake active"></span>
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="item"
                      className="options_checkbox"
                    />
                    <div className="options_completed">{task.task}</div>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() =>
                        changeCompleted(task.isCompleted, task._id)
                      }
                      className={
                        "options_fake " + (task.isCompleted ? "active" : "")
                      }
                    ></span>
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="item"
                      className="options_checkbox"
                    />{" "}
                    <textarea
                      rows={Math.ceil(task.task.length / 24)}
                      autoComplete="off"
                      ref={refInputFocus}
                      type="text"
                      className="options_textarea"
                      onKeyUp={(e) => updateTaskBluer(e, task._id, name)}
                      value={data[task._id] ?? task.task}
                      onKeyDown={() => autoSize(refInputFocus.current)}
                      onChange={handleChange}
                      name={task._id}
                    />
                  </>
                )}
              </label>
              <div className="options_date">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="options_datepicker-icon"
                >
                  <path
                    d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <DatePicker
                  selected={task.dateCompletion}
                  onChange={(date) =>
                    updateTaskBluer(
                      dayjs(date).format("MMMM D, YYYY"),
                      task._id,
                      name
                    )
                  }
                  customInput={<ExampleCustomInput />}
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <SelectForm
                defaultValue={task.priority}
                onTask={updateTaskBluer}
                taskId={task._id}
                name={name}
                options={[
                  { value: "High", background: "#cf1616", color: "#fff" },
                  { value: "Middle", background: "#ffa500", color: "#fff" },
                  { value: "Low", background: "#08a8ff", color: "#fff" },
                ]}
              />
              <button
                className="options_delete"
                onClick={() => onDelete(task._id)}
              >
                <img src={remove} alt="remove" />
              </button>
            </div>
          ))}
      {children}
    </li>
  );
};

export default Option;
