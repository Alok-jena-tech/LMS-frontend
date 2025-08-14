import { useEffect, useState,useCallback } from "react";
import { useStudContext } from "../contexts/StudContext";
import { AddStudent } from "../services/studentService";
// import { useNavigate } from "react-router-dom";
import { getAllFilteredBatches } from "../services/studentService";
import { ALL_FILTERED_BATCHES } from "../../src/utils/constants";
import { useDispatch } from "react-redux";

export const useStudent = () => {
  // const navigate = useNavigate();
  const { fetchAllStudentData } = useStudContext();
// const all_filted_batches=useSelector((state)=>state.batch.all_filtered_batch)
  const [formData, setFormData] = useState({
    Full_name: "",
    Email: "",
    Password: "",
    Phone_number: "",
    Gender: "",
    Date_of_birth: "",
    Courses: "",
    Batches: "",
    Address: "",
    City: "",
    State: "",
    Pin_code: "",
    Country: "",
    Guardian_name: "",
    Guardian_phone: "",
    Previous_school: "",
    Class_applied: "",
    Hobbies: "",
    Blood_group: "",
    Image: null,
  });

  const dispatch=useDispatch();
  const NewStudentadd = async () => {
    try {
      console.log("form student", formData);
      const response = await AddStudent(formData);

      if (response?.status === 200) {
        const { message } = response;
        alert(message);
        fetchAllStudentData();

        // navigate("/user");
      } else {
        console.log("new student did not add succesfully");
      }
    } catch (eror) {
      console.log(eror);
    }
  };

  const fetchFiltedBatch = useCallback(async (courseId) => {
    try {
      const response = await getAllFilteredBatches(courseId);
      if (response?.status === 200) {
        const { data } = response;
        dispatch({ type: ALL_FILTERED_BATCHES, payload: data });
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log("filted batches error", error);
    }
  },[dispatch]);

  useEffect(() => {

    if (formData.Courses) {
      fetchFiltedBatch(formData.Courses);
    }
  }, [formData.Courses,fetchFiltedBatch]);

  return {
    NewStudentadd,
    formData,
    setFormData,
  };
};
