import styles from "../../assets/styles/ui/Input.module.css";
import clsx from "clsx";

export const Input = ({ className, ...props }) => {
  return <input className={clsx(styles.input, className)} {...props} />;
};
