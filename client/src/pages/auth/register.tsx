import { Link, useNavigate } from "react-router-dom";
import arrowRight from "../../assets/icons/arrow-right.svg";
import "./form.scss";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/user";
import { IData } from "../../types/data";
import { AppDispatch } from "../../store/store";
import * as Yup from "yup";
import { useFormik } from "formik";

const Register = () => {
  const data = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required().min(2),
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
    dispatch(signUp(data, navigate));
  };

  return (
    <div className="form">
      <div className="form_wrap">
        <h2 className="form_title">Auth</h2>
        <form onSubmit={data.handleSubmit} className="form_form">
          <div className="form_box">
            <label htmlFor="name" className="form_label">
              Name
            </label>
            <input
              autoComplete="off"
              type="text"
              className="form_input"
              id="name"
              name="name"
              placeholder="name"
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              value={data.values.name}
            />
            {data.touched.name && data.errors.name && (
              <div className="block_error">{data.errors.name}</div>
            )}
          </div>
          <div className="form_box">
            <label htmlFor="email" className="form_label">
              Email
            </label>
            <input
              autoComplete="off"
              type="text"
              className="form_input"
              id="email"
              name="email"
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              value={data.values.email}
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
              className="form_input"
              id="password"
              name="password"
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              value={data.values.password}
              placeholder="password"
            />
            {data.touched.password && data.errors.password && (
              <div className="block_error">{data.errors.password}</div>
            )}
          </div>
          {/* <div className="form_box">
            <label htmlFor="" className="form_label">
              Image
            </label>
            <input
              type="file"
              className="form_input-custom-file "
              accept="image/*,.png,jpg,.gif,.web"
              onChange={handleChange}
              name="file"
            />
          </div> */}
          <button type="submit" className="form_btn">Sign up</button>
          <div className="form_box">
            <Link to="/login" className="form_link">
              Sign in <img src={arrowRight} alt="arrow" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
