import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  ALL_BATCHES,
  INNER_LOADER,
  CLEAR_INNER_LOADER,
  // ALL_FILTERED_BATCHES,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBatches,
  // getAllFilteredBatches,
} from "../services/batchServices";

const BatchContext = createContext();

export const BatchProvider = ({ children }) => {
  const dispatch = useDispatch();
  const all_batches = useSelector((state) => state.batch.all_batches);

  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const fetchAllBatches = useCallback(async () => {
    dispatch({ type: INNER_LOADER, payload: true });
    try {
      const response = await getAllBatches(currentPage, recordsPerPage);
      if (response?.status === 200) {
        const { data, message, totalRecords } = response;
        setTotalRecords(totalRecords);
        alert(message);
        dispatch({ type: ALL_BATCHES, payload: data });
      } else {
        alert(response?.message);
      }
    } catch (err) {
      console.error("batches data couldn't get", err);
    } finally {
      dispatch({ type: CLEAR_INNER_LOADER, payload: false });
    }
  }, [dispatch, currentPage, recordsPerPage]);

  useEffect(() => {
    if (!all_batches || all_batches.length === 0) {
      fetchAllBatches();
    }
  }, [all_batches, fetchAllBatches]);

  useEffect(() => {}, [currentPage, recordsPerPage]);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  // Memoized context value
  const contextValue = useMemo(
    () => ({
      fetchAllBatches,
    }),
    [fetchAllBatches]
  );

  return (
    <BatchContext.Provider
      value={{
        contextValue,
        fetchAllBatches,
        totalPages,
        totalRecords,
        currentPage,
        recordsPerPage,
        setCurrentPage,
        setRecordsPerPage,
      }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export const useBatchContext = () => useContext(BatchContext);
