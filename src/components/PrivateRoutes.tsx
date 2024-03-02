import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let isActiveToken = localStorage.getItem("access_token")
  let auth = { token: isActiveToken };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
