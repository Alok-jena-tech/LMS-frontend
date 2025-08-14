import styles from "../../assets/styles/ui/Checkbox.module.css";
import clsx from "clsx";

export const Checkbox = ({
  className,
  label,
  checked,
  defaultChecked,
  onChange,
  onCheckedChange,
  ...rest
}) => {
  const handleChange = (e) => {
    const isChecked = e.target.checked;
    onChange?.(e); // call native handler
    onCheckedChange?.(isChecked); // call custom handler if passed
  };

  return (
    <label className={clsx(styles.checkboxContainer, className)}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        {...rest}
      />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};
