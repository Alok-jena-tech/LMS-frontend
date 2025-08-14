import styles from "../../assets/styles/ui/Pagination.module.css";
import clsx from "clsx";

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  recordsPerPage,
  totalRecords
}) => {
  const startIndex = (currentPage - 1) * recordsPerPage + 1;
  const endIndex = Math.min(currentPage * recordsPerPage, totalRecords);

  return (
    <div className={styles.paginationContainer}>
      <span className={styles.pageInfo}>
        Showing {startIndex} - {endIndex} of {totalRecords}
      </span>
      <div className={styles.pagination}>
        <button
          className={clsx(styles.pageButton, styles.prevNext)}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={clsx(
              styles.pageButton,
              num === currentPage && styles.active
            )}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}
        <button
          className={clsx(styles.pageButton, styles.prevNext)}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
