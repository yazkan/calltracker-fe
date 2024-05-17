import axios from "axios";
//const localUser = JSON.parse(localStorage.getItem("userInfo"));
const localUser = JSON.parse(localStorage.getItem("currentUser"));
export const postRequest = async (url, body) => {
  return await axios.post(url, body);
};
export const getRequest = async (url, body) => {
  return await axios.get(url, body);
};
export const putRequest = async (url, body) => {
  return await axios.put(url, body);
};


