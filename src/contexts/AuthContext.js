// src/contexts/AuthContext.js
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import {
  INNER_LOADER,
  CLEAR_INNER_LOADER,
  ALL_FILTERED_COURSES,
} from "../utils/constants";
import { getAllFilteredCourse } from "../services/authServices";

import { useDispatch } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cookieUser = Cookies.get("user");
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!Cookies.get("token")
  );

  const dispatch = useDispatch();

  const fetchAllFilteredCourse = useCallback(async () => {
    dispatch({ type: INNER_LOADER, payload: true });

    try {
      const response = await getAllFilteredCourse();
      if (response?.status === 200) {
        const { data } = response;
        dispatch({ type: ALL_FILTERED_COURSES, payload: data });
      } else {
        console.log(response.message);
      }
    } catch (eror) {
      console.error("fetch all filted courses error", eror);
    } finally {
      dispatch({ type: CLEAR_INNER_LOADER, payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllFilteredCourse();
  }, [fetchAllFilteredCourse]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
