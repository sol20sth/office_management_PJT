// 회원가입 완료 페이지
import React from "react";
import style from "./SignupResultPage.module.css"
import { useNavigate } from 'react-router-dom';

function SignupResultPage() {
    const navigate = useNavigate();
    // 로그인 페이지로 이동
    const handleOpenLogin = () => {
        navigate("/login");
    };
    return (
        <div className={style.result}>
            <img src={process.env.PUBLIC_URL + "/images/Successmark.png"} alt={"title"}></img>
            <p className={style.resulttext}>회원가입이 완료되었습니다.</p>
            <button className={style.loginbtn} onClick={handleOpenLogin}>
                <p className={style.logintext}>로그인</p>
            </button>
        </div>
    )
}
export default SignupResultPage;