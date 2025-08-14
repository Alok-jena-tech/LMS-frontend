import styles from "./AddCourse.module.css";
import { useCourse } from "../../../hooks/useCourse";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import InlineLoader from "../../../components/ui/InlineLoader";
import { useSelector } from "react-redux";

export default function AddCourse() {
  const loading = useSelector((state) => state.loader.inner_loader);

  const { formData, handleChange, selectCourses, errors, setErrors } =
    useCourse();

  const options = [
    { label: "Select", value: "" },
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.Name) newErrors.courseName = "Course Name is required";
    if (!formData.Price) newErrors.courseFees = "Course Fees is required";
    if (!formData.Duration) newErrors.duration = "Duration is required";
    if (!formData.Mode) newErrors.mode = "Mode is required";
    if (!formData.Start_date) newErrors.startDate = "Start Date is required";
    if (!formData.End_date) newErrors.endDate = "End Date is required";
    if (!formData.Description)
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      selectCourses();
    }
  };

  return  loading? <InlineLoader/>:(
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Course</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <Label>
              Course Name <span>*</span>
            </Label>
            <Input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="e.g., MERN Stack Development"
              className={styles.input}
            />
            {errors.Name && <p className={styles.error}>{errors.Name}</p>}
          </div>
          <div className={styles.field}>
            <Label>
              Course Fees <span>*</span>
            </Label>
            <Input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className={styles.input}
            />
            {errors.Price && <p className={styles.error}>{errors.Price}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Label>
              Duration <span>*</span>
            </Label>
            <Input
              type="text"
              name="Duration"
              value={formData.Duration}
              onChange={handleChange}
              placeholder="e.g., 3 Months"
              className={styles.input}
            />
            {errors.Duration && (
              <p className={styles.error}>{errors.Duration}</p>
            )}
          </div>
          <div className={styles.field}>
            <Label>
              Mode <span>*</span>
            </Label>
            <Select
              name="Mode"
              options={options}
              value={formData.Mode}
              className={styles.select}
              onChange={handleChange}
            ></Select>
            {errors.Mode && <p className={styles.error}>{errors.Mode}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Label>
              Start Date <span>*</span>
            </Label>
            <Input
              type="date"
              name="Start_date"
              value={formData.Start_date}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.Start_date && (
              <p className={styles.error}>{errors.Start_date}</p>
            )}
          </div>
          <div className={styles.field}>
            <Label>
              End Date <span>*</span>
            </Label>
            <Input
              type="date"
              name="End_date"
              value={formData.End_date}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.End_date && (
              <p className={styles.error}>{errors.End_date}</p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <Label>
            Description <span>*</span>
          </Label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            placeholder="Write a brief about the course..."
            className={styles.textarea}
          />
          {errors.Description && (
            <p className={styles.error}>{errors.Description}</p>
          )}
        </div>

        <button className={styles.submitBtn} type="submit">
          Add Course
        </button>
      </form>
    </div>
  );
}
