import { useSelector } from "react-redux";
import { getUser } from "../../store/user";
import { Navigate, Outlet } from "react-router-dom";
const PrivateUser = () => {
  const user = useSelector(getUser);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateUser;
