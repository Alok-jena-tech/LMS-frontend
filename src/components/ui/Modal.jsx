import { motion } from "framer-motion";
import styles from "../../assets/styles/ui/Modal.module.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.modal}
      >
        {/* Modal Header */}
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <IoMdClose />
          </button>
        </div>

        {/* Add Divider Line Here */}
        <div className={styles.divider}></div>
        {/* Modal Body */}
        <div className={styles.body}>{children}</div>
      </motion.div>
      {/* add a line here */}
    </div>
  );
};

export default Modal;
