import styles from "./makeAdmin.module.css";
import { Input } from "../../../components/ui/Input";
// import { Label } from "../../../components/ui/Label";
import { Button } from "../../../components/ui/Button";
// import { Radio } from "../../../components/ui/Radio";
import { useAuth } from "../../../hooks/useAuth";
const MakeAdmin = () => {
  const { errors, setErrors, newAdmin, handlNewAdmineChange, makeNewAdmin } =
    useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    // if (!newAdmin.Role) newErrors.Role = "Role is required";
    // if (!newAdmin.Gender) newErrors.Gender = "Gender is required";
    if (!newAdmin.Full_name) newErrors.Full_name = "Full Name is required";
    if (!newAdmin.Phone_number)
      newErrors.Phone_number = " Phone_number is required";
    // if (!newAdmin.Address) newErrors.Address = "Address is required";
    if (!newAdmin.Email) newErrors.Email = "Email is required";
    // if (!newAdmin.Password) newErrors.Password = "Password is required";
    // if (newAdmin.Password !== newAdmin.confirmPassword)
      // newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      makeNewAdmin();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Admin</h2>

      <Input
        type="text"
        name="Full_name"
        placeholder="Full Name"
        value={newAdmin.Full_name}
        onChange={handlNewAdmineChange}
        className={styles.formInput}
      />
      {errors.Full_name && <p className={styles.error}>{errors.Full_name}</p>}

      <Input
        type="number"
        name="Phone_number"
        placeholder="Phone_number"
        value={newAdmin.Phone_number}
        onChange={handlNewAdmineChange}
        className={styles.formInput}
      />
      {errors.Phone_number && (
        <p className={styles.error}>{errors.Phone_number}</p>
      )}
      <Input
        type="email"
        name="Email"
        placeholder="Enter Your Email"
        value={newAdmin.Email}
        onChange={handlNewAdmineChange}
        className={styles.formInput}
      />
      {errors.Email && <p className={styles.error}>{errors.Email}</p>}

      {/* <Input
        type="password"
        name="Password"
        placeholder="Enter Password"
        value={newAdmin.Password}
        onChange={handlNewAdmineChange}
        className={styles.formInput}
      />
      {errors.Password && <p className={styles.error}>{errors.Password}</p>}
      <Input
        type="Password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={newAdmin.confirmPassword}
        onChange={handlNewAdmineChange}
        className={styles.formInput}
      />
      {errors.confirmPassword && (
        <p className={styles.error}>{errors.confirmPassword}</p>
      )} */}

      <Button type="submit" className={styles.submitButton}>
        Create Admin
      </Button>
    </form>
  );
};

export default MakeAdmin;
