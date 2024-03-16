import { useState } from "react";
import "./timeBlock.scss";
import dots from "../../assets/icons/dots.svg";
import remove from "../../assets/icons/remove.svg";
import editing from "../../assets/icons/editing.svg";
import { useDispatch } from "react-redux";
import {
  addSchedule,
  getSchedule,
  removeSchedule,
  updateSchedule,
} from "../../store/schedule";
import { getLocalStorageUser } from "../../services/localStorage";
import { AppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { SelectForm } from "../../common";
import { IPriority, ISchedule } from "../../types/data";
import { getPadTime } from "../../utils/utils";
import { useFormik } from "formik";
import * as Yup from "yup";

export interface IData {
  time?: string;
  text?: string;
}

const TimeBlock = () => {
  const data = useFormik({
    initialValues: {
      text: "",
      time: "",
    },
    validationSchema: Yup.object().shape({
      text: Yup.string().required().min(3),
      time: Yup.number().required(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const [bg, setBg] = useState<IPriority>({
    value: "Primary",
    background: "#007BFF",
    color: "#fff",
  });
  const schedule = useSelector(getSchedule);
  const [currentCard, setCurrentCard] = useState<ISchedule | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const dragStartHandler = (
    e: React.DragEvent<HTMLLIElement>,
    item: ISchedule
  ) => {
    setCurrentCard(item);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };
  const dropHandler = (e: React.DragEvent<HTMLLIElement>, item: ISchedule) => {
    e.preventDefault();
    dispatch(
      updateSchedule({
        userId: getLocalStorageUser(),
        id: item._id,
        currentCard: currentCard,
      })
    );
    setCurrentCard(null);
  };

  const handleSubmit = (data: IData) => {
    if (!currentCard) {
      dispatch(
        addSchedule({ ...data, userId: getLocalStorageUser(), color: bg })
      );
      data.text = "";
      data.time = "";
    } else {
      dispatch(
        updateSchedule({
          userId: getLocalStorageUser(),
          id: currentCard._id,
          text: data.text,
          time: data.time,
          color: bg,
        })
      );
    }
  };

  const removeBtn = (id: string) => {
    dispatch(removeSchedule({ id, userId: getLocalStorageUser() }));
  };
  const changeSchedule = (item: ISchedule) => {
    setCurrentCard(item);
    data.setValues({ text: item?.text, time: item?.time });
  };
  const timeToSleep = {
    min: getPadTime(
      schedule.reduce((acc, item) => acc - item.time, 24 * 60) % 60
    ),
    hour: Math.floor(
      schedule.reduce((acc, item) => acc - item.time, 24 * 60) / 60
    ),
  };

  return (
    <div className="block">
      <ul className="block_lists">
        {schedule &&
          schedule.map((arr) => (
            <li
              key={arr._id}
              className="block_list"
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, arr)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, arr)}
              style={{ background: arr.bg.background, color: arr.bg.color }}
            >
              <div className="block_wrap">
                <img src={dots} alt="bots" className="block_bots" /> {arr.text}{" "}
                <span className="block_min">{`(${arr.time} min.)`}</span>
              </div>
              <div className="block_wrap">
                <button
                  className="block_click"
                  onClick={() => changeSchedule(arr)}
                >
                  <img src={editing} alt="change" className="block_remove" />
                </button>
                <button
                  className="block_click"
                  onClick={() => removeBtn(arr._id)}
                >
                  <img src={remove} alt="remove" className="block_remove" />
                </button>
              </div>
            </li>
          ))}
        <div className="block_sleep">
          {`${timeToSleep.hour} : ${timeToSleep.min}`} hours out 24 of sleep
        </div>
      </ul>

      <form onSubmit={data.handleSubmit} className="block_form">
        <div className="block_container">
          <label htmlFor="text" className="block_label">
            Enter name
          </label>
          <input
            autoComplete="off"
            type="text"
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            placeholder="Dinner"
            name="text"
            id="text"
            value={data.values.text}
            className="block_input"
          />
          {data.touched.text && data.errors.text && (
            <div className="block_error">{data.errors.text}</div>
          )}
        </div>
        <div className="block_container">
          <label htmlFor="time" className="block_label">
            Enter duration (min)
          </label>
          <input
            autoComplete="off"
            type="text"
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            name="time"
            id="time"
            placeholder="20"
            value={data.values.time}
            className="block_input"
          />
          {data.touched.time && data.errors.time && (
            <div className="block_error">{data.errors.time}</div>
          )}
        </div>
        <div>
          <SelectForm
            defaultValue={bg}
            setBg={setBg}
            options={[
              { value: "Dark", background: "#343A40", color: "#fff" },
              { value: "Info", background: "#17A2B8", color: "#fff" },
              { value: "Warning", background: "#FFC107", color: "#343A28" },
              { value: "Danger", background: "#DC3545", color: "#fff" },
              { value: "Success", background: "#28A745", color: "#fff" },
              { value: "Secondary", background: "#6C757D", color: "#fff" },
              { value: "Primary", background: "#007BFF", color: "#fff" },
            ]}
          />
        </div>
        <button type="submit" className="block_btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default TimeBlock;
