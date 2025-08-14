import styles from "../../assets/styles/ui/Radio.module.css";
import clsx from "clsx";

export const Radio = ({ className, ...props }) => {
  return <input type="radio" className={clsx(styles.radio, className)} {...props} />;
};
