import InlineLoader from "../../../components/ui/InlineLoader";
import Table from "../../../components/ui/Table";
import { useSelector } from "react-redux";
import SingleView from "../../../components/ui/SingleViewModal";
import Modal from "../../../components/ui/Modal";
import { useBatch } from "../../../hooks/useBatch";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";
import styles from "./ManageBatch.module.css";
import { Pagination } from "../../../components/ui/Pagination";

const ManageBatches = () => {
  const {
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setSingleRecord,
    singleRecord,
    viewModal,
    setModalType,
    modalType,
    handleViewModal,
    handleSingleUserUpdate,
    updateSingleBatch,
    deleteSingleBatch,
  } = useBatch();

  const allBatches = useSelector((state) => state.batch.all_batches);
  console.log("all batches", allBatches);
  const isLoading = useSelector((state) => state.loader.inner_loader);
  const columns = ["batchName", "capacity", "batchYear", "Courses", "Status"];

  const statusOptions = [
    { label: "true", value: true },
    { label: "false", value: false },
  ];

  const actions = {
    view: (row, View) => {
      handleViewModal();
      setSingleRecord(row);
      setModalType(View);
    },
    edit: (row, Edit) => {
      handleViewModal();
      setSingleRecord(row);
      setModalType(Edit);
    },
    delete: (row, Delete) => {
      handleViewModal();
      setSingleRecord(row);
      setModalType(Delete);
    },
  };
  return isLoading ? (
    <InlineLoader />
  ) : (
    <div>
      <Table columns={columns} data={allBatches} actions={actions}></Table>
      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        recordsPerPage={recordsPerPage}
        totalRecords={totalRecords}
      />
      {/* Pagination */}
      <Modal
        isOpen={viewModal}
        onClose={handleViewModal}
        title={
          modalType === "View"
            ? "View Batch details!"
            : modalType === "Edit"
            ? "Update this data"
            : "Delete this data"
        }
      >
        {modalType === "View" ? (
          <SingleView
            data={singleRecord}
            viewKeys={[
              "batchName",
              "batchYear",
              "description",
              "capacity",
              "startDate",
              "endDate",
              "Courses",

              "Status",
            ]}
          />
        ) : modalType === "Edit" ? (
          <>
            <div className={styles.updatemodal}>
              <div>
                <Input
                  type="text"
                  name="batchName"
                  value={singleRecord.batchName}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="capacity"
                  value={singleRecord.capacity}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="batchYear"
                  value={singleRecord.batchYear}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>

              <div>
                <Input
                  type="date"
                  name="startDate"
                  value={singleRecord.startDate}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
              <div>
                <Input
                  type="date"
                  name="endDate"
                  value={singleRecord.endDate}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
              <div>
                <textarea
                  name="description"
                  value={singleRecord.description}
                  onChange={handleSingleUserUpdate}
                  rows="3"
                  placeholder="Provide a brief description for the batch"
                ></textarea>
              </div>
              <div>
                <Select
                  type="text"
                  name="Status"
                  value={singleRecord.Status}
                  onChange={handleSingleUserUpdate}
                  className={styles.selectBox}
                  options={statusOptions}
                ></Select>
              </div>
              <div className={styles.btns}>
                <Button
                  type="button"
                  onClick={handleViewModal}
                  className={styles.cancelBtn}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={updateSingleBatch}
                  className={styles.updateBtn}
                >
                  Update
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className={styles.delete}>
              Do You want to delete <span>{singleRecord.batchName}</span>
            </p>
            <div className={styles.btns}>
              <Button
                type="button"
                onClick={handleViewModal}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>{" "}
              <Button type="button" onClick={deleteSingleBatch}>
                Delete
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ManageBatches;
