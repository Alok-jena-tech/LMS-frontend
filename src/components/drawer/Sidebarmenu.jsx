import styles from "../../assets/styles/sidebarmenu.module.css";
import clsx from "clsx";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// import { useAuth } from "../../hooks/useAuth";
import headingIcon from "../../../src/assets/Images/heading icon.avif";
import { NavLink } from "react-router-dom";
const Sidebarmenu = ({ menu = [], className }) => {
  // const { user } = useAuth();

  const [openMenus, setOpenMenus] = useState({});
  const toggleSubMenu = (label) => {
    setOpenMenus((prev) => ({
      [label]: !prev[label],
    }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.heading}>
          <img
            src={headingIcon}
            alt="heading icon"
            style={{ width: "40px", borderRadius: "50px" }}
          />
          <p>Digital Academy</p>
        </div>
      </div>
      <div className={clsx(styles.sidebar, className)}>
        {menu.map((item, index) => (
          <div key={index}>
            <div
              className={clsx(
                styles.item,
                openMenus[item.label] && styles.active
              )}
              onClick={() => toggleSubMenu(item.label)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {item.children && (
                <span className={styles.arrow}>
                  {openMenus[item.label] ? (
                    <FaChevronDown size={10} />
                  ) : (
                    <FaChevronRight size={10} />
                  )}
                </span>
              )}
            </div>

            {item.children && openMenus[item.label] && (
              <div className={styles.children}>
                {item.children?.map((child, subIndex) => (
                  <div key={subIndex} className={styles.subItem}>
                    <NavLink to={child.path} className={styles.linklable}>
                      <span className={styles.label}>{child.label}</span>
                    </NavLink>{" "}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebarmenu;
