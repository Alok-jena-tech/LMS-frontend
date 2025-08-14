import { fetchData } from "./api";

export const getAllStud = async (page = 1, limit = 10) => {
  try {
    const query=new URLSearchParams({page,limit}).toString();

    const response = await fetchData(
      `get_all_students?${query}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const AddStudent = async (data) => {
  try {
    const response = await fetchData("student", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const getAllFilteredBatches = async (courseId) => {
  try {
    const response = await fetchData("get_filtered_batches", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        course_id:courseId,
      },
    });
    return response;
  } catch (error) {
    console.error("get all filted batches eror", error);
  }
};