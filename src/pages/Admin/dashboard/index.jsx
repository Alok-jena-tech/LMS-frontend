import Table from "../../../components/ui/Table";
import styles from "../../Admin/dashboard/index.module.css";
import { studentsData } from "../../../datas/StudentData";
import Modal from "../../../components/ui/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import MainLoader from "../../../components/ui/Loader";
export default function AdminOverview() {
  const isLoading = useSelector((state) => state.loader.main_loader);
  const [modalType, setModalType] = useState(null);
  const [modalUserData, setModalUserData] = useState({});

  const TOTAL_FEES = 50000;
  const paymentTableData = studentsData.map((student, index) => {
    const times = student.dates.length;
    const totalPaid = student.dates.reduce((sum, entry) => sum + entry.paid, 0);
    const paidPercentage = (totalPaid / TOTAL_FEES) * 100;
    return {
      id: student.id,
      name: (
        <div className={styles.name}>
          <img src={student.avatar} alt="mg" className={styles.avatar} />
          <p>{student.name}</p>
        </div>
      ),
      dates: (
        <div className={styles.scrollableCell}>
          {student.dates.map((d, i) => (
            <div key={i}>{`${d.date}: ₹${d.paid}`}</div>
          ))}
        </div>
      ),
      times: <div className={styles.times}>{times}</div>,
      totalPaid: (
        <div className={styles.totalPaid}>
          <div
            className={
              paidPercentage >= 90
                ? styles.signOfgood
                : paidPercentage >= 45
                  ? styles.signOfmiddle
                  : styles.signOfbed
            }
          ></div>
          <div>{`₹${totalPaid}`}</div>
        </div>
      ),
      paidFull: student.totalPaid >= TOTAL_FEES,
    };
  });

  const enrolledClasses = studentsData.map((student, index) => {
    return {
      name: (
        <div className={styles.name}>
          <img src={student.avatar} alt="mg" className={styles.avatar} />
          <p>{student.name}</p>
        </div>
      ),
      courses: (
        <ul className={styles.courseList}>
          {student.courses.map((course, idx) => (
            <li key={idx}>
              <strong>{course.name}</strong> — {course.teacher}
            </li>
          ))}
        </ul>
      ),
    };
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const attendanceTableData = studentsData.map((student) => {
    const monthBars = {};
    months.forEach((month) => {
      const percent = student.attendance?.[month] || 0;
      monthBars[month] = (
        <div className={styles.attendanceBarContainer}>
          <div
            className={styles.attendanceBar}
            style={{
              width: `${percent}%`,
              backgroundColor:
                percent >= 85
                  ? "#4caf50"
                  : percent >= 60
                    ? "#ff9800"
                    : "#f44336",
            }}
          >
            <span className={styles.attendancePercent}>{percent}%</span>
          </div>
        </div>
      );
    });

    return {
      name: (
        <div className={styles.name}>
          <img src={student.avatar} alt="avatar" className={styles.avatar} />
          <p>{student.name}</p>
        </div>
      ),
      ...monthBars,
    };
  });

  // const add = () => alert("Add new user");

  // const actions = {
  //   view: (row) => alert("Viewing: " + JSON.stringify(row)),
  //   edit: (row) => alert("Editing: " + JSON.stringify(row)),
  //   delete: (row) => alert("Deleting: " + JSON.stringify(row)),
  // };

  const actions = {
    view: (row, View) => {
      // alert(`Viewing ${row.name}`);
      setModalType(View);
      setModalUserData(row.id);
    },
    edit: (row, Edit) => {
      // alert(`Editing ${row.name}`)
      setModalType(Edit);
      setModalUserData(row.id);
    },
    delete: (row, Delete) => {
      // if (!row.paidFull) alert(`Deleting ${row.name}`);
      setModalType(Delete);
      setModalUserData(row.id);
    },
  };

  return isLoading ? (
    <MainLoader />
  ) : (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.card1}>
          <h2>Student Payment Summary</h2>
          {/* <h3>Total Fees: ₹{TOTAL_FEES}</h3> */}

          <Table
            columns={["name", "times", "dates", "totalPaid"]}
            data={paymentTableData}
            actions={actions}
          />
        </div>
        <div className={styles.card2}>
          <h2>Student Enrolled Classes</h2>
          <Table columns={["name", "courses"]} data={enrolledClasses} />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.card3}>
          <h2>Student Attendance (Jan–Dec)</h2>

          <Table columns={["name", ...months]} data={attendanceTableData} />
        </div>
      </div>
      <Modal
        isOpen={modalType !== null}
        onClose={() => {
          setModalType(null);
          setModalUserData(null);
        }}
        title={
          modalType === "View"
            ? "View Details"
            : modalType === "Edit"
              ? "Edit the Data"
              : "Delete the Data"
        }
      >
        {modalType === "View" ? (
          <div>
            <p>this is about user data</p>
          </div>
        ) : modalType === "Edit" ? (
          <div>
            <p>u can edit this data</p>
            <button
              onClick={() => {
                setModalType(null);
                setModalUserData(null);
              }}
            >
              cancel
            </button>
            <button>save</button>
          </div>
        ) : (
          <div>
            <p>u can delete this data</p>
            <button
              onClick={() => {
                setModalType(null);
                setModalUserData(null);
              }}
            >
              cancel
            </button>
            <button>Delete</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
