import { useState } from "react";
import styles from "./AddTeacher.module.css";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    Full_name: "",
    Email: "",
    Phone_number: "",
    Gender: "",
    Date_of_birth: "",
    Address: "",
    City: "",
    State: "",
    Country: "",
    Qualification: "",
    Experience: "",
    Specialization: "",
    Joining_date: "",
    Image: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0].name : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = [
      "Full_name", "Email", "Phone_number", "Gender", "Date_of_birth",
      "Address", "City", "State", "Country", "Qualification",
      "Experience", "Specialization", "Joining_date", "Image"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, ' ')} is required`;
      }
    });

    if (formData.Email && !formData.Email.includes("@")) {
      newErrors.Email = "Email must be valid";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Teacher added successfully!");
      console.log("Submitted Data:", formData);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Teacher</h2>
      <form className={styles.formGrid} onSubmit={handleSubmit}>
        {[
          ["Full Name", "Full_name"],
          ["Email", "Email"],
          ["Phone Number", "Phone_number"],
          ["Date of Birth", "Date_of_birth", "date"],
          ["Address", "Address"],
          ["City", "City"],
          ["State", "State"],
          ["Country", "Country"],
          ["Qualification", "Qualification"],
          ["Experience (in years)", "Experience"],
          ["Specialization (Subject)", "Specialization"],
          ["Joining Date", "Joining_date", "date"],
        ].map(([label, name, type = "text"]) => (
          <div className={styles.formGroup} key={name}>
            <label className={styles.label}>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={styles.input}
            />
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        ))}

        {/* Gender */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.Gender && <p className={styles.error}>{errors.Gender}</p>}
        </div>

        {/* Upload Image */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Upload Photo</label>
          <input
            type="file"
            name="Image"
            accept="image/*"
            onChange={handleChange}
            className={styles.input}
          />
          {errors.Image && <p className={styles.error}>{errors.Image}</p>}
        </div>

        <div className={styles.fullWidth}>
          <button type="submit" className={styles.button}>Add Teacher</button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
