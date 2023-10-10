import axios from "axios";

// axios 객체 생성
const axiosToken = () => {
  // console.log(token, "토큰")
  return axios.create({
    // baseURL: "https://dd37-121-178-98-64.ngrok-free.app/",
    baseURL: "https://j9c103.p.ssafy.io:8080/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "ngrok-skip-browser-warning": "69420",
      "withCredentials": true,
      // "Authorization": `${token}`, // 전달받은 token을 사용
    },
  });
};

export default axiosToken;
