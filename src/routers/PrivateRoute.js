import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ roles }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");

    if (!token || !userData) {
      setAuthorized(false);
      return;
    }

    try {
      const user = JSON.parse(userData);
      const userRole = user?.Role || user?.role;

      if (roles.includes(userRole)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (err) {
      console.error("User data parsing failed:", err);
      setAuthorized(false);
    }
  }, [roles]);

  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default PrivateRoute;
