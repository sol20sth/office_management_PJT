// 회원가입 페이지
import React, { useState, useEffect } from 'react';
// useSelector = redux-toolkit store에 저장한 initialState 사용을 위해 호출, useDispath는 redux-toolkit store에 저장한 initialState값을 변경할때 사용
import { useSelector, useDispatch } from 'react-redux';
// css파일 호출(module.css형식으로 파일을 만들어서 호출하면 해당 지역변수느낌으로만 적용가능)
import style from "./SignupPage.module.css"
// navigate(다른 주소로 이동)을 위해 호출
import { useNavigate } from 'react-router-dom';
// mui icon호출
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import ModalComponents from '../components/signup/ModalComponents';
import ModalSelet from '../components/signup/ModalSelect'
import http from '../utils/axios'
import { type } from '@testing-library/user-event/dist/type';
import { setid, setpw, setname,setcomnum, setdepnum, setelecnum } from '../redux/user'

// 회원가입 페이지를 두개로 나눠서 구성하기 위해 mui의 Step을 사용하는데 이를 위해 필요한 steps 정의
const steps = [
    '기본 정보',
    '자리 선택',
  ];

function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 비밀번호 보여주기 여부
    const [showPassword, setShowPassword] = React.useState(false);
    // 비밀번호 확인 보여주기 여부
    const [showCheckPassword, setShowCheckPassword] = React.useState(false);
    // 닉네임
    const [username, setUsernameLocal] = React.useState('');
    // 비밀번호
    const [password1, setPasswordLocal1] = React.useState('');
    // 비밀번호 확인
    const [password2, setPasswordLocal2] = React.useState('');
    // 아이디
    const [id, setID] = useState('');
    // 회사 및 부서명
    const [corporatname, setcorporatname] = React.useState("회사 및 부서명");
    // 로봇 시리얼 번호
    const [robotnumber,setRobotNumber] = React.useState('');
    // 비밀번호 일치여부(비밀번호, 비밀번호 확인)
    const [passwordMismatch, setPasswordMismatch] = React.useState(false);
    // 비밀번호 규칙 준수여부(문자,숫자,특수문자 1개 이상씩 포함)
    const [passwordChecking, setPasswordChecking] = React.useState(false);
    // 회사 및 부서명 선택 모달창 open여부
    const [corporatenameselect, setcorporatenameselect] = React.useState(false)
    // 회원가입 2단계로 가기 위한 조건 충족여부
    const [signupabletwo, setsignupabletwo] = React.useState(false)
    // 아이디 중복확인 결과 사용가능(중복이 아니다 => 사용가능 모달창 open)
    const handleOpenIDFalseCheck = () => setIDModalFalseOpen(true);
    // 아이디 중복확인 결과 사용불가능(중복이다 => 사용불가 모달창 open)
    const handleOpenIDTrueCheck = () => setIDModalTrueOpen(true);
    // 아이디 중복이 아니라 사용가능하다는 모달창 open관련
    const [IDModalFalseopen, setIDModalFalseOpen] = React.useState(false);
    // 아이디 중복이라 사용불가능하다는 모달창 open 관련
    const [IDModalTrueopen, setIDModalTrueOpen] = React.useState(false);
    // 아이디 중복이 아니라 사용가능하다는 모달창 종료
    const handleCloseIDCheckFalse = () => {setIDModalFalseOpen(false); }
    // 아이디 중복이라 사용불가능하다는 모달창 종료
    const handleCloseIDCheckTrue = () => setIDModalTrueOpen(false) ;
    // 로봇 시리얼 번호 사용가능(사용가능하다는 모달창 open)
    const handleOpenRobotFalseCheck = () => setRobotModalFalseOpen(true);
    // 로봇 시리얼 번호 사용불가능(올바르지 않다는 모달창 open)
    const handleOpenRobotTrueCheck = () => setRobotModalTrueOpen(true);
    // 로봇 시리얼 번호 사용가능(사용가하다는 모달창 close)
    const handleCloseRobotCheckFalse = () => setRobotModalFalseOpen(false) 
    // 로봇 시리얼 번호 사용불가능(사용불가능하다는 모달창 close)
    const handleCloseRobotCheckTrue = () => setRobotModalTrueOpen(false) ;
    // 로봇 시리얼 번호 사용가능 모달창 open관련 변수
    const [RobotModalFalseopen, setRobotModalFalseOpen] = React.useState(false);
    // 로봇 시리얼 번호 사용불가능 모달창 open관련 변수
    const [RobotModalTrueopen, setRobotModalTrueOpen] = React.useState(false);
    // 회사명
    const [corname, setcorname] = React.useState('');
    // 부서명
    const [partname, setpartname] = React.useState('')
    // 회사명 선택여부
    const [cornameselect, setcornameselect] = React.useState(false);
    // 부서명 선택여부
    const [partnameselect, setpartnameselect] = React.useState(false);
    
    // 회사명 리스트
    const [building, setBuilding] = useState([]);
    const [buildingmenuItems, setBuildingmenuItems] = useState([]);

    useEffect(() => {
        http({
            method:'get',
            url:'user/signup/company',
        })
        .then((res) => {
            setBuilding(res.data.company);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    useEffect(() => {
        // building 배열이 업데이트될 때마다 buildingmenuItems를 다시 생성합니다.
        const menuItems = building.map((company, index) => (
          <MenuItem key={index} value={(index + 1) * 10}>
            {company}
          </MenuItem>
        ));
        setBuildingmenuItems(menuItems);
      }, [building]);

    // 부서명 리스트
    const [part, setpart] = useState([]);
    const [partmenuItems, setpartmenuItems] = useState([]);


    // 회사명 선택시
    const handlebuildingChange = (event) => {
        setcorname(event.target.value);
      };

    // 부서명 선택시
    const handlepartChange = (event) => {
        setpartname(event.target.value)
    }

    // 중복체크를 완료했는지 여부를 담을 변수
    const [isIdChecked, setIsIdChecked] = useState(false);

    // 로봇 시리얼넘버 확인을 완료했는지 여부를 담을 변수
    const [isRobotNumberChecked, setisRobotNumberChecked] = useState(false);

    // 아이디 중복체크 버튼 사용가능여부 판별
    const isLoginButtonClickable = id.length >= 6;

    // 로봇 시리얼넘버 버튼 사용가능여부 판별
    const isRobotButtonClickable = robotnumber.length >= 6

    // 비밀번호 보기 / 숨기기 토글
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // 비밀번호 확인 보기 / 숨기기 토글
    const handleClickShowCheckPassword = () => setShowCheckPassword((show) => !show);

    // 비밀번호 보기 / 숨기기 토글에 마우스를 올렸을때 발생하는 기본이벤트 삭제
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //비밀번호 규칙 체크 함수
    const passwordCheck = (password) => {
        // 비밀번호 유효성 검사: 최소 8자 이상, 최대 16자 이하, 문자/숫자/특수문자 포함 여부 체크
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,17}$/;
        return passwordRegex.test(password);
    };

    // 아이디 중복체크 버튼 클릭 이벤트 핸들러
    const handleOpenCheckID = () => {
        if (isLoginButtonClickable === true) {
        // idcheckresult에 따라서 '사용가능or중복' 여부 판별해서 보여주는 모달창 결정
        // true는 중복, false는 사용가능
        http({
            method:'post',
            url:'user/signup/idcheck',
            data:{
            "user_id": id,
            },
        })
        .then((res) => {
            if (res.data.message === "false") {
            handleOpenIDFalseCheck(true);
            // 중복체크가 완료되었으므로 isIdChecked를 true로 설정
            setIsIdChecked(true);
            } else {
            handleOpenIDTrueCheck(true);
            // 중복체크 결과가 false일 경우 isIdChecked를 false로 설정
            setIsIdChecked(false); 
            }
        })
        .catch((err) => {
            console.log(err)
        })
        }
    };

    // 로봇 시리얼넘버 체크 버튼 클릭 이벤트 핸들러
    const handleOpenCheckRobotId =() => {
        if (isRobotButtonClickable) {
            http({
                method:'post',
                url:'user/signup/serialcheck',
                data:{
                "company": building[corname/10-1],
                "department":part[partname/10-1],
                "robot_serial":robotnumber
                },
            })
            .then((res) => {
                if (res.data.message === "success") {
                    handleOpenRobotFalseCheck(true)
                    setisRobotNumberChecked(true)
                } else {
                    handleOpenRobotTrueCheck(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    // 입력값이 변경될때 호출되는 이벤트
    const handleInputChange = (event) => {
        // 들어오는 props를 name과 value값으로 분리
        const { name, value } = event.target;
        // name이 닉네임인 경우
        if (name === 'username') {
            // 한글만 입력가능하게 영어,숫자는 제거
            const onlyKorean = value.replace(/[a-zA-Z]/g, '');
            // 최대 입력가능 길이 지정
            const namemaxLength = 8;
            // 최대 입력가능 길이 넘을시 더이상 입력받지 않도록 잘라버리기
            const nametruncatedValue = onlyKorean.slice(0,namemaxLength)
            // 위의 규칙을 준수한 아이디의 경우 사용자에게 보여주기 위해 저장
            setUsernameLocal(nametruncatedValue);
        // name이 비밀번호인 경우
        } else if (name === 'password1') {
            // 비밀번호 입력 길이를 16글자로 제한
            const checkpasswordvalue = value.slice(0, 16);
            setPasswordLocal1(checkpasswordvalue);
            // 규칙 메시지 표시 여부
            if (value.trim() === '') {
                setPasswordChecking(false); // 빈 칸일 때 규칙 메시지 숨김
            } else {
                setPasswordChecking(!passwordCheck(value));
            }
        // name이 비밀번호 확인인 경우
        } else if (name === 'password2') {
            // 비밀번호 확인 입력 길이를 16글자로 제한
            const checkpasswordvalue1 = value.slice(0, 16);
            setPasswordLocal2(checkpasswordvalue1);
            // 규칙메시지 표시여부
            if (value.trim() === '') {
                setPasswordMismatch(false);
            } else {
                // 비밀번호 확인과 일치하는지 확인
                setPasswordMismatch(value !== password1);
            }
        // name이 로봇 시리얼 번호 인경우 
        } else if (name === 'robotnumber') {
            // 로봇 시리얼 번호는 영어 소,대문자 숫자만 작성가능하게 규칙 설정
            const robotnum = value.replace(/[^a-zA-Z0-9]/g, '')
            // 최대 작성길이 설정
            const robotnumLength = 10
            // 최대 작성길이 안으로만 작성가능하게 설정
            const lastrobtnum = robotnum.slice(0,robotnumLength)
            // 사용자 입력값 저장
            setRobotNumber(lastrobtnum)
        } else if (name === 'id') {
            // 영어 대소문자, 숫자만 입력 가능하도록 정규식을 이용하여 유효성 검사
            const onlyId = value.replace(/[^a-zA-Z0-9]/g, '')
            // 최대 15자까지만 입력 가능하도록 제한
            const IDmaxLength = 15;
            const IDtruncatedValue = onlyId.slice(0, IDmaxLength);

            setID(IDtruncatedValue);
        }
        };

    // 별도의 뒤로가기 버튼 클릭시 이동할 페이지 설정
    const handleBackBtnClick = () => {
        navigate("/")
    }

    // 회사명 및 부서명 입력을 위해 클릭시 모달창 open
    const handleopencorporate = () => {
        setcorporatenameselect(true)
    }

    // 회사명 및 부서명 입력을 마치고 확인 버튼 클릭시 실행되는 함수
    const handleclosecorporate = () => {
        // 사용자에게 보여줄 회사명 및 부서명 내용 작성(사용자가 선택한 회사명 및 부서명)
        if (building[corname/10-1] !== undefined && part[partname/10-1] !== undefined) {
            setcorporatname(`${building[corname/10-1]} / ${part[partname/10-1]}`)
            // 모달창 close
        }
        setcorporatenameselect(false)
    }
    // 사용자가 회사명 및 부서명을 입력했는지 여부를 판별할 함수
    const corporatnamecheck = corporatname !== '회사 및 부서명'

    // 회원가입 1단계 완료여부(전부 입력 여부)
    const signupbtnbable = id.trim() !== '' && username.trim() !== '' && password1.trim() !== '' && password2.trim() !== '' && robotnumber.trim() !== '' && isIdChecked === true && isRobotNumberChecked === true && corporatname !== '회사 및 부서명'

    // 회원가입 2단계로 가기 위해 버튼 클릭시 보내주는 함수
    const handleOpenSignupTwo = () => {
        // 회원가입 1단계 완료여부가 true인 경우에만 페이지 이동
        if (signupbtnbable) {
            console.log(username)
            dispatch(setid(id))
            dispatch(setpw(password1))
            dispatch(setname(username))
            dispatch(setcomnum(building[corname/10-1]))
            dispatch(setdepnum(part[partname/10-1]))
            dispatch(setelecnum(robotnumber))
            navigate("/signup/two")
        }
    }

    // 회사명 선택
    const handleopencorname = () => {
        setcornameselect(true)
    }

    // 부서명 선택
    const handleopenpartname = () => {
        setpartnameselect(true)
    }

    // 회사명 모달 종료
    const handleclosecorname = () => {
        http({
            method:'get',
            url:`user/signup/department/${building[corname/10-1]}`,
            data:{
                "company": building[corname/10-1],
                },
        })
        .then((res) => {
            setpart(res.data.department);
            const menuItems = res.data.department.map((department, index) => (
                <MenuItem key={index} value={(index + 1) * 10}>
                  {department}
                </MenuItem>
              ));
              setpartmenuItems(menuItems);
        })
        .catch((err) => {
            console.log(err)
        })
        setcornameselect(false);
    }

    // 부서명 모달 종료
    const handleclosepartname = () => {
        setpartnameselect(false);
    }

    // 회사명 선택여부 판별
    const selectedcor = corname !== ''

    // 부서명 선택여부 판별
    const selectedpart = partname !== ''

    // 모달창 기본 스타일 지정
    const style1 = {
        position: "fixed",
        top: "0",
        left: "0",
        rigiht: "0",
        width: "100%",
        height: "18rem",
        bgcolor: "white",
        borderRadius: "0 0 1rem 1rem",
        boxShadow: 20,
        textAlign: "center",
        overflowY: "auto", // 스크롤바 추가
        outline: "none",
        };
    return(
        <div className={style.signupmain}>
            {/* back버튼 */}
            <div className={style.signupbackbtn}>
                <Box component="span" sx={{ p: 1, border: '1px solid #E8ECF4', display:'flex',justifyItems:'center' }}>
                    <KeyboardArrowLeftIcon onClick={handleBackBtnClick}/>
                </Box>
            </div>
            {/* 회원가입 단계를 나타내는 부분 */}
            <div style={{display:'flex', justifyContent:'center'}}>
            <div className={style.stepper}>
                <Box>
                    <Stepper alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </Box>
            </div>
            </div>
            {/* 회원가입이라는 제목 표시 */}
            <div>
                <h1 className={style.signupmaintext}>회원 가입</h1>
            </div>
            {/* 실제 사용자가 입력하는 부분 */}
            <div className={style.signupbox}>
                <div className={style.allid}>
                    {/* 아이디 입력 */}
                    <div className={style.id}>
                        <TextField id="outlined-id" placeholder="아이디" label="아이디" name="id" value={id} onChange={handleInputChange} className={style.inputbox}/>
                    </div>
                    {/* 아이디 중복체크 버튼 */}
                    {/* 사용자가 중복체크를 미실시했을때 보여줄 버튼 */}
                    {!isIdChecked && (
                        // 아이디 입력여부에 따라 스타일을 다르게 지정
                        <button className={isLoginButtonClickable ? style.idcheckbtn : style.incheckbtn2} onClick={handleOpenCheckID}>
                            <p className={style.signuptext}>중복 체크</p>
                        </button>
                    )}
                    {/* 사용자가 중복체크 버튼을 사용해서 사용가능하다는 결과가 나왔을때 보여줄 버튼 */}
                    {isIdChecked && (
                    <button className={style.incheckbtn2}>
                        <p className={style.signuptext}>사용 가능</p>
                    </button>
                    )}
                </div>
                {/* 닉네임 입력 */}
                <div className={style.username}>
                    <TextField id="outlined-username" placeholder="닉네임" label="닉네임" name="username" value={username} onChange={handleInputChange} className={style.inputbox}/>
                </div>
                {/* 비밀번호 입력 */}
                <div className={style.pw}>
                    <TextField id="outlined-password" type={showPassword ? "text" : "password"} placeholder="비밀번호" label="비밀번호" name="password1" value={password1} onChange={handleInputChange} className={style.inputbox}/>
                    <span className={style.pwshowbutton1}>
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {/* 비밀번호 보기 클릭 여부에 따라 보여주는 아이콘 설정 */}
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                {/* 비밀번호 확인 입력창 */}
                <div className={style.pw2} style={{ top: passwordChecking ? '19rem' : '21.3rem' }}>
                    <TextField id="outlined-password2" type={showCheckPassword ? "text" : "password"} placeholder="비밀번호 확인" label="비밀번호 확인" name="password2" value={password2} onChange={handleInputChange} className={style.inputbox}/>
                    <span className={style.pwshowbutton1}>
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowCheckPassword} onMouseDown={handleMouseDownPassword}>
                        {/* 비밀번호확인 보기 클릭 여부에 따라 보여주는 아이콘 설정 */}
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
                {/* 로봇번호 입력창 */}
                <div className={style.allrobotnumber}>
                    <div className={style.robotnumber} style={{ top: passwordChecking ? '24.3rem' : passwordMismatch? '25.3rem':'26.3rem' }}>
                        <TextField id="outlined-robotnumber" placeholder="로봇 번호" label="로봇 번호" name="robotnumber" value={robotnumber} onChange={handleInputChange} className={style.inputbox}/>
                    </div>
                    {/* 사용자가 로봇 시리얼 번호 체크를 미실시 했을때 보여줄 버튼 */}
                    {!isRobotNumberChecked && (
                        // 로봇 시리얼 번호를 입력했을시 버튼 스타일을 변경
                        <button className={isRobotButtonClickable ? style.robotcheckbtn : style.robotcheckbtn2} style={{ top: passwordChecking ? '26.6rem' : passwordMismatch? '25.7rem':'24.2rem' }} onClick={handleOpenCheckRobotId}>
                            <p className={style.signuptext}>확인</p>
                        </button>
                    )}
                    {/* 로봇 시리얼 번호 체크 완료시 보여줄 버튼 */}
                    {isRobotNumberChecked && (
                        <button className={style.robotcheckbtn2} style={{ top: passwordChecking ? '26.4rem' : passwordMismatch? '25.7rem':'24.2rem' }}>
                        <p className={style.signuptext}>완료</p>
                    </button>
                    )}
                </div>
                {/* 회사명 및 부서명 입력창 */}
                <Box className={style.corporatenamebox} style={{ top: passwordChecking ? '16.3rem' : passwordMismatch? '17.7rem':'18.5rem' }} onClick={handleopencorporate}>
                    <p className={corporatnamecheck ? style.corporatename2 : style.corporatename}>{corporatname}</p>
                </Box>
            </div>
            {/* 회원가입 2단계로 넘어가는 버튼, 회원가입 1단계 완료여부에 따라 스타일 별도 지정 */}
            <button className={signupbtnbable ? style.signupbtn : style.signupbtn2} onClick={handleOpenSignupTwo}>
                <p className={style.signuptext}>다 음</p>
            </button>

            {/* 아이디 중복 검사 결과 사용가능할 경우 보여주는 모달 */}
            <ModalComponents
                open={IDModalFalseopen}
                close={handleCloseIDCheckFalse}
                style={style1}
                marginleft='-4.5rem'
                title='아이디 중복검사 결과'
                maintext={`${id}는 사용이 가능합니다.`}
                alerttext='사용하시겠습니까?'
                btntext='확 인'
                />

            {/* 아이디 중복 검사 결과 중복될 경우 보여주는 모달 */}
            <ModalComponents
                open={IDModalTrueopen}
                close={handleCloseIDCheckTrue}
                style={style1}
                marginleft='-0.5rem'
                title='아이디 중복검사 결과'
                maintext={`${id}는 현재 사용중인 상태입니다.`}
                alerttext='다른 아이디를 사용해주시기 바랍니다.'
                btntext='확 인'
                />

            {/* 로봇 시리얼 넘버 확인 결과 사용가능할 경우 보여주는 모달 */}
            <ModalComponents
                open={RobotModalFalseopen}
                close={handleCloseRobotCheckFalse}
                style={style1}
                marginleft='-7rem'
                title='로봇 시리얼 번호 확인 결과'
                maintext='해당 시리얼 번호는 정상 사용가능 합니다.'
                alerttext='사용하시겠습니까?'
                btntext='확 인'
                />

            {/* 로봇 시리얼 넘버 확인 결과 사용할 수 없는 경우 보여주는 모달 */}
            <ModalComponents
                open={RobotModalTrueopen}
                close={handleCloseRobotCheckTrue}
                style={style1}
                marginleft='-3.2rem'
                title='로봇 시리얼 번호 확인 결과'
                maintext='해당 시리얼 번호는 올바르지 않습니다.'
                alerttext='다시 확인해주시기 바랍니다.'
                btntext='확 인'
                />

            {/* 회사 및 부서명 선택 모달창 */}
            <Modal open={corporatenameselect} onClose={handleclosecorporate} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style1}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                <div style={{ flex: "1" }}>
                    <div  style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "75%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Box className={style.cornamebox} onClick={handleopencorname}>
                            {selectedcor && (
                                <p>{building[corname/10-1]}</p>
                            )}
                            {!selectedcor && (
                                <p>회사명</p>
                            )}
                        </Box>
                        <Box className={style.partnamebox} onClick={handleopenpartname}>
                            {selectedpart && (
                                <p>{part[partname/10-1]}</p>
                            )}
                            {!selectedpart && (
                                <p>부서명</p>
                            )}
                        </Box>
                        <button className={style.signupbtn4} onClick={handleclosecorporate}>
                            <p className={style.signuptext}>확 인</p>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                </Box>
            </Modal>
            
            {/* 회사명 선택 모달창 */}
            <ModalSelet 
            open={cornameselect}
            close={handleclosecorname}
            style={style1}
            onclick={handleopencorname}
            id='cornamebox'
            title='회사명'
            value={corname}
            label='회사명'
            onchange={handlebuildingChange}
            item={buildingmenuItems}
            />

            {/* 부서명 선택 모달창 */}
            <ModalSelet 
            open={partnameselect}
            close={handleclosepartname}
            style={style1}
            onclick={handleopenpartname}
            id='partnamebox'
            title='부서명'
            value={partname}
            label='부서명'
            onchange={handlepartChange}
            item={partmenuItems}
            />
        </div>
    )
}

export default SignupPage;