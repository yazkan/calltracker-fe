import axios from "axios";
//const localUser = JSON.parse(localStorage.getItem("userInfo"));
const localUser={id:1}
export const postRequest = async (url, body) => {
  return await axios.post(url, body);
};
export const getRequest = async (url, body) => {
  return await axios.get(url, body);
};



export const postRequestForThemselves = async (url, body) => {
  return await axios.post(url+localUser.id, body);
};
export const getRequestForThemselves = async (url, body) => {
  return await axios.get(url+"/"+localUser.id, body);
};

