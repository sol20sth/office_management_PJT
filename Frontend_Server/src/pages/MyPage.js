import * as React from "react";
import style from "./MyPage.module.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PasswordChangeModal from "../components/userupdate/PasswordChangeModal";
import NicknameChangeModal from "../components/userupdate/NicknameChangeModal";
import CorChangeModal from "../components/userupdate/CorChangeModal";
import Alert from "@mui/material/Alert";
import SignoutModal from "../components/userupdate/SignoutModal";
import { setLogout, setname } from "../redux/user";
import axiosToken from "../utils/axiostoken";
import http from "../utils/axios"
import {setAllofficeBook,setMyofficeBook} from "../redux/office"
function MyPage() {
  const user = useSelector((state) => state.UserInfo);
  console.log(user)
  const user_id = user.user_id
  const user_pw = user.user_pw;
  const user_name = user.user_name;
  console.log(user_name)
  const com_num = user.com_num;
  const dep_num = user.dep_num;
  // const token = user.accessToken;
  // const token = useSelector((state)=>state.UserInfo.deviceToken)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordchange, setpasswordchange] = React.useState(false);
  const [nicknamechange, setnicknamechange] = React.useState(false);
  const [corchange, setcorchange] = React.useState(false);
  const [signoutopen, setsignoutopen] = React.useState(false);
  // 로봇 시리얼 번호, 회사명/부서명 일치여부
  const [alertopen, setalertopen] = React.useState(false);
  const handleopenpassword = () => {
    setpasswordchange(true);
  };
  const handleclosepassword = () => {
    setpasswordchange(false);
  };
  const handleopennickname = () => {
    setnicknamechange(true);
  };

  const handleclosenickname = () => {
    setnicknamechange(false);
  };

  const handleopencor = () => {
    setcorchange(true);
  };

  const handleclosecor = () => {
    setcorchange(false);
  };

  const handleokcor = () => {
    // axios요청으로 회사명/부서명 과 로봇 시리얼 번호가 일치한지 확인  
    const isCorrect = false;
    if (!isCorrect) {
      setalertopen(true);
      setTimeout(() => {
        setalertopen(false); // 1초 후에 Alert을 숨김
      }, 1000);
    } else {
      setcorchange(false);
      // axios요청으로 회사명/부서명 및 로봇 시리얼 번호 변경
    }
  };
  const handlelogout = () => {
    dispatch(setLogout());
    dispatch(setAllofficeBook([]))
    dispatch(setMyofficeBook(null))
    // console.log(token);
    navigate("/login");
  };
  const handlesignout = () => {
    console.log("회원탈퇴");
    setsignoutopen(true);
  };

  const handleclosesignout = () => {
    setsignoutopen(false);
  };

  const handleoksignout = () => {
    console.log(user_pw)
    http({
      method: "delete",
      url: "user/signout",
      data: {
        'user_id':user_id,
        'password':user_pw
      }
    })
      .then((response) => {
        // 성공적인 응답 처리
        if (response.data.message === 'success') {
          console.log("회원탈퇴 성공:", response.data);
          setsignoutopen(false);
          navigate("/");
        } else {
          console.log(response)
        }
      })
      .catch((error) => {
        // 오류 처리
        console.error("회원탈퇴 오류:", error);
      });

    // axios 요청으로 회원탈퇴 요청 코드 작성해야함
  };

  // 모달창 기본 스타일 지정
  const style1 = {
    position: "fixed",
    top: "0",
    left: "0",
    rigiht: "0",
    width: "100%",
    height: "22rem",
    bgcolor: "white",
    borderRadius: "0 0 1rem 1rem",
    boxShadow: 20,
    textAlign: "center",
    overflowY: "auto", // 스크롤바 추가
    outline: "none",
  };

  const style2 = {
    position: "fixed",
    top: "0",
    left: "0",
    rigiht: "0",
    width: "100%",
    height: "15rem",
    bgcolor: "white",
    borderRadius: "0 0 1rem 1rem",
    boxShadow: 20,
    textAlign: "center",
    overflowY: "auto", // 스크롤바 추가
    outline: "none",
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "12rem",
          backgroundColor: "#ED7B7B",
        }}
      />
      <p className={style.maintext}>마이페이지</p>
      <div className={style.usertext}>
        <p className={style.username}>{user_name}</p>
        <p className={style.welcome}>님 환영합니다.</p>
      </div>
      <p className={style.titletext}>개인 정보</p>
      <p className={style.contnettext} onClick={handleopenpassword}>
        비밀번호 수정
      </p>
      <p className={style.contnettext} onClick={handleopennickname}>
        닉네임 변경
      </p>
      <p className={style.contnettext} onClick={handleopencor}>
        회사 및 부서명 변경
      </p>
      <p className={style.contnettext} onClick={handlelogout}>
        로그 아웃
      </p>
      <p className={style.contnettext} onClick={handlesignout}>
        회원 탈퇴
      </p>
      <PasswordChangeModal
        open={passwordchange}
        close={handleclosepassword}
        style={style1}
        title="비밀번호 변경"
        btnclosetext="취 소"
        btnoktext="확 인"
      />
      <NicknameChangeModal
        open={nicknamechange}
        close={handleclosenickname}
        style={style2}
        title="닉네임 변경"
        btnclosetext="취 소"
        btnoktext="확 인"
      />
      <CorChangeModal
        open={corchange}
        ok={handleokcor}
        close={handleclosecor}
        style={style1}
        title="회사 및 부서명 변경"
        btnclosetext="취 소"
        btnoktext="확 인"
      />
      {alertopen && (
        <Alert severity="error" className={style.alertstyle}>
          회사명 및 부서명과 로봇 시리얼 번호가 일치하지 않습니다.
        </Alert>
      )}
      <SignoutModal
        open={signoutopen}
        close={handleclosesignout}
        style={style2}
        title="회원 탈퇴"
        maintext="회원 탈퇴시 등록된 모든 정보가 삭제됩니다. 정말 탈퇴 하시겠습니까?"
        btnclosetext="취 소"
        ok={handleoksignout}
        btnoktext="확 인"
      />
    </div>
  );
}

export default MyPage;
