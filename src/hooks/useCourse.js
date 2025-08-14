import { addCourse } from "../services/courseService";
import { useState } from "react";
import { useCourseContext } from "../contexts/CourseContext";
import { deleteCourseById } from "../services/courseService";
import { updateCourse } from "../services/courseService";
export const useCourse = () => {
  const {fetchAllCourseData,
        totalPages,
        totalRecords,
        currentPage,
        recordsPerPage,
        setCurrentPage,
        setRecordsPerPage, } = useCourseContext();
  const [errors, setErrors] = useState({});
  const [singleRecord, setSingleRecord] = useState({});

  const [viewModal, setViewModal] = useState(false);
  const [modelType, setModelType] = useState("");

  const handlViewModal = () => {
    setViewModal(!viewModal);
  };

  const [formData, setFormData] = useState({
    Name: "",
    Price: "",
    Duration: "",
    Mode: "",
    Start_date: "",
    End_date: "",
    Description: "",
    Status: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSingleUserUpdate = (e) => {
    const { name, value } = e.target;
    setSingleRecord((prev) => ({ ...prev, [name]: value }));
  };

  const selectCourses = async () => {
    try {
      const response = await addCourse(formData);
      const { message } = response;
      if (response.status === 200) {
        alert(message);
        fetchAllCourseData();
        setFormData({
          Name: "",
          Price: "",
          Duration: "",
          Mode: "",
          Start_date: "",
          End_date: "",
          Description: "",
          Status: true,
        });
        setErrors({});
      } else {
        alert(message);
      }
    } catch (err) {
      console.error("server error", err);
    }
  };

  const updateSingleCourse = async () => {
    try {
      const {
        Name,
        Price,
        Duration,
        Mode,
        Start_date,
        End_date,
        Description,
        Status,
      } = singleRecord;
      const response = await updateCourse({
        Id: singleRecord._id,
        Name,
        Price,
        Duration,
        Mode,
        Start_date,
        End_date,
        Description,
        Status,
      });
      if (response.status === 200) {
        alert("update successfully");
        handlViewModal();
        fetchAllCourseData();
      } else {
        alert("could not update");
        handlViewModal();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteCourse = async () => {
    try {
      const Id = singleRecord._id;

      const response = await deleteCourseById(Id);
      if (response.status === 200) {
        alert("deleted succesfully");
        handlViewModal();
        fetchAllCourseData();
      } else {
        alert("could not deleted");
        handlViewModal();
      }
    } catch (err) {
      console.error("delete course error", err);
    }
  };
  return {
    formData,
    setFormData,
    handleChange,
    selectCourses,
    errors,
    setErrors,

    viewModal,
    setViewModal,
    modelType,
    setModelType,
    handlViewModal,

    singleRecord,
    setSingleRecord,
    handleSingleUserUpdate,
    updateSingleCourse,
    deleteCourse,

        totalPages,
        totalRecords,
        currentPage,
        recordsPerPage,
        setCurrentPage,
        setRecordsPerPage,
  };
};
