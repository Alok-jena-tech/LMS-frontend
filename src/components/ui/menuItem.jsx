import React, { useEffect, useState } from "react";
import styles from "../../assets/styles/ui/menuItem.module.css";

export default function BasicMenu({
  closeMenu,
  menuRef,
  anchorEl,
  menuItems = [],
}) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [anchorEl]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef?.current && !menuRef.current.contains(e.target)) {
        closeMenu?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, closeMenu]);

  if (!position) return null; // ✅ Don't render until position is ready

  return (
    <div
      className={styles.menuWrapper}
      ref={menuRef}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: "absolute",
      }}
    >
      <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr key={index} className={styles.divider} />
          ) : (
            <div
              key={index}
              className={`${styles.menuItem} ${
                item.danger ? styles.danger : ""
              }`}
              onClick={() => {
                item.onClick?.();
                closeMenu?.();
              }}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span >{item.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

