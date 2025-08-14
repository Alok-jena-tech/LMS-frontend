import { useSelector } from "react-redux";
import styles from "../../assets/styles/ui/InlineLoader.module.css";

const InlineLoader = () => {
  const isLoading = useSelector((state) => state.loader.inner_loader); // Ensure correct key
  return isLoading ? (
    <div className={styles.inlineLoaderContainer}>
      <div className={styles.inlineLoader}></div>
    </div>
  ) : null;
};

export default InlineLoader;
