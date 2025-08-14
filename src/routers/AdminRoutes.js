import { Routes, Route } from "react-router-dom";
import AdminOverview from "../pages/Admin/dashboard/index"; // Ensure correct import
import NotFound from "../pages/NotFound";
import Layout from "../components/drawer/layout";
import RecentUpdates from "../pages/Admin/dashboard/RecentUpdates";
import AddStudent from "../pages/Admin/students/AddStudent";
import ManageStudent from "../pages/Admin/students/ManageStudent";
import StudentAttendance from "../pages/Admin/students/StudentAttendance";
import AddTeacher from "../pages/Admin/teachers/AddTeacher";
import StudentPerformance from "../pages/Admin/students/StudentPerformance";
import ManageTeacher from "../pages/Admin/teachers/ManageTeacher";
import AssignTeacherToCourse from "../pages/Admin/teachers/AssignTeacherToCourse";
import TeacherAttendance from "../pages/Admin/teachers/TeacherAttendance";
import AddCourse from "../pages/Admin/courses/AddCourse";
import ManageCourses from "../pages/Admin/courses/ManageCourses";
import CreateBatchClass from "../pages/Admin/batchesClasses/CreateBatchClass";
import ManageBatches from "../pages/Admin/batchesClasses/ManageBatches";
import CollectFees from "../pages/Admin/feesManagement/CollectFees";
import DuePayment from "../pages/Admin/feesManagement/DuePayment";
import CreateTimeTable from "../pages/Admin/timetable/CreateTimeTable";
import StudentReports from "../pages/Admin/reports/StudentReports";
import AttendanceReports from "../pages/Admin/reports/AttendanceReports";
import FeesReports from "../pages/Admin/reports/FeesReports";
import AddNotification from "../pages/Admin/notifications/AddNotification"
import MakeAdmin from "../pages/Admin/dashboard/MakeAdmin";

import { StudProvider } from "../contexts/StudContext";
import { CourseProvider } from "../contexts/CourseContext";
import { BatchProvider } from "../contexts/BatchContext";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AdminOverview />} />
        <Route path="/recent-updates" element={<RecentUpdates />} />
        <Route path="/create-admin" element={<MakeAdmin />} />

        <Route
          path="/add-student"
          element={
            <StudProvider>
              <AddStudent />
            </StudProvider>
          }
        />
        <Route
          path="/manage-students"
          element={
            <StudProvider>
              <ManageStudent />
            </StudProvider>
          }
        />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="/student-performance" element={<StudentPerformance />} />

        <Route path="/add-eacher" element={<AddTeacher />} />
        <Route path="/manage_teachers" element={<ManageTeacher />} />
        <Route
          path="/assign-teacher-to-course"
          element={<AssignTeacherToCourse />}
        />
        <Route path="/teacher-attendance" element={<TeacherAttendance />} />
        <Route
          path="/add-course"
          element={
            <CourseProvider>
              <AddCourse />
            </CourseProvider>
          }
        />
        <Route
          path="/manage-courses"
          element={
            <CourseProvider>
              <ManageCourses />
            </CourseProvider>
          }
        />
       
        <Route
          path="/Create-Batch-Class"
          element={
            <BatchProvider>
              <CreateBatchClass />
            </BatchProvider>
          }
        />
        <Route
          path="/manage-batches"
          element={
            <BatchProvider>
              <ManageBatches />
            </BatchProvider>
          }
        />
        
        <Route path="/collect-fees" element={<CollectFees />} />
        <Route path="/due-payments" element={<DuePayment />} />
        <Route path="/create-timetable" element={<CreateTimeTable />} />
        <Route path="/student-reports" element={<StudentReports />} />
        <Route path="/attendance-reports" element={<AttendanceReports />} />
        <Route path="/fees-reports" element={<FeesReports />} />
        <Route path="/send-notification" element={<AddNotification />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
