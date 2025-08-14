import { MdSpaceDashboard } from "react-icons/md";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaSchool,
  FaMoneyCheckAlt,
   FaChartBar,
    FaMoneyBillAlt
} from "react-icons/fa";
import { BiTask,} from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
import { MdNotifications } from "react-icons/md";
import { RiBookletLine } from 'react-icons/ri';
import { LuClipboardList } from 'react-icons/lu';
import { MdHowToReg,  MdHelpOutline } from 'react-icons/md';
import { PiCertificateLight } from 'react-icons/pi';

export const navAdminLinks = [
  {
    label: "Dashboard",
    icon: <MdSpaceDashboard />,
    children: [
      { label: "Overview", path: "/admin" },
      {label:"Create Admin",path:"/admin/create-admin"},
      { label: "Recent updates", path: "/admin/recent-updates" },
    ],
  },
  {
    label: "Students",
    icon:  <FaUserGraduate />,
    children: [
      { label: "Add Student", path: "/admin/add-student" },
      { label: "Manage Students", path: "/admin/manage-students" },
      { label: "Student Attendance", path: "/admin/student-attendance" },
      {
        label: "Student Performance",
        path: "/admin/student-performance",
      },
    ],
  },
  {
    label: "Teachers",
    icon: <FaChalkboardTeacher />,
    children: [
      { label: "Add Teacher", path: "/admin/add-eacher" },
      { label: "Manage Teachers", path: "/admin/manage_teachers" },
      { label: "Assign Teacher to Course", path: "/admin/assign-teacher-to-course" },
      { label: "Teacher Attendance", path: "/admin/teacher-attendance" },
    ],
  },
  {
    label: "Courses",
    icon: <FaBook /> ,
    children: [
      { label: "Add Course", path: "/admin/add-course" },
      { label: "Manage Courses", path: "/admin/manage-courses" },
    ]
  },
  {
    label: "Batches / Classes",
    icon: <FaSchool />,
    children: [
      { label: "Create Batch/Class", path: "/admin/Create-Batch-Class" },
      { label: "Manage Batches", path: "/admin/manage-batches" },
    ],
  },
  
  {
    label: "Fees Management",
    icon: <FaMoneyCheckAlt />,
    children: [
      { label: "Collect Fees", path: "/admin/collect-fees" },
      { label: "Due Payments", path: "/admin/due-payments" },
    ],
  },
 
  {
    label: "Timetable",
    icon:  <HiOutlineClock />,
    children: [
      { label: "Create Timetable", path: "/admin/create-timetable" },
    ],
  },
  {
    label: "Reports",
    icon: <FaChartBar />,
    children: [
      { label: "Student Reports ", path: "/admin/student-reports" },
      { label: "Attendance Reports", path: "/admin/attendance-reports" },
      { label: "Fees Reports", path: "/admin/fees-reports" },
    ],
  },
  {
    label: "Add Notification",
    icon:  <MdNotifications />,
    children: [
      { label: "Add Notifications ", path: "/admin/send-notification" },
    ]
  },
];
export const navUserLinks = [
  {
    label: "Dashboard",
    icon: <MdSpaceDashboard /> ,
    children: [
      { label: "Overview", path: "/user/" },
      // Overview (enrolled courses, upcoming exams, recent activity)
    ],
  },
  
  {
    label: "My Courses",
    icon: <RiBookletLine />,
    children: [
      { label: "Enrolled Courses", path: "/user/enrolled-courses" },
      { label: "Course Details", path: "/user/course-details" },
    ],
  },
  {
    label: "Assignments",
    icon: <LuClipboardList /> ,
    children: [
      { label: "View Assignments", path: "/user/view-ssignments" },
      { label: "Submit Assignments", path: "/user/submit-assignments" },
      { label: "Check Feedback", path: "/user/check-feedback" },
    ],
  },
  {
    label: "Exams",
    icon: <BiTask /> ,
    children: [
      { label: "Upcoming Exams", path: "/user/upcoming-exams" },
      { label: "Exam Results", path: "/userexam-results" },
    ],
  },
  {
    label: "Attendance",
    icon: <MdHowToReg />,
    children: [
      { label: "View Attendance Record", path: "/user/view-attendance-record" },
    ],
  },
  {
    label: "Timetable",
    icon: <HiOutlineClock /> ,
    children: [
      { label: "Daily Schedule", path: "/user/daily-schedule" },
      { label: "Upcoming Classes", path: "/user/upcoming-classes" },
    ],
  },
  {
    label: "Fees",
    icon: <FaMoneyBillAlt />,
    children: [
      { label: "View Fee Structure", path: "/user/view-fee-structure" },
      { label: "Pay Fees", path: "/user/pay-fees" },
      { label: "Payment History", path: "/user/payment-history" },
    ],
  },
  
  
  {
    label: "Certificates",
    icon: <PiCertificateLight />,
    children: [
      { label: "Download Certificate", path: "/user/download-certificate" },
      { label: "View Eligibility", path: "/user/view-eligibility" },
    ],
  },
  {
    label: "Support / Help",
    icon: <MdHelpOutline />,
    children: [
      { label: "FAQs", path: "/user/faqs" },
      { label: "Raise a Ticket", path: "/user/raise-ticket" },
    ],
  },
];
