// 기본페이지
import * as React from "react";
// css파일 호출(module.css형식으로 파일을 만들어서 호출하면 해당 지역변수느낌으로만 적용가능)
import style from "./MainPage.module.css";
// navigate(다른 주소로 이동)을 위해 호출
import { useNavigate } from "react-router-dom";
import mainVideo from "../assets/video/mainvideo.mp4";

const MainBackground = () => {
  return (
    <video autoPlay loop muted className={style.mainVideo}>
      <source src={mainVideo} type="video/mp4" />
    </video>
  );
};

function Main() {
  const navigate = useNavigate();

  // 로그인 버튼 클릭시 페이지 이동
  const handleOpenLogin = () => {
    navigate("/login");
  };
  // 회원가입 버튼 클릭시 페이지 이동
  const handleOpenSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={style.main}>
      <div className={style.video}>
        {/* 필요한 이미지 불러오기, src={process.env.PUBLIC_URL} 의 경우 현재 위치와 상관없이 react파일의 public폴더를 나타냄 */}
        {/* <img className={style.mainimage} src={process.env.PUBLIC_URL + "/images/main.png"} alt={"title"}></img> */}
        <MainBackground />
      </div>
      <div className={style.logodiv}>
        {/* 필요한 이미지 불러오기, src={process.env.PUBLIC_URL} 의 경우 현재 위치와 상관없이 react파일의 public폴더를 나타냄 */}
        <img
          className={style.logo}
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt={"title"}
        ></img>
      </div>
      <div className={style.btndiv}>
        {/* 로그인 창으로 이동하는 버튼 */}
        <button className={style.loginbtn} onClick={handleOpenLogin}>
          <p className={style.logintext}>로그인</p>
        </button>
      </div>
      <div className={style.btnsign}>
        {/* 회원가입 창으로 이동하는 버튼 */}
        <button className={style.signupbtn} onClick={handleOpenSignup}>
          <p className={style.signuptext}>회원가입</p>
        </button>
      </div>
    </div>
  );
}

export default Main;
