// 로그인 페이지
import * as React from "react";
// useSelector = redux-toolkit store에 저장한 initialState 사용을 위해 호출, useDispath는 redux-toolkit store에 저장한 initialState값을 변경할때 사용
import { useSelector, useDispatch } from "react-redux";
// axios요청 컴포넌트 호출
import http from "../utils/axios";
// css파일 호출(module.css형식으로 파일을 만들어서 호출하면 해당 지역변수느낌으로만 적용가능)
import style from "./LoginPage.module.css";
// navigate(다른 주소로 이동)을 위해 호출
import { useNavigate } from "react-router-dom";
// mui 사용
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// redux-toolkit store에 저장한 initialState값을 변경을 위해 사용하는 set함수
import {
  setloginchecked,
  setAutoLoginChecked,
  setpw,
  setid,
  setname, setcomname, setdepname, setcomnum, setdepnum, setseatnum, setelecnum, setareanum 
} from "../redux/user";
import Alert from '@mui/material/Alert';


function Login() {
  // 로그인 제한 알람
  const [showalert, setshowalert] = React.useState(false)
  // 자동 로그인 체크 여부
  const devicetoken = useSelector((state) => state.UserInfo.deviceToken)
  const isAutoLoginChecked = useSelector(
    (state) => state.UserInfo.isAutoLoginChecked
  );
  // 비밀번호 보여주는 여부
  const [showPassword, setShowPassword] = React.useState(false);
  // 사용자 입력 아이디 값
  const [username, setUsernameLocal] = React.useState("");
  // 사용자 입력 비밀번호 값
  const [password, setPasswordLocal] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // "자동로그인" 체크를 해제할 때 로그인 정보를 지우는 처리
  const handleAutoLoginCheckboxChange = (event) => {
    const { checked } = event.target;
    dispatch(setAutoLoginChecked(checked));
    dispatch(setloginchecked(checked));

    if (!checked) {
      // "자동로그인" 체크를 해제했을 때 로그인 정보를 제거
      dispatch(setid(""));
      dispatch(setpw(""));
    }
  };

  // 자동로그인 정보를 store에 저장
  React.useEffect(() => {
    if (isAutoLoginChecked) {
      dispatch(setid(username));
      dispatch(setpw(password));
    } else {
      dispatch(setid(""));
      dispatch(setpw(""));
    }
  }, [isAutoLoginChecked, username, password]);

  // 페이지가 처음 로드될 때 store 자동로그인 정보 가져오기
  const storeuserid = useSelector((state) => state.UserInfo.user_id);
  const storedpassword = useSelector((state) => state.UserInfo.user_pw);
  // 가지고온 자동로그인 정보 아이디,비밀번호 값으로 할당
  React.useEffect(() => {
    if (storeuserid && storedpassword) {
      setUsernameLocal(storeuserid);
      setPasswordLocal(storedpassword);
      dispatch(setAutoLoginChecked(true));
    }
  }, [dispatch]);

  // 사용자가 아이디, 비밀번호 입력시 입력값 username,password변수에 할당
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsernameLocal(value);
    } else if (name === "password") {
      setPasswordLocal(value);
    }
  };

  // 로그인 버튼 클릭시 
  const handleOpenLogin = () => {
    http({
        method:'post',
        url:'user/signin', 
        data: {
          'user_id': username,
          'password': password,
          'device_token':devicetoken
        }
    })
    .then((res) => {
      console.log(res)
      if (res.data.message === 'success') {
        dispatch(setid(res.data.userInfo.userId))
        dispatch(setpw(password))
        dispatch(setname(res.data.userInfo.userName))
        dispatch(setelecnum(res.data.userInfo.robotSerial))
        dispatch(setcomname(res.data.userInfo.comName))
        dispatch(setcomnum(res.data.userInfo.comNum))
        dispatch(setdepnum(res.data.userInfo.depNum))
        dispatch(setdepname(res.data.userInfo.depName))
        dispatch(setseatnum(res.data.userInfo.seatNum))
        dispatch(setareanum(res.data.userInfo.areaNum))
        navigate("/home");
      } else {
        setshowalert(true)
        setTimeout(() => {
            setshowalert(false); // 5초 후에 Alert을 숨김
          }, 5000);
      }
    })
    .catch((err) => {
        console.log(err)
    })
  };

  // 회원가입 버튼 클릭시 회원가입 페이지로 이동
  const handleOpenSignup = () => {
    navigate("/signup");
  };

  // password 보기 버튼을 누르면 showpassword변수값을 기존값과 반대로 변경
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // 페이지에 존재하는 back버튼클릭시 페이지 이동
  const handleBackBtnClick = () => {
    navigate("/");
  };

  // 실제 화면에 전시할 코드
  return (
    // 전체 스타일 설정


    <div className={style.loginmain}>
      {/* back버튼 표현 */}
      <div className={style.loginbackbtn}>
        {/* back버튼을 포함하는 box 표시 */}
        <Box
          component="span"
          sx={{
            p: 1,
            border: "1px solid #E8ECF4",
            display: "flex",
            justifyItems: "center",
          }}
        >
          {/* 백버튼을 mui에서 가지고 와서 표시 */}
          <KeyboardArrowLeftIcon onClick={handleBackBtnClick} />
        </Box>
      </div>
      {/* 페이지에서 보여줄 제목 */}
      <div>
        <h1 className={style.loginmaintext} style={{ fontFamily: "puradak" }}>
          로그인
        </h1>
      </div>
      {/* 실제 사용자에게 보여지는 로그인 입력창 */}
      <div className={style.logincontainer}>
        {/* 아이디 입력 */}
        <TextField
          id="outlined-id"
          // 사용자에게 필수 입력 요구시 required 작성
          required
          // placeholder의 경우 textfield가 사용자의 클릭이 없을시 box내에 보여줄 내용입력
          placeholder="아이디를 입력해주세요"
          // label의 경우 textfield를 사용자가 클릭하고 내용을 입력할때 왼쪽 위에 이 입력창은 어떠 입력창이다 라는 것을 보여주기 위한 설명
          label="아이디"
          // 다른 textfield와의 구분을 위해 name지정
          name="username"
          // 사용자가 입력한 값을 저장한 변수 지정
          value={username}
          // 변경사항 발생시 handleInputChange변수가 계속 실행
          onChange={handleInputChange}
          // className을 통한 css내 inputbox 스타일 반영
          className={style.inputbox}
        />
        {/* 비밀번호 입력 */}
        <div className={style.pwcontainer}>
          <TextField
            id="outlined-password"
            // 비밀번호의 경우 type을 지정하여 비밀번호 보여주기 버튼의 true/false값에 따라 text형태로 입력내용을 전부 보여줄지? 아니면 password형태로
            // *로 표시해서 보여줄지 결정
            type={showPassword ? "text" : "password"}
            required
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호"
            name="password"
            value={password}
            onChange={handleInputChange}
            className={style.inputbox}
          />
          {/* 비밀번호 보여주기 버튼 */}
          <span className={style.pwshowbutton}>
            <IconButton
              aria-label="toggle password visibility"
              // 해당 버튼 클릭시 실행할 함수 지정
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {/* showPassword값에 따라 보여줄 아이콘을 다르게 표시 */}
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </span>
        </div>
        {/* 자동로그인 버튼 표시 */}
        <div className={style.autologincontainer}>
          <FormGroup>
            <FormControlLabel
              control={
                // 체크박스로 만들어서 사용자가 필요에 따라 선택하게 설정
                <Checkbox
                  // 체크시 isAutoLoginChecked값을 변경
                  checked={isAutoLoginChecked}
                  onChange={handleAutoLoginCheckboxChange}
                  // 스타일 지정
                  sx={{ "& .MuiSvgIcon-root": { fontSize: "1.2rem" } }}
                />
              }
              // label= checkbox옆에 사용자에게 보여줄 설명 작성
              label={<span style={{ fontSize: "0.9rem" }}>자동 로그인</span>}
            />
          </FormGroup>
        </div>
        {/* 로그인 버튼 작성 */}
        <button className={style.loginbtn} onClick={handleOpenLogin}>
          <p className={style.logintext}>로그인</p>
        </button>
        {/* 회원가입으로 이동할 수 있게 사용자에게 표시 */}
        <div className={style.signupcontainer}>
          <div className={style.signupflexcontainer}>
            <div>
              <p style={{ fontFamily: "puradak" }}>회원이 아니신가요?</p>
            </div>

            <div>
              <Button
                onClick={handleOpenSignup}
                style={{
                  fontSize: "0.87rem",
                  color: "#ED7B7B",
                  fontFamily: "puradak",
                }}
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showalert && (
                <Alert severity="warning" sx={{position:'absolute',top:'0vh', width:'90%'}}>아이디 또는 비밀번호를 확인바랍니다.</Alert>
            )}
    </div>

  );
}

// react의 기본형태
export default Login;