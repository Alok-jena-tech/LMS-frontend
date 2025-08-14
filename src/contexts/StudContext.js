// src/contexts/StudContext.js
import {
  ALL_STUDENT,
  INNER_LOADER,
  CLEAR_INNER_LOADER,
} from "../utils/constants";
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import { getAllStud } from "../services/studentService";
import { useDispatch, useSelector } from "react-redux";

const StudContext = createContext();

export const StudProvider = ({ children }) => {
  const dispatch = useDispatch();
  const all_students = useSelector((state) => state.student.all_students);

  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Memoized function
  const fetchAllStudentData = useCallback(async () => {
    dispatch({ type: INNER_LOADER, payload: true });
    try {
      const response = await getAllStud(currentPage, recordsPerPage);
      if (response?.status === 200) {
        const { data, message, totalRecords } = response;
        setTotalRecords(totalRecords);
        alert(message);
        dispatch({ type: ALL_STUDENT, payload: data });
      } else {
        alert(response?.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      dispatch({ type: CLEAR_INNER_LOADER, payload: false });
    }
  }, [dispatch, currentPage, recordsPerPage]);

  useEffect(() => {
    if (!all_students || all_students.length === 0) {
      fetchAllStudentData();
    }
  }, [all_students, fetchAllStudentData]);

  useEffect(() => {}, [currentPage, recordsPerPage]);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  // Memoized context value
  const contextValue = useMemo(
    () => ({
      fetchAllStudentData,
    }),
    [fetchAllStudentData]
  );

  return (
    <StudContext.Provider
      value={{
        contextValue,
        fetchAllStudentData,
        totalPages,
        totalRecords,
        currentPage,
        recordsPerPage,
        setCurrentPage,
        setRecordsPerPage
      }}
    >
      {children}
    </StudContext.Provider>
  );
};

export const useStudContext = () => useContext(StudContext);
