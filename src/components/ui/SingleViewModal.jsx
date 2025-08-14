import styles from "../../assets/styles/ui/singleView.module.css"; 

export default function SingleView({ data, viewKeys = [] }) {
  const viewKeySet = new Set(viewKeys);
  const hasViewKeys = viewKeys.length > 0;

  const imageKey = Object.keys(data || {}).find(
    (key) =>
      key.toLowerCase().includes("image") || key.toLowerCase().includes("logo")
  );

  const isViewAllowed = (fullKey) => {
    return !hasViewKeys || viewKeySet.has(fullKey);
  };

  const formatValue = (parentKey, value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return (
        <div className={styles.spaceY}>
          {Object.entries(value).map(([childKey, childValue]) => {
            const fullKey = `${parentKey}.${childKey}`;
            if (!isViewAllowed(fullKey)) return null;

            return <div key={childKey}>{formatValue(fullKey, childValue)}</div>;
          })}
        </div>
      );
    }

   
  // Check if value is a valid ISO date string and format it
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const dateOnly = new Date(value).toISOString().slice(0, 10); // YYYY-MM-DD
    return dateOnly;
  }

  return String(value);
  };

  return (
    <div className={styles.container}>
      {imageKey && data[imageKey] && isViewAllowed(imageKey) && (
        <div className={styles.imageWrapper}>
          <img
            src={
              data[imageKey].startsWith("http") ||
              data[imageKey].startsWith("data:image")
                ? data[imageKey]
                : `data:image/png;base64,${data[imageKey]}`
            }
            alt="Preview"
            className={styles.image}
          />
        </div>
      )}

      <table className={styles.table}>
        <tbody>
          {Object.entries(data || {}).map(([key, value], index) => {
            const isDirectFieldAllowed = isViewAllowed(key);
            const isNested =
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value);
            const hasVisibleNestedFields =
              isNested &&
              Object.keys(value).some((subKey) =>
                isViewAllowed(`${key}.${subKey}`)
              );

            if ((isNested && hasVisibleNestedFields) || isDirectFieldAllowed) {
              return (
                <tr key={index} className={styles.row}>
                  <td className={styles.key}>
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className={styles.value}>{formatValue(key, value)}</td>
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}
