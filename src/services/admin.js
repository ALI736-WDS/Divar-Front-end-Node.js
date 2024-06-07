import api from "../configs/api";

const addCategory = (data) => api.post("category", data); //data ro post kon

const getCategory = () => api.get("category");

const deleteCategory = (_id) => api.delete(`category/${_id}`);

export { addCategory, getCategory, deleteCategory };
