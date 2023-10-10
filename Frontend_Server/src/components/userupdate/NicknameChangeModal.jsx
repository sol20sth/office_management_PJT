import * as React from "react";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import style from "./NicknameChangeModal.module.css"
import TextField from '@mui/material/TextField';
import http from "../../utils/axios"
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from "react-redux";
import { setname } from "../../redux/user"
const ModalComponents = (props) => {
    // 변경 닉네임
    const [newnickname, setnewnickname] = React.useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.UserInfo.user_id)
    const [showalert, setshowalert] = React.useState(false)

    //닉네임 규칙 체크 함수
    const nicknamecheck = (value) => {
        // 한글만 입력가능하게 영어,숫자는 제거
        const onlyKorean = value.replace(/[a-zA-Z]/g, '');
        // 최대 입력가능 길이 지정
        const namemaxLength = 8;
        // 최대 입력가능 길이 넘을시 더이상 입력받지 않도록 잘라버리기
        const nametruncatedValue = onlyKorean.slice(0,namemaxLength)
        // 위의 규칙을 준수한 아이디의 경우 사용자에게 보여주기 위해 저장
        setnewnickname(nametruncatedValue);
    };
    
    // 입력값이 변경될때 호출되는 이벤트
    const handleInputChange = (event) => {
        // 들어오는 props를 name과 value값으로 분리
        const { name, value } = event.target;
        // name이 닉네임인 경우
        if (name === 'nickname') {
            // 한글만 입력가능하게 영어,숫자는 제거
            const onlyKorean = value.replace(/[a-zA-Z]/g, '');
            // 최대 입력가능 길이 지정
            const namemaxLength = 8;
            // 최대 입력가능 길이 넘을시 더이상 입력받지 않도록 잘라버리기
            const nametruncatedValue = onlyKorean.slice(0,namemaxLength)
            // 위의 규칙을 준수한 아이디의 경우 사용자에게 보여주기 위해 저장
            setnewnickname(nametruncatedValue);
        }
    }

    const handleoknickname = () => {
        http({
          method:'put',
          url:'user/namechange', 
          data: {
            'user_id':user_id,
            'user_name':newnickname
          }
      })
          .then((response) => {
            // 성공적인 응답 처리
            console.log(response)
            if (response.data.message === 'success') {
                console.log("닉네임 변경 성공");
                dispatch(setname(newnickname))
                navigate('/login')
            } else {
                console.log('닉네임 변경 실패')
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
                <span className={style.nicknamechecktexthead}>
                {props.title}
                </span>
            </div>
            <div style={{ flex: "1" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "70%" }}>
                    <div className={style.username}>
                        <TextField id="outlined-username" placeholder="변경할 유저이름" label="닉네임" name="nickname" value={newnickname} onChange={handleInputChange} className={style.inputbox}/>
                    </div>
                    <div className={style.btn}>
                        <button className={style.closebtn} onClick={props.close}>
                                <p className={style.signuptext}>{props.btnclosetext}</p>
                        </button>
                        <button className={style.okbtn} onClick={handleoknickname}>
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