import { useEffect, useRef, useState } from "react";
import "./selectForm.scss";
import { IPriority } from "../../types/data";

interface IProps {
  defaultValue: IPriority;
  onTask?: (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    taskId?: string,
    name?: string,
    option?: IPriority
  ) => void;
  setBg: (option: IPriority) => void;
  taskId?: string;
  name?: string;
  options: IPriority[];
}

const SelectForm = ({
  defaultValue,
  onTask,
  taskId,
  name,
  options,
  setBg,
}: IProps) => {
  const [showList, setShowList] = useState(false);
  const [priority, setPriority] = useState(defaultValue);
  const refState = useRef<HTMLSpanElement | null>(null);
  const handlePriority = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    option: IPriority
  ) => {
    setPriority(option);
    setShowList(false);
    if (name) {
      onTask(e, taskId, name, option);
    } else {
      setBg(option);
    }
  };
  useEffect(() => {
    if (!showList) return;
    const handleClick = (e: Event) => {
      if (refState.current && !refState.current.contains(e.target as Node)) {
        setShowList(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showList]);

  return (
    <div className="select">
      <span
        role="button"
        ref={refState}
        style={{ background: priority.background, color: priority.color }}
        className={"select_view " + (showList ? "active" : "")}
        onClick={() => setShowList(!showList)}
      >
        {priority.value}
      </span>
      <ul className={"select_lists " + (showList ? "active" : "")}>
        {options.map((option) => (
          <li
            key={option.value}
            className="select_list"
            onClick={(e) => handlePriority(e, option)}
            style={{ background: option.background }}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectForm;
