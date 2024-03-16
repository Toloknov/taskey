import "./header.scss";
import defaultUser from "../../assets/images/user-default.png";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user";
import { useLocation } from "react-router-dom";
import burgerMenu from "../../assets/icons/burger.svg";
import { IUser } from "../../types/data";
import logo from "../../assets/icons/logo.svg";
interface IProps {
  setBurger: (prev: boolean) => void;
  burger: boolean;
}
const Header = ({ setBurger, burger }: IProps) => {
  const user: IUser = useSelector(getUser);
  const location = useLocation();
  const newNameLocation =
    location.pathname === "/"
      ? "Task"
      : location.pathname.slice(1)[0].toLocaleUpperCase() +
        location.pathname.slice(2);
  return (
    <div className="header">
      <div className="header_container">
        <h2 className="header_title">
          <button
            className="header_burger-menu"
            onClick={() => setBurger(!burger)}
          >
            <img src={burgerMenu} alt="burger-menu" />
          </button>
          <img src={logo} alt="logo" className="header_logo" /> Taskey
          <span className="header_span">{newNameLocation}</span>
        </h2>
        <button className="header_box">
          <div className="header_data">
            <div className="header_name">{user.name}</div>
            <div className="header_email">{user.email}</div>
          </div>
          <img
            src={user.image || defaultUser}
            alt="avatar"
            className="header_avatar"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
