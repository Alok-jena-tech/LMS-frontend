import styles from "../../assets/styles/ui/Button.module.css";
import clsx from "clsx";

export const Button = ({
  className,
  variant = "primary",
  icon,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};
