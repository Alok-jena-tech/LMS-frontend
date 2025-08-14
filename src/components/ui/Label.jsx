import styles from "../../assets/styles/ui/Label.module.css";
import clsx from "clsx";

export const Label = ({ children, htmlFor, className, required = false, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(styles.label, className)}
      {...props}
    >
      {children}
      {required && <span className={styles.required}> *</span>}
    </label>
  );
};
