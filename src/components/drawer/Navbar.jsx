import { useRef, useState } from "react";
import styles from "../../assets/styles/navbar.module.css";
import BasicMenu from "../ui/menuItem";
import { FiLogOut, FiSettings } from "react-icons/fi";
import {  FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import RightDrawer from "../ui/RightDrawer";
import MessageDrawer from "../ui/MessageDrawer"
import { BsChatDots } from 'react-icons/bs';

const Navbar = () => {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // avoid triggering document listener
    setAnchorEl(e.currentTarget); // 👈 set the clicked button as anchor
    setOpen((prev) => !prev);
  };
  const closeMenu = () => setOpen(false);
  const handleProfile = () => {
    user?.Role === "Admin"
      ? navigate("/admin/profile")
      : navigate("/user/profile");
  };
  const handleLogOut = () => {
    logout();
  };

  const defaultMenuItems = [
    { icon: <FaUserCircle />, label: "Profile", onClick: handleProfile },


    {
      icon: <BsChatDots />,
      label: "message"
    },
    {
      icon: <FiSettings />,
      label: "Setting",
    },

    { divider: true },
    {
      icon: <FiLogOut />,
      label: "Logout",
      danger: true,
      onClick: handleLogOut,
    },
  ];

  return (
    <div className={styles.navbar}>
      

      {/* Icons and user */}
      <div className={styles.rightSection}>
        <div className={styles.iconWithBadge} onClick={() => setIsNotificationOpen(true)}>
          <FaBell />
          <span className={styles.badge}>21</span>
        </div>
        <div className={styles.iconWithBadge} onClick={() => setIsDrawerOpen(true)}>
          <FaEnvelope />
          <span className={styles.badge}>7</span>
        </div>

        <div className={styles.userWrapper}>
          <div className={styles.userProfile} onClick={toggleMenu}>
            <span>{user?.Full_name.length > 7 ? user?.Full_name.slice(0, 7) + "..." : user?.Full_name}</span>
            {user?.img ? (
              <img src={user?.img} alt="avatar" className={styles.avatar} />
            ) : (
              <div className={styles.avatarAlpha}>
                {user?.Full_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
      {open && (
        <BasicMenu
          anchorEl={anchorEl}
          menuRef={menuRef}
          closeMenu={closeMenu}
          menuItems={defaultMenuItems}
        />
      )}

      <RightDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <MessageDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Navbar;
