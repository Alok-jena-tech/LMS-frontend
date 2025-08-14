// src/contexts/StudContext.js
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getAllCourse} from "../services/courseService";
import { useDispatch, useSelector } from "react-redux";
import {
  ALL_COURSES,
  INNER_LOADER,
  CLEAR_INNER_LOADER,
} from "../utils/constants";
import { useState } from "react";
const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const dispatch = useDispatch();
  const all_courses = useSelector((state) => state.course.all_courses);
  
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const fetchAllCourseData = useCallback(async () => {
    dispatch({ type: INNER_LOADER, payload: true });
    try {
      const response = await getAllCourse(currentPage, recordsPerPage);
      if (response?.status === 200) {
        const { data, message, totalRecords } = response;
        setTotalRecords(totalRecords);

        alert(message);
        dispatch({ type: ALL_COURSES, payload: data });
      } else {
        alert(response?.message);
      }
    } catch (err) {
      console.error("course get error", err);
    } finally {
      dispatch({ type: CLEAR_INNER_LOADER, payload: false });
    }
  }, [dispatch, currentPage, recordsPerPage]);

  useEffect(() => {
    if (!all_courses || all_courses.length === 0) {
      fetchAllCourseData();
    }
  }, [all_courses, fetchAllCourseData]);

  useEffect(() => {}, [currentPage, recordsPerPage]);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  // Memoized context value
  const contextValue = useMemo(
    () => ({
      fetchAllCourseData,
    }),
    [fetchAllCourseData]
  );

  
  return (
    <CourseContext.Provider
      value={{
        fetchAllCourseData,
        contextValue,
        totalPages,
        totalRecords,
        currentPage,
        recordsPerPage,
        setCurrentPage,
        setRecordsPerPage,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);
