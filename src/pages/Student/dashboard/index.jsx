import Table from "../../../components/ui/Table";
import styles from "./index.module.css";

export default function UserOverview() {
  const columns = ["name", "email", "phone"];
  const data = [
    {
      name: "Rati",
      email: "ratiranjanmahanta1234@gmail.com",
      phone: "7077622445",
    },
    {
      name: "Rati",
      email: "ratiranjanmahanta1234@gmail.com",
      phone: "7077622445",
    },
  ];

  const actions = {
    view: (row) => alert("Viewing: " + JSON.stringify(row)),
    edit: (row) => alert("Editing: " + JSON.stringify(row)),
    delete: (row) => alert("Deleting: " + JSON.stringify(row)),
  };

  return (
    <div className={styles.body}>
      <h2>Students List</h2>
       <Table columns={columns} data={data} actions={actions} />
    </div>
  );
}
