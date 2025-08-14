// const LOCAL = "http://localhost:8000/api";
const LOCAL = "http://localhost:5000/api";

// const RENDER = "https://react-admin-backend-qlmz.onrender.com/api";
const RENDER = "https://mern-stack-students.onrender.com/api";

const NGROK =
  "https://01ee-2409-40e2-1210-9082-ed61-c864-edfc-6924.ngrok-free.app/api";

// Set the environment: "local" | "render" | "ngrok"
const ENV = "render";

const getBaseUrl = () => {
  switch (ENV) {
    case "local":
      return LOCAL;
    case "render":
      return RENDER;
    case "ngrok":
      return NGROK;
    default:
      throw new Error("Invalid environment selected");
  }
};

export const fetchData = async (endpoint, options = {}) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error ${response.status}`);
  }

  return response.json();
};
