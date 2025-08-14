import InlineLoader from "../../../components/ui/InlineLoader";
import { Pagination } from "../../../components/ui/Pagination";
import Table from "../../../components/ui/Table";
import { useSelector } from "react-redux";
import { useStudContext } from "../../../contexts/StudContext";

const ManageStudent = () => {
  const allStudentData = useSelector((state) => state.student.all_students);
  console.log("all students", allStudentData);
  const isLoading = useSelector((state) => state.loader.inner_loader);
  const columns = ["Full_name", "Email", "Phone_number","Batches","Courses"];

  const {
    totalPages,
    totalRecords,
    currentPage,
    setCurrentPage,
    recordsPerPage,
  } = useStudContext();

  const actions = {
    view: (row) => alert("Viewing: " + JSON.stringify(row)),
    edit: (row) => alert("Editing: " + JSON.stringify(row)),
    delete: (row) => alert("Deleting: " + JSON.stringify(row)),
  };
  return isLoading ? (
    <InlineLoader />
  ) : (
    <div>
      <Table columns={columns} data={allStudentData} actions={actions} />
      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        recordsPerPage={recordsPerPage}
        totalRecords={totalRecords}
      />
      {/* Pagination */}
    </div>
  );
};

export default ManageStudent;
