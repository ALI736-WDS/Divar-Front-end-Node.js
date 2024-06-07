import api from "../configs/api";

const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const getAllPosts = () => api.get(""); //"" : "localhost3400"

export { getProfile, getPosts, getAllPosts };
