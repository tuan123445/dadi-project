/* eslint-disable prettier/prettier */
import axios from "axios";
export default () => {
  return axios.create({
    baseURL: "http://localhost:5000/",
    method: "POST",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};