import styles from "./CreateBatchClass.module.css";
import { useBatch } from "../../../hooks/useBatch";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import InlineLoader from "../../../components/ui/InlineLoader";
import { useSelector } from "react-redux";
import { Select } from "../../../components/ui/Select";
const CreateBatchClass = () => {
  const loading = useSelector((state) => state.loader.inner_loader);
  const all_courses = useSelector((state) => state.auth.all_filted_courses);

  const {
    batchData,
    setBatchData,
    batches,
    setBatches,
    errors,
    setErrors,
    createNewBatch,
  } = useBatch();
  const optionsForCourse = [
    { label: "--Select Course--", value: "" }, // Default first option
    ...all_courses?.map((course) => ({
      label: course.Name,
      value: course._id,
    })),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value,"name,value")
    setBatchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!batchData.batchName.trim())
      newErrors.batchName = "Batch Name is required";
    if (!batchData.batchYear.trim()) {
      newErrors.batchYear = "Batch Year is required";
    } else if (!/\d{4}/.test(batchData.batchYear)) {
      newErrors.batchYear = "Batch Year must be a 4-digit number";
    }
    if (!batchData.description.trim())
      newErrors.description = "Description is required";
    if (!batchData.capacity.trim()) {
      newErrors.capacity = "Capacity is required";
    } else if (isNaN(batchData.capacity) || parseInt(batchData.capacity) <= 0) {
      newErrors.capacity = "Capacity must be a positive number";
    }
    if (!batchData.startDate) newErrors.startDate = "Start Date is required";
    if (!batchData.endDate) {
      newErrors.endDate = "End Date is required";
    } else if (
      batchData.startDate &&
      new Date(batchData.startDate) >= new Date(batchData.endDate)
    ) {
      newErrors.endDate = "End Date must be after Start Date";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setBatches((prevBatches) => [...prevBatches, batchData]);
    createNewBatch();
  };

  return loading ? (
    <InlineLoader />
  ) : (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Add New Batch</h2>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <Label htmlFor="batchName" className={styles.label}>
              Batch Name <span className={styles.required}>*</span>
            </Label>
            <Input
              type="text"
              id="batchName"
              name="batchName"
              value={batchData.batchName}
              onChange={handleChange}
              placeholder="e.g., Spring 2025"
              className={`${styles.input} ${
                errors.batchName ? styles.inputError : ""
              }`}
            />
            {errors.batchName && (
              <p className={styles.errorMessage}>{errors.batchName}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="batchYear" className={styles.label}>
              Batch Year <span className={styles.required}>*</span>
            </Label>
            <Input
              type="text"
              id="batchYear"
              name="batchYear"
              value={batchData.batchYear}
              onChange={handleChange}
              placeholder="e.g., 2025"
              className={`${styles.input} ${
                errors.batchYear ? styles.inputError : ""
              }`}
            />
            {errors.batchYear && (
              <p className={styles.errorMessage}>{errors.batchYear}</p>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.colSpan2}`}>
            <Label htmlFor="description" className={styles.label}>
              Description <span className={styles.required}>*</span>
            </Label>
            <textarea
              id="description"
              name="description"
              value={batchData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Provide a brief description for the batch"
              className={`${styles.textarea} ${
                errors.description ? styles.inputError : ""
              }`}
            ></textarea>
            {errors.description && (
              <p className={styles.errorMessage}>{errors.description}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="capacity" className={styles.label}>
              Capacity <span className={styles.required}>*</span>
            </Label>
            <Input
              type="number"
              id="capacity"
              name="capacity"
              value={batchData.capacity}
              onChange={handleChange}
              placeholder="e.g., 50"
              min="1"
              className={`${styles.input} ${
                errors.capacity ? styles.inputError : ""
              }`}
            />
            {errors.capacity && (
              <p className={styles.errorMessage}>{errors.capacity}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="startDate" className={styles.label}>
              Start Date <span className={styles.required}>*</span>
            </Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={batchData.startDate}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.startDate ? styles.inputError : ""
              }`}
            />
            {errors.startDate && (
              <p className={styles.errorMessage}>{errors.startDate}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="endDate" className={styles.label}>
              End Date <span className={styles.required}>*</span>
            </Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={batchData.endDate}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.endDate ? styles.inputError : ""
              }`}
            />
            {errors.endDate && (
              <p className={styles.errorMessage}>{errors.endDate}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="courses" className={styles.label}>
              select Course <span className={styles.required}>*</span>
            </Label>
            <Select
              name="Courses"
              options={optionsForCourse}
              value={batchData.Courses}
              onChange={handleChange}
              className={`${styles.input} `}
            />
            {/* {errors.endDate && <p className={styles.errorMessage}>{errors.endDate}</p>} */}
          </div>

          <div className={`${styles.formActions} ${styles.colSpan2}`}>
            <Button type="submit" className={styles.submitButton}>
              Add Batch
            </Button>
          </div>
        </form>

        <h3 className={styles.tableHeading}>Current Batches</h3>
        {batches.length === 0 ? (
          <p className={styles.noBatchesMessage}>
            No batches added yet. Add one above!
          </p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableTh}>Batch Name</th>
                  <th className={styles.tableTh}>Year</th>
                  <th className={styles.tableTh}>Description</th>
                  <th className={styles.tableTh}>Capacity</th>
                  <th className={styles.tableTh}>Start Date</th>
                  <th className={styles.tableTh}>End Date</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {batches.map((batch, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableTd}>{batch.batchName}</td>
                    <td className={styles.tableTd}>{batch.batchYear}</td>
                    <td className={styles.tableTd}>{batch.description}</td>
                    <td className={styles.tableTd}>{batch.capacity}</td>
                    <td className={styles.tableTd}>{batch.startDate}</td>
                    <td className={styles.tableTd}>{batch.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBatchClass;
