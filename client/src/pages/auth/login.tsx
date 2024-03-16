import { Link, useNavigate } from "react-router-dom";
import arrowRight from "../../assets/icons/arrow-right.svg";
import "./form.scss";
import { IData } from "../../types/data";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/user";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const data = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[A-Z])(?=.*\d).{8,}$/,
          "Must have one capital letter and a number."
        ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (data: IData) => {
    dispatch(signIn(data, navigate));
  };
  return (
    <div className="form">
      <div className="form_wrap">
        <h2 className="form_title">Auth</h2>
        <form onSubmit={data.handleSubmit} className="form_form">
          <div className="form_box">
            <label htmlFor="email" className="form_label">
              Email
            </label>
            <input
              autoComplete="off"
              type="text"
              id="email"
              name="email"
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              value={data.values.email}
              className="form_input"
              placeholder="email"
            />
            {data.touched.email && data.errors.email && (
              <div className="block_error">{data.errors.email}</div>
            )}
          </div>
          <div className="form_box">
            <label htmlFor="password" className="form_label">
              Password
            </label>
            <input
              autoComplete="off"
              type="text"
              id="password"
              name="password"
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              value={data.values.password}
              className="form_input"
              placeholder="pass"
            />
            {data.touched.password && data.errors.password && (
              <div className="block_error">{data.errors.password}</div>
            )}
          </div>
          <button type="submit" className="form_btn">Sign in</button>
          <div className="form_box">
            <Link to="/register" className="form_link">
              Sign up <img src={arrowRight} alt="arrow" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
