import { useState } from "react";
import { addBatch } from "../services/batchServices";
import { updateBatch } from "../services/batchServices";
import { deleteBatchById } from "../services/batchServices";
import { useBatchContext } from "../contexts/BatchContext";
export const useBatch = () => {
  const {
    fetchAllBatches,
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setRecordsPerPage,
  } = useBatchContext();
  const [batches, setBatches] = useState([]);
  const [errors, setErrors] = useState({});

  const [singleRecord, setSingleRecord] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const [batchData, setBatchData] = useState({
    batchName: "",
    batchYear: "",
    description: "",
    capacity: "",
    startDate: "",
    endDate: "",
    Courses:"",
    Status: true,
  });

  const handleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleSingleUserUpdate = (e) => {
    const { name, value } = e.target;
    setSingleRecord((prev) => ({ ...prev, [name]: value }));
  };

  const createNewBatch = async () => {
    try {
      const response = await addBatch(batchData);
      console.log(batchData)
      if (response.status === 200) {
        alert("Batch created succesfully");
        setBatchData({
          batchName: "",
          batchYear: "",
          description: "",
          capacity: "",
          startDate: "",
          endDate: "",
           Courses:"",
        });
        setErrors({});
        fetchAllBatches();
      } else {
        alert("Batch couldn't create");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateSingleBatch = async () => {
    try {
      const {
        batchName,
        batchYear,
        description,
        capacity,
        startDate,
        endDate,
        
      } = singleRecord;
      const response = await updateBatch({
        Id: singleRecord._id,
        batchName,
        batchYear,
        description,
        capacity,
        startDate,
        endDate,
      });
      if (response.status === 200) {
        alert("update successfully");
        handleViewModal();
        fetchAllBatches();
      } else {
        alert("could not update");
        handleViewModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSingleBatch = async () => {
    try {
      const response = await deleteBatchById({ Id: singleRecord._id });
      if (response.status === 200) {
        alert("deleted succesfully");
        handleViewModal();
        fetchAllBatches();
      } else {
        alert("could not deleted");
        handleViewModal();
      }
    } catch (err) {
      console.error("delete batch error", err);
    }
  };
  return {
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setRecordsPerPage,
    
    batchData,
    setBatchData,
    batches,
    setBatches,
    errors,
    setErrors,
    createNewBatch,

    handleViewModal,
    handleSingleUserUpdate,
    deleteSingleBatch,
    singleRecord,
    setSingleRecord,
    viewModal,
    setViewModal,
    modalType,
    setModalType,
    updateSingleBatch,
  };
};
