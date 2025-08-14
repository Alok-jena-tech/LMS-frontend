import InlineLoader from "../../../components/ui/InlineLoader";
import Table from "../../../components/ui/Table";
import { useSelector } from "react-redux";
import SingleView from "../../../components/ui/SingleViewModal";
import Modal from "../../../components/ui/Modal";
import { useCourse } from "../../../hooks/useCourse";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";
import { Pagination } from "../../../components/ui/Pagination";
import styles from "./manageCourse.module.css";

const ManageCourses = () => {
  const {
    handleSingleUserUpdate,
    singleRecord,
    setSingleRecord,
    updateSingleCourse,
    deleteCourse,
    viewModal, 
    modelType, setModelType,
    handlViewModal,

        totalPages,
        totalRecords,
        currentPage,
        recordsPerPage,
        setCurrentPage,
  } = useCourse();
  const allCourseData = useSelector((state) => state.course.all_courses);
  console.log("all course",allCourseData)
  const isLoading = useSelector((state) => state.loader.inner_loader);
const columns = [
    "Name",
    "Price",
    "Duration",
    "Status",
    "Mode",
    
  ];
  const options = [
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
  ];
const statusOptions=[{label:"true",value:true},{label:"false",value:false}]
 

  const actions = {
    view: (row, View) => {
      handlViewModal();
      setSingleRecord(row);
      setModelType(View);
    },
    edit: (row, Edit) => {
      handlViewModal();
      setSingleRecord(row);
      setModelType(Edit);
    },
    delete: (row, Delete) => {
      handlViewModal();
      setSingleRecord(row);
      setModelType(Delete);
    },
  };

  return isLoading ? (
    <InlineLoader />
  ) : (
    <div>
      <Table columns={columns} data={allCourseData} actions={actions} />
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
        onClose={handlViewModal}
        title={
          modelType === "View"
            ? "View Single Course!"
            : modelType === "Edit"
            ? "Update this data"
            : "Delete this data"
        }
      >
        {modelType === "View" ? (
          <SingleView
            data={singleRecord}
            viewKeys={[
              "Name",
              "Price",
              "Duration",
              "Mode",
              "Start_date",
              "End_date",
              "Description",
              "Status",
            ]}
          />
        ) : modelType === "Edit" ? (
          <>
            <div className={styles.updatemodal}>
              <div>
                <Input
                  type="text"
                  name="Name"
                  value={singleRecord.Name}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="Price"
                  value={singleRecord.Price}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="Duration"
                  value={singleRecord.Duration}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
              <div>
                <Select
                  type="text"
                  name="Mode"
                  value={singleRecord.Mode}
                  onChange={handleSingleUserUpdate}
                  className={styles.selectBox}
                  options={options}
                ></Select>
              </div>
              <div>
                 <Input
                  type="date"
                  name="Start_date"
                  value={singleRecord.Start_date}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
              </div>
               <div>
                 <Input
                  type="date"
                  name="End_date"
                  value={singleRecord.End_date}
                  onChange={handleSingleUserUpdate}
                  className={styles.input}
                />
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
                  onClick={handlViewModal}
                  className={styles.cancelBtn}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={updateSingleCourse}
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
              Do You want to delete <span>{singleRecord.Name}</span>
            </p>
            <div className={styles.btns}>
              <Button
                type="button"
                onClick={handlViewModal}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>{" "}
              <Button type="button" onClick={deleteCourse}>
                Delete
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ManageCourses;
