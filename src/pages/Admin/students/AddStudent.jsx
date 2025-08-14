import { useState } from "react";
import styles from "./AddStudent.module.css";
import { useStudent } from "../../../hooks/useStudent";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Label } from "../../../components/ui/Label";
import { useSelector } from "react-redux";
import { Button } from "../../../components/ui/Button";
const AddStudent = () => {
  const { NewStudentadd, formData, setFormData } = useStudent();
  const all_courses = useSelector((state) => state.auth.all_filted_courses);
  const all_batches = useSelector((state) => state.batch.all_filtered_batch);
  const [errors, setErrors] = useState({});
  const [qualifications, setQualifications] = useState([]);

  const [newQualification, setNewQualification] = useState({
    degree: "",
    board: "",
    year: "",
    cgpa: "",
    percentage: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0].name : value,
    }));
  };

  const optionsForGender = [
    { label: "--Select Gender--", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const optionsForCourse = [
    { label: "--Select Course--", value: "" }, // Default first option
    ...all_courses?.map((course) => ({
      label: course.Name,
      value: course._id,
    })),
  ];
  const optionsForBatches = [
    { label: "--Select Batch--", value: "" }, // Default first option
    ...all_batches?.map((batch) => ({
      label: batch.batchName,
      value: batch._id,
    })),
  ];
  const handleQualificationChange = (e) => {
    const { name, value } = e.target;
    setNewQualification((prev) => ({ ...prev, [name]: value }));
  };

  const addQualification = () => {
    if (
      newQualification.degree &&
      newQualification.board &&
      newQualification.year &&
      newQualification.percentage
    ) {
      setQualifications([...qualifications, newQualification]);
      setNewQualification({ degree: "", board: "", year: "", percentage: "" });
    }
  };

  const deleteQualification = (index) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const editQualification = (index) => {
    setNewQualification(qualifications[index]);
    setEditIndex(index);
  };

  const updateQualification = () => {
    const updated = [...qualifications];
    updated[editIndex] = newQualification;
    setQualifications(updated);
    setEditIndex(null);
    setNewQualification({ degree: "", board: "", year: "", percentage: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = [
      "Full_name",
      "Email",
      "Phone_number",
      "Gender",
      "Date_of_birth",
      "Courses",
      "Batches",
      "Address",
      "City",
      "State",
      "Pin_code",
      "Country",
      "Guardian_name",
      "Guardian_phone",
      "Previous_school",
      "Class_applied",
      "Hobbies",
      "Blood_group",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });
    if (formData.Email && !formData.Email.includes("@")) {
      newErrors.Email = "Email must be valid";
    }
    setErrors(newErrors);
    console.log("neweror", newErrors);
    if (Object.keys(newErrors).length === 0) {
      NewStudentadd();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Student Admission Form</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {[
          ["Full Name", "Full_name", "text"],
          ["Email", "Email", "email"],
          ["Password", "Password", "password"],
          ["Phone", "Phone_number", "tel"],
          ["Gender", "Gender", "select"],
          ["Date of Birth", "Date_of_birth", "date"],
          ["Courses", "Courses", "selectCourse"],
          ["Batch", "Batches", "selectBatch"],
          ["Country", "Country", "text"],
          ["State", "State", "text"],
          ["City", "City", "text"],
          ["Address", "Address", "text"],
          ["Pin Code", "Pin_code", "text"],
          ["Guardian Name", "Guardian_name", "text"],
          ["Guardian Phone", "Guardian_phone", "tel"],
          ["Previous School", "Previous_school", "text"],
          ["Class Applied", "Class_applied", "text"],
          ["Hobbies", "Hobbies", "text"],
          ["Blood Group", "Blood_group", "text"],
        ].map(([label, name, type]) => (
          <div className={styles.formGroup} key={name}>
            <Label className={styles.label}>{label}</Label>
            {type === "select" ? (
              <Select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={styles.input}
                options={optionsForGender}
              ></Select>
            ) : type === "selectCourse" ? (
              <Select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={styles.input}
                options={optionsForCourse}
              ></Select>
            ) : type === "selectBatch" ? (
              <Select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={styles.input}
                options={optionsForBatches}
              ></Select>
            ) : (
              <Input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={styles.input}
              />
            )}
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        ))}

        <div className={styles.formGroup}>
          <Label className={styles.label}>Upload Photo</Label>
          <Input
            type="file"
            name="Image"
            accept="image/*"
            onChange={handleChange}
            className={styles.input}
          />
          {errors.Image && <p className={styles.error}>{errors.Image}</p>}
        </div>

        <div className={styles.fullWidth}>
          <Button type="submit" className={styles.button}>
            Submit
          </Button>
        </div>
      </form>

      <div className={styles.qualificationSection}>
        <h3>Educational Qualifications</h3>
        <div className={styles.qualificationRow}>
          <input
            type="text"
            name="degree"
            value={newQualification.degree}
            onChange={handleQualificationChange}
            placeholder="Degree"
            className={styles.input}
          />
          <input
            type="text"
            name="board"
            value={newQualification.board}
            onChange={handleQualificationChange}
            placeholder="Board/University"
            className={styles.input}
          />
          <input
            type="text"
            name="year"
            value={newQualification.year}
            onChange={handleQualificationChange}
            placeholder="Year"
            className={styles.input}
          />
          <input
            type="text"
            name="cgpa"
            value={newQualification.cgpa}
            onChange={handleQualificationChange}
            placeholder="CGPA"
            className={styles.input}
          />
          <input
            type="text"
            name="percentage"
            value={newQualification.percentage}
            onChange={handleQualificationChange}
            placeholder="%"
            className={styles.input}
          />
          <button
            className={styles.addButton}
            onClick={
              editIndex !== null ? updateQualification : addQualification
            }
            type="button"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Degree</th>
              <th>Board</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>%</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {qualifications.map((qual, index) => (
              <tr key={index}>
                <td>{qual.degree}</td>
                <td>{qual.board}</td>
                <td>{qual.year}</td>
                <td>{qual.cgpa}</td>
                <td>{qual.percentage}</td>
                <td>
                  <button
                    onClick={() => editQualification(index)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQualification(index)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddStudent;
