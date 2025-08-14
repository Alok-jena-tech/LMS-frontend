import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styles from "../../assets/styles/layout.module.css";
import { Outlet } from "react-router-dom";
// import { FaRobot } from "react-icons/fa"; // from FontAwesome
const Layout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export default Layout;
