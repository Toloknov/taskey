import { useSelector } from "react-redux";
import {  getUser, getUserStatus } from "../../store/user";
import { Navigate, Outlet } from "react-router-dom";
import { List } from "react-content-loader";
const PrivateUser = () => {
  const isLoading = useSelector(getUserStatus);
  const user = useSelector(getUser);

  if (isLoading) {
    return <List />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateUser;
