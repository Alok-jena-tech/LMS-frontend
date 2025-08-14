import { fetchData } from "./api";

export const addCourse = async (data) => {
  try {
    const response = await fetchData("create_course", {
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

export const getAllCourse = async (page = 1, limit = 10) => {
  try {
    const query = new URLSearchParams({ page, limit }).toString();
    const response = await fetchData(`get_all_courses?${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};


export const updateCourse = async (obj) => {
  try {
    const response = await fetchData("edit_course", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response;
  } catch (eror) {
    console.log(eror);
  }
};

export const deleteCourseById = async (data) => {
  try {
    const response = await fetchData("delete_one_course", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    return response;
  } catch (eror) {
    console.log(eror);
  }
};
