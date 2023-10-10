import React, { useState, useEffect } from 'react'
// css파일 호출(module.css형식으로 파일을 만들어서 호출하면 해당 지역변수느낌으로만 적용가능)
import style from './SignupTwoPage.module.css'
// mui icon호출
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import http from '../utils/axios'
import { useSelector } from 'react-redux';

// 회원가입 페이지를 두개로 나눠서 구성하기 위해 mui의 Step을 사용하는데 이를 위해 필요한 steps 정의함
const steps = [
    '기본 정보',
    '자리 선택',
  ];

function SignupTwoPage() {
    const navigate = useNavigate();
    const user_id = useSelector((state) => state.UserInfo.user_id)
    const user_name = useSelector((state) => state.UserInfo.user_name)
    const password = useSelector((state) => state.UserInfo.user_pw)
    const robot_serial = useSelector((state) => state.UserInfo.elec_num)
    const company =  useSelector((state) => state.UserInfo.com_num)
    const department = useSelector((state) => state.UserInfo.dep_num)

    // 자체 지정 back버튼 클릭시 페이지 이동
    const handleBackBtnClick = () => {
        navigate("/signup")
    }

    // 사용자가 선택한 상자
    const [selectbox, setselectbox] = React.useState('');


    // 모달창 관련 변수
    const [selectboxmodal, setselectboxmodal] = React.useState(false);

    // 모달창 오픈
    const handleopenmodal = () => {
        setselectboxmodal(true)
    }

    // 모달창 오프
    const handlecloseboxmodal = () => {
        setselectboxmodal(false)
    }

    // 모달창 확인 버튼 클릭
    const handleokclick = () => {
        setselectbox(selectbox)
        setselectboxmodal(false)
    }

    // 모달창 취소 버튼 클릭
    const handlecloseclick = () => {
        setselectbox('')
        setselectboxmodal(false)
    }
    const [selectedboxlist,setselectedboxlist] = useState([]);

    const corpartname = `${company}_${department}`
    useEffect(() => {
        http({
            method:'get',
            url:`user/signup/seat/${corpartname}`,
        })
        .then((res) => {
            setselectedboxlist(res.data.already_seat);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    

    // 각 자리를 나타낼 박스들을 담아 놓은 변수
    const boxes = [];
    // 전체 자리수
    const totalBoxes = 9;

    // for문을 통해 각각의 자리에 대한 값 지정하여 코드 작성
    for (let i = 1; i <= totalBoxes; i++) {
    // 현재 만드는 자리box가 이미 선택된 자리 인지 여부 저장
    const isSelected = selectedboxlist.includes(i);
    // 사용자가 선택한 자리의 경우 별도의 스타일을 지정하기 위해 확인
    const isselectbox = selectbox === i
    // 미선택자리, 이미 선택된 자리, 사용자가 선택한 자리 3가지의 상태에 따라 별도의 스타일 지정
    // 최초 이미 선택된 자리의 경우 스타일 지정
    // 2번째는 이미 선택된 자리가 아닌경우 사용자가 선택한 자리 스타일 적용
    // 앞에 두가지 모두 아닌경우 미선택자리 이기 때문에 스타일 지정
    // 추가로 style[`box${i}`]의 경우 css파일에 저장해놓은 각 box들의 위치 값을 지정하는 것
    const classNames = isSelected ? [style.selectedbox, style[`box${i}`]] : isselectbox ? [style.selectbox, style[`box${i}`] ] : [style.notselectbox, style[`box${i}`]];

    // isSelected 변수를 기반으로 기존에 선택된 상자와 비선택 상자에 스타일 적용
        boxes.push(
        <Box key={i} className={classNames} onClick={() => handleBoxClick(i)} />
        );
    }

  // 클릭이벤트
  const handleBoxClick = (boxIndex) => {
    // isSelected 변수를 기반으로 선택된 상자와 비선택 상자에 스타일 적용
    const isSelected = selectedboxlist.includes(boxIndex);
    if (!isSelected) {
      // isSelected가 false인 경우에만 클릭 이벤트 추가
      handleopenmodal(true)
      setselectbox(boxIndex)
    }
  };

  // modal창 크기,위치등을 지정
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

  // 회원가입 완료 버튼 클릭 가능여부 판단
  const signupbtnbable = selectbox !== ''

  // 회원결과창으로 이동
  const handleOpenSignupResult = () => {
    if (signupbtnbable) {
        // user_id, user_name, password, robot_serial, company, department, selectbox
        console.log(user_name)
        http({
            method:'post',
            url:'user/signup',
            data: {
                'user_id': user_id,
				'user_name' : user_name, 
				'password': password,
				'robot_serial' : robot_serial,
				'company': company,
				'department': department,
				'seat_num': selectbox,
            }
        })
        .then((res) => {
            if (res.data.message === "success") {
                navigate('/signup/resultpage')
            } else {
                alert('회원가입이 제한됨.')
            }
        })
        .catch((err) => {
            console.log(err)
        })

    } else {
        alert('자리를 선택해주세요.')
    }
  }

  return (
    <div className={style.signupmain}>
        {/* bakc버튼 */}
        <div className={style.signupbackbtn}>
            <Box component="span" sx={{ p: 1, border: '1px solid #E8ECF4', display:'flex',justifyItems:'center' }}>
                <KeyboardArrowLeftIcon onClick={handleBackBtnClick}/>
            </Box>
        </div>
        {/* 회원가입 단계 및 진행률 표시 */}
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className={style.stepper}>
                <Box>
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </Box>
            </div>
        </div>
        {/* 회원가입 두번째 페이지 소개 */}
        <div>
            <h1 className={style.signupmaintext} style={{fontFamily:'puradak'}}>자리 선택</h1>
        </div>
        {/* 자리들이 나오는 전체 box(회색배경) 설정 */}
        <Box className={style.boxstyle}>
            <div>
                {/* 문 표시 */}
                <Box className={style.doorbox}/>
                {/* 위에서 설정한 box들을 불러오기 */}
                {boxes}
                {/* 사용자 설명을 위한 선택불가 box(파란색) */}
                <Box className={style.explbox1}></Box>
                <p className={style.expltext1}>선택불가</p>
                {/* 사용자 설명을 위한 선택 box(빨간색) */}
                <Box className={style.explbox2}></Box>
                <p className={style.expltext2}>선택</p>
            </div>
        </Box>
        {/* box를 클릭해서 자리를 선택시 보여줄 모달창 */}
        <Modal open={selectboxmodal} onClose={handlecloseboxmodal}>
            <Box sx={style1}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                <div style={{ marginTop: "2rem" }}>
                    <span className={style.idchecktexthead}>
                    자리 선택 결과
                    </span>
                </div>
                <div style={{ flex: "1" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%" }} className={style.idchecktext}>
                        {/* selectbox변수 값을 가지고 와서 사용자가 선택한 자리가 몇번 자리인지 표시 하고 이를 최종 확인 받음 */}
                        <Typography sx={{ marginTop: "0.4rem", fontSize: "0.7rem", marginLeft:'-1rem' }}>{selectbox}번 자리를 선택하셨습니다.해당자리가 본인의 자리가</Typography>
                        <Typography sx={{ marginTop: "0.4rem",marginLeft:'-4rem', fontSize: "0.7rem" }}>맞으시면 확인 버튼을 눌러주시기 바랍니다.</Typography>
                        {/* 확인버튼 클릭시 사용자가 선택한 box에 스타일 적용 */}
                        <button className={style.okbtn} onClick={handleokclick}>
                                <p className={style.oktext}>확 인</p>
                        </button>
                        {/* 취소 버튼 클릭시 사용자가 선택한 box에 적용된 선택box 스타일 제거 */}
                        <button className={style.closebtn} onClick={handlecloseclick}>
                                <p className={style.oktext}>취 소</p>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </Box>
        </Modal>
        {/* 회원가입 완료 버튼으로 회원가입 완료를 위한 자리 선택완료시 스타일 변경 */}
        <button className={signupbtnbable ? style.signupbtn : style.signupbtn2} onClick={handleOpenSignupResult}>
            <p className={style.signuptext}>완 료</p>
        </button>
    </div>
  )
}

export default SignupTwoPage;