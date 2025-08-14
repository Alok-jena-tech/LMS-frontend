import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminRoutes from "./routers/AdminRoutes";
import UserRoutes from "./routers/UserRoutes";
import PrivateRoute from "./routers/PrivateRoute";
import { SignUp } from "./pages/SignUp";
import NotFound from "./pages/NotFound";
// import StudentLogin from "./pages/StudentLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notfound" element={<NotFound />} />
        {/* Only the Admin Routes Start */}
        <Route element={<PrivateRoute roles={["Admin"]} />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
        {/* Only the Admin Routes End */}

        {/* Only the Student Routes Start */}
        {/* <Route path="/student-login" element={<StudentLogin />} /> */}

        <Route
          element={
            // <StudProvider>
            <PrivateRoute roles={["User"]} />
            // </StudProvider>
          }
        >
          <Route path="/user/*" element={<UserRoutes />} />
        </Route>
        {/* Only the Admin Routes End */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
