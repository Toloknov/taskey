import "./setting.scss";
import { useSelector } from "react-redux";
import { getUser, updateUserById } from "../../store/user";
import { IUser } from "../../types/data";
import { getLocalStorageUser } from "../../services/localStorage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
interface IData {
  workInterval: number;
  breakInterval: number;
  intervalCount: number;
}
const Setting = () => {
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch<AppDispatch>();
  const data = useFormik({
    initialValues: {
      workInterval: user.workInterval,
      breakInterval: user.breakInterval,
      intervalCount: user.intervalCount,
    },
    validationSchema: Yup.object().shape({
      workInterval: Yup.number().required().min(1),
      breakInterval: Yup.number().required().min(1),
      intervalCount: Yup.number().required().max(10),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (data: IData) => {
    dispatch(updateUserById(getLocalStorageUser(), data));
  };

  return (
    <div className="setting">
      <h2 className="setting_title">Timer settings</h2>
      <form onSubmit={data.handleSubmit} className="setting_form">
        <div className="setting_wrap">
          <label htmlFor="workInterval" className="setting_label">
            Work interval (min)
          </label>
          <input
            type="text"
            id="workInterval"
            name="workInterval"
            className="setting_input"
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            value={data.values.workInterval}
          />
          {data.touched.workInterval && data.errors.workInterval && (
            <div className="block_error">{data.errors.workInterval}</div>
          )}
        </div>

        <div className="setting_wrap">
          <label htmlFor="breakInterval" className="setting_label">
            Break interval (min)
          </label>
          <input
            type="text"
            id="breakInterval"
            name="breakInterval"
            className="setting_input"
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            value={data.values.breakInterval}
          />
          {data.touched.breakInterval && data.errors.breakInterval && (
            <div className="block_error">{data.errors.breakInterval}</div>
          )}
        </div>
        <div className="setting_wrap">
          <label htmlFor="intervalCount" className="setting_label">
            Interval count (max 10)
          </label>
          <input
            type="text"
            id="intervalCount"
            name="intervalCount"
            className="setting_input"
            onBlur={data.handleBlur}
            onChange={data.handleChange}
            value={data.values.intervalCount}
          />
          {data.touched.intervalCount && data.errors.intervalCount && (
            <div className="block_error">{data.errors.intervalCount}</div>
          )}
        </div>
        <button type="submit" className="setting_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default Setting;
