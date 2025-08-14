import React, { useEffect, useState } from 'react'
import styles from "./Notfound.module.css"
import errorimage from "../assets/Images/astronaut-png.webp"

export default function NotFound() {
const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500); // stop shaking after animation duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.container}>
      <h3>
        Er<span style={{ color: 'red'}}>ror!</span>
      </h3>
      <div className={styles.errorsec}>
        <h2>4<span style={{ color: 'red' }}>0</span>4</h2>
        <img src={errorimage} alt="errorimage"   className={shake ? styles.shake : ''}/>
      </div>
      <h3>- PAGE NOT FOUND-</h3>
      <p>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <button className={styles.btn} >
        GO TO HOMEPAGE
      </button>
    </div>
  )
}
