import axios from "axios";

// axios 객체 생성
export default axios.create({
  // baseURL 주소 변경해야함
  baseURL: "https://j9c103.p.ssafy.io:8080/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "ngrok-skip-browser-warning": "69420",
    withCredentials: true,
  },
});
