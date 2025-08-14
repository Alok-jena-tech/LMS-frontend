import styles from "../../assets/styles/ui/Select.module.css"; // or create Select.module.css
import clsx from "clsx";

export const Select = ({ className, options = [], ...props }) => {
  return (
    <select className={clsx(styles.select, className)} {...props}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
