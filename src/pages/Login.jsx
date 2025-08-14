import { useEffect } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import clsx from "clsx";
import styles from "./Login.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

import LoginImage from "../assets/Images/Illustration.png";
import Modal from "../components/ui/Modal";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import MainLoader from "../components/ui/Loader";

export default function Login() {
  const isLoading = useSelector((state) => state.loader.main_loader);
  const {
    login,
    sendOTPByEmail,
    handleOTPSubmit,
    handleResetPass,
    darkMode,
    isForget,
    showOtp,

    timer,
    setTimer,
    isTimerActive,
    setIsTimerActive,

    forgetEmail,
    setForgetEmail,
    mailOTP,
    setMailOTP,

    isOtpVerified,
    // setIsOtpVerified,
    newpassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loginData,
    SetLoginData,

    toggleDarkMode,
    handleModalForget,
  } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    SetLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // timer
  useEffect(() => {
    let countDown;
    if (isTimerActive && timer > 0) {
      countDown = setInterval(() => {
        setTimer((pre) => pre - 1);
      }, 1000);
    } else if (isTimerActive && timer === 0) {
      clearInterval(countDown);
      setIsTimerActive(false);
    }
    return () => clearInterval(countDown);
  }, [timer, isTimerActive, setIsTimerActive, setTimer]);

  return isLoading ? (
    <MainLoader />
  ) : (
    <div className={clsx(styles.body, { [styles.dark]: darkMode })}>
      <Button onClick={toggleDarkMode} className={styles.darkToggle}>
        {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
      </Button>

      <div className={styles.container}>
        <div className={styles.leftside}>
          <img src={LoginImage} alt="student imag" className={styles.img} />
        </div>
        <div className={styles.form}>
          <h3>
            Welcome to <span style={{ color: "blue" }}>Digital Academy</span>{" "}
          </h3>

          <Input
            type="email"
            placeholder="Email"
            name="Email"
            value={loginData?.Email}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            name="Password"
            value={loginData?.Password}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />

          <div className={styles.checkboxContainer}>
            <div className={styles.checkbox}>
              <Checkbox label="Remember me" onChange={handleInputChange} />
            </div>
            <div className={styles.link} onClick={handleModalForget}>
              Forgot Password?
            </div>
          </div>

          <Button type="submit" className={styles.submitButton} onClick={login}>
            Sign In
          </Button>

          <div className={styles.divider}>
            <span>OR</span>
          </div>
          <Button type="button" variant="nonBorder" icon={<FcGoogle />}>
            Login with Google
          </Button>
          <Button type="button" variant="nonBorder" icon={<FaFacebook />}>
            Login with Facebaook
          </Button>

          <p className={styles.loginLink}>
            Already have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>

      {/* FOrget Password start */}
      <Modal
        isOpen={isForget}
        onClose={handleModalForget}
        title={"Forget Password!"}
      >
        <div className={styles.forgetModal}>
          <form className={styles.forgetForm}>
            <label htmlFor="forgetEmail">Enter your registered email:</label>
            <Input
              type="email"
              id="forgetEmail"
              name="forgetEmail"
              placeholder="Enter email"
              required
              value={forgetEmail}
              onChange={(e) => setForgetEmail(e.target.value)}
            />

            {showOtp && !isOtpVerified && (
              <>
                <label htmlFor="Otp">Enter Otp:</label>
                <Input
                  type="text"
                  id="mailotp"
                  name="mailotp"
                  placeholder="Mail Otp"
                  required
                  value={mailOTP}
                  onChange={(e) => setMailOTP(e.target.value)}
                />
                <div className={styles.resetbtn}>
                  <Button
                    type="button"
                    onClick={handleOTPSubmit}
                    disabled={timer === 0}
                    variant="primary"
                  >
                    Submit
                  </Button>

                  {/* /resend button */}
                  <Button
                    onClick={() => {
                      setTimer(6);
                      setIsTimerActive(true);
                    }}
                    disabled={timer > 0 && isTimerActive}
                    style={{
                      backgroundColor:
                        timer > 0 && isTimerActive
                          ? "#ADD8E6"
                          : "rgba(84, 76, 242, 0.926)",
                    }}
                  >
                    {timer > 0 && isTimerActive ? (
                      <p style={{ color: timer > 10 ? "green" : "red" }}>
                        {timer > 0 && timer < 10
                          ? `0${timer}Sec`
                          : `${timer} Sec`}
                      </p>
                    ) : (
                      "Reset"
                    )}
                  </Button>
                </div>
              </>
            )}

            {isOtpVerified && (
              <>
                <label htmlFor="resetPassword">Reset Your Password</label>
                <Input
                  type="text"
                  placeholder="new password"
                  name="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newpassword}
                />
                <Input
                  type="text"
                  name="confirm password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="button" onClick={handleResetPass}>
                  Submit
                </Button>
              </>
            )}

            {!showOtp && (
              <Button type="button" onClick={sendOTPByEmail}>
                Send Otp
              </Button>
            )}
          </form>
        </div>
      </Modal>
      {/* FOrget Password end */}
    </div>
  );
}
