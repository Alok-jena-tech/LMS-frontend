import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import styles from "./SignUp.module.css";
import clsx from "clsx";
import LoginImage from "../assets/Images/Illustration.png";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Label } from "../components/ui/Label";
import { Radio } from "../components/ui/Radio";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export const SignUp = () => {
  const { signUp } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    Role:"User",
    Full_name: "",
    Gender: "",
    Phone_number: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });
  console.log("form data", formData);
  

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // handle nested Address fields
   
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.Gender) newErrors.Gender = "Gender is required";
    if (!formData.Full_name) newErrors.Full_name = "Full Name is required";
    if (!formData.Phone_number)
      newErrors.Phone_number = " Phone_number is required";
    if (!formData.Email) newErrors.Email = "Email is required";
    if (!formData.Password) newErrors.Password = "Password is required";
    if (formData.Password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      await signUp(formData);
    // console.log("form data",formData)
    }
  };

  return (
    <div className={clsx(styles.signupContainer, { [styles.dark]: darkMode })}>
      <Button onClick={toggleDarkMode} className={styles.darkToggle}>
        {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
      </Button>

      <div className={styles.signupBox}>
        <div className={styles.signupLeft}>
          <img src={LoginImage} alt="signup" />
        </div>

        <div className={styles.signupRight}>
          <h2>
            Welcome to <span className={styles.highlight}>Digital Academy</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="Full_name"
              placeholder="Full Name"
              value={formData.Full_name}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.Full_name && (
              <p className={styles.error}>{errors.Full_name}</p>
            )}

            <div className={styles.radio}>
              <Label htmlFor="male">
                <Radio
                  name="Gender"
                  id="male"
                  value="Male"
                  // checked={formData.Gender === "male"}
                  onChange={handleChange}
                />
                Male
              </Label>

              <Label htmlFor="female">
                <Radio
                  name="Gender"
                  id="female"
                  value="Female"
                  // checked={formData.Gender === "female"}
                  onChange={handleChange}
                />
                Female
              </Label>
            </div>
            {errors.Gender && <p className={styles.error}>{errors.Gender}</p>}

            <Input
              type="number"
              name="Phone_number"
              placeholder="Phone_number"
              value={formData.Phone_number}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.Phone_number && (
              <p className={styles.error}>{errors.Phone_number}</p>
            )}

            <Input
              type="email"
              name="Email"
              placeholder="Enter Your Email"
              value={formData.Email}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.Email && <p className={styles.error}>{errors.Email}</p>}

            <Input
              type="password"
              name="Password"
              placeholder="Enter Password"
              value={formData.Password}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.Password && (
              <p className={styles.error}>{errors.Password}</p>
            )}

            <Input
              type="Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}

            <Button type="submit" className={styles.submitButton}>
              Sign Up
            </Button>
          </form>

          <p className={styles.or}>───────── OR ─────────</p>

          <Button type="button" className={styles.googleBtn}>
            <FcGoogle />
            Sign up with Google
          </Button>

          <Button type="button" className={styles.facebookBtn}>
            <FaFacebook />
            Sign up with Facebook
          </Button>

          <p className={styles.loginLink}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};
