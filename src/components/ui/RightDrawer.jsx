import { useState } from "react";
import styles from "../../assets/styles/ui/RightDrawer.module.css";
import { ImCross } from "react-icons/im";

const initialNotifications = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    message: "Mark Webber reacted to your recent post",
    highlight: "My first tournament today!",
    time: "1m ago",
    unread: true,
    privateMessage:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks and I'm already having lots of fun and improving my game.",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    message: "Angela Gray followed you",
    time: "5m ago",
    unread: true,
    privateMessage:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks and I'm already having lots of fun and improving my game.",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    message: "Jacob Thompson has joined your group",
    highlight: "Chess Club",
    time: "1 day ago",
    unread: true,
    privateMessage:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks and I'm already having lots of fun and improving my game.",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    message: "Ricky Hasunaad sent you a private message",
    time: "5 days ago",
    unread: true,
    privateMessage:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks and I'm already having lots of fun and improving my game.",
  },
];

const RightDrawer = ({ isOpen, onClose }) => {
  const [showList, setShowList] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleToggleList = () => {
    setShowList((prev) => !prev);
  };

  const handleNotificationClick = (id) => {
    // Mark as read when clicked
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        unread: false
      }))
    );
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header} onClick={handleToggleList}>
          <h3>
            Notifications <span className={styles.count}>{notifications.length}</span>
          </h3>
          <button className={styles.markAll} onClick={handleMarkAllAsRead}>
            Mark all as read
          </button>
          <ImCross className={styles.closeIcon} onClick={onClose} />
        </div>

        {showList && (
          <div className={styles.notificationList}>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`${styles.notificationItem} ${n.unread ? styles.unread : ""}`}
                onClick={() => handleNotificationClick(n.id)}
              >
                <img src={n.avatar} className={styles.avatar} alt="user" />
                <div className={styles.textContent}>
                  <p className={styles.message}>
                    {n.message}
                    {n.highlight && <span className={styles.highlight}> {n.highlight}</span>}
                    {n.unread && <span className={styles.dot} />}
                  </p>
                  <span className={styles.time}>{n.time}</span>

                  {expandedId === n.id && n.privateMessage && (
                    <p className={styles.privateMessage}>{n.privateMessage}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RightDrawer;