import { Routes, Route } from "react-router-dom";

import UserOverview from "../pages/Student/dashboard/index";
import NotFound from "../pages/NotFound";
import Layout from "../components/drawer/layout";


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserOverview />} />
        

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
