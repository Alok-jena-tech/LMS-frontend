import { fetchData } from "./api";
import Cookies from "js-cookie";

export const addBatch = async (data) => {
  const token = Cookies.get("token");
  try {
    const response = await fetchData("create_batch", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const getAllBatches = async (page = 1, limit = 10) => {
  try {
    const token = Cookies.get("token");

    const query = new URLSearchParams({ page, limit }).toString();
    const response = await fetchData(`get_all_batches?${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const updateBatch = async (data) => {
  try {
    const response = await fetchData("edit_batch", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (eror) {
    console.log(eror);
  }
};

export const deleteBatchById = async (data) => {
  try {
    const response = await fetchData("delete_one_batch", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (eror) {
    console.log(eror);
  }
};
