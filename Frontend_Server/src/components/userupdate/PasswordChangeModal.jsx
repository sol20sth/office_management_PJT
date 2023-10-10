import * as React from "react";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import style from "./PasswordChangeModal.module.css"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from "react-redux";
import { setpw } from "../../redux/user"
import http from "../../utils/axios"
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const ModalComponents = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.UserInfo.user_id)

    // 기존 비밀번호 보여주기 여부
    const [showoldPassword, setShowoldPassword] = React.useState(false);
    // 변경 비밀번호 보여주기 여부
    const [shownewPassword, setShownewPassword] = React.useState(false);
    // 변경 확인 비밀번호 보여주기 여부
    const [showCheckPassword, setShowCheckPassword] = React.useState(false);
    // 기존 비밀번호
    const [oldpassword, setoldpassword] = React.useState('');
    // 변경 비밀번호
    const [newpassword, setnewpassword] = React.useState('');
    // 변경 비밀번호 확인
    const [newpasswordcheck, setnewpasswordcheck] = React.useState('');
    // 비밀번호 일치여부(변경 비밀번호, 변경 비밀번호 확인)
    const [passwordMismatch, setPasswordMismatch] = React.useState(false);
    // 비밀번호 규칙 준수여부(문자,숫자,특수문자 1개 이상씩 포함)
    const [passwordChecking, setPasswordChecking] = React.useState(false);

    // 비밀번호 보기 / 숨기기 토글
    const handleClickShowoldPassword = () => setShowoldPassword((show) => !show);

    // 변경 비밀번호 보기 / 숨기기 토글
    const handleClickShownewPassword = () => setShownewPassword((show) => !show);

    // 변경 비밀번호 확인 보기 / 숨기기 토글
    const handleClickShowCheckPassword = () => setShowCheckPassword((show) => !show);

    // 비밀번호 보기 / 숨기기 토글에 마우스를 올렸을때 발생하는 기본이벤트 삭제
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // 기존비밀번호 미일치 알람
    const [showalert, setshowalert] = React.useState(false)

    //비밀번호 규칙 체크 함수
    const passwordCheck = (password) => {
        // 비밀번호 유효성 검사: 최소 8자 이상, 최대 16자 이하, 문자/숫자/특수문자 포함 여부 체크
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,17}$/;
        return passwordRegex.test(password);
    };
    
    // 입력값이 변경될때 호출되는 이벤트
    const handleInputChange = (event) => {
        // 들어오는 props를 name과 value값으로 분리
        const { name, value } = event.target;
        // name이 변경 비밀번호인 경우
        if (name === 'newpassword') {
            // 비밀번호 입력 길이를 16글자로 제한
            const checkpasswordvalue = value.slice(0, 16);
            setnewpassword(checkpasswordvalue);
            // 규칙 메시지 표시 여부
            if (value.trim() === '') {
                setPasswordChecking(false); // 빈 칸일 때 규칙 메시지 숨김
            } else {
                setPasswordChecking(!passwordCheck(value));
            }
        // name이 변경 비밀번호 확인인 경우
        } else if (name === 'newcheckpassword') {
            // 비밀번호 확인 입력 길이를 16글자로 제한
            const checkpasswordvalue1 = value.slice(0, 16);
            setnewpasswordcheck(checkpasswordvalue1);
            // 규칙메시지 표시여부
            if (value.trim() === '') {
                setPasswordMismatch(false);
            } else {
                // 비밀번호 확인과 일치하는지 확인
                setPasswordMismatch(value !== newpassword);
            }
        } else if (name === 'oldpassword') {
            // 비밀번호 확인 입력 길이를 16글자로 제한
            const checkpasswordvalue1 = value.slice(0, 16);
            setoldpassword(checkpasswordvalue1);
        };
    }

    const handleokpassword = () => {
        http({
          method:'put',
          url:'user/pwchange', 
          data: {
            'user_id':user_id, // 비밀번호 변경 유저 아이디
            'old_password':oldpassword, // 기존 비밀번호
            'new_password':newpassword // 변경 비밀번호
          }
      })
          .then((response) => {
            // 성공적인 응답 처리
            console.log(response)
            if (response.data.message === 'success') {
                console.log("비밀번호 변경 성공");
                dispatch(setpw(newpassword))
                navigate('/login')
            } else {
                console.log('비밀번호 변경 실패')
                setshowalert(true)
                setTimeout(() => {
                    setshowalert(false); // 5초 후에 Alert을 숨김
                  }, 5000);
            }
          })
          .catch((error) => {
            // 오류 처리
            console.error("회원탈퇴 오류:", error);
          });
        // axios 요청으로 회원탈퇴 요청 코드 작성해야함
      };

    return (
        <Modal open={props.open} onClose={props.close}>
            <Box sx={props.style}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
            <div style={{ marginTop: "2rem" }}>
                <span className={style.idchecktexthead}>
                {props.title}
                </span>
            </div>
            <div style={{ flex: "1" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "70%" }}>
                    <div className={style.pw}>
                        <TextField id="outlined-oldpassword" type={showoldPassword ? "text" : "password"} placeholder="비밀번호" label="비밀번호" name="oldpassword" value={oldpassword} onChange={handleInputChange} className={style.inputbox}/>
                        <span className={style.pwshowbutton1}>
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowoldPassword} onMouseDown={handleMouseDownPassword}>
                            {/* 비밀번호 보기 클릭 여부에 따라 보여주는 아이콘 설정 */}
                            {showoldPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </span>
                    </div>
                    <div className={style.pw}>
                        <TextField id="outlined-newpassword" type={shownewPassword ? "text" : "password"} placeholder="변경 비밀번호" label="변경 비밀번호" name="newpassword" value={newpassword} onChange={handleInputChange} className={style.inputbox}/>
                        <span className={style.pwshowbutton1}>
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShownewPassword} onMouseDown={handleMouseDownPassword}>
                            {/* 비밀번호 보기 클릭 여부에 따라 보여주는 아이콘 설정 */}
                            {shownewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </span>
                    </div>
                    {/* 비밀번호가 비밀번호 규칙을 준수하지 않을경우 보여줄 경고 메시지 */}
                    {passwordChecking && (
                        <div>
                            <div className={style.passwordchecktext}>
                                <p>비밀번호는 숫자, 문자, 특수문자를</p>
                            </div>
                            <div className={style.passwordchecktext2}>
                                <p>최소1개 이상씩 포함해야 합니다</p>
                            </div>
                        </div>
                    )}
                    <div className={style.pw}>
                        <TextField id="outlined-newcheckpassword" type={showCheckPassword ? "text" : "password"} placeholder="변경 비밀번호 확인" label="변경 비밀번호 확인" name="newcheckpassword" value={newpasswordcheck} onChange={handleInputChange} className={style.inputbox}/>
                        <span className={style.pwshowbutton1}>
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowCheckPassword} onMouseDown={handleMouseDownPassword}>
                            {/* 비밀번호 보기 클릭 여부에 따라 보여주는 아이콘 설정 */}
                            {showCheckPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </span>
                    </div>
                    {/* 비밀번호와 비밀번호 확인이 일치하지 않을시 보여줄 경고창 */}
                    {passwordMismatch && (
                        <div className={style.passwordmismatchchecktext}>
                            <p>비밀번호가 일치하지 않습니다</p>
                        </div>
                    )}
                    <div className={style.btn}>
                        <button className={style.closebtn} onClick={props.close}>
                                <p className={style.signuptext}>{props.btnclosetext}</p>
                        </button>
                        <button className={style.okbtn} onClick={handleokpassword}>
                                <p className={style.signuptext}>{props.btnoktext}</p>
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            {showalert && (
                <Alert severity="warning" sx={{position:'absolute',top:'0vh', width:'90%'}}>기존 비밀번호가 일치하지 않습니다.</Alert>
            )}
            </Box>
        </Modal>
    )
}

export default ModalComponents;