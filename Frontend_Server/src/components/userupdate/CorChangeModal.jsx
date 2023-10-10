import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import style from "./CorChangeModal.module.css"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ModalSelet from '../signup/ModalSelect'
// useSelector = redux-toolkit store에 저장한 initialState 사용을 위해 호출, useDispath는 redux-toolkit store에 저장한 initialState값을 변경할때 사용
import { useSelector, useDispatch } from "react-redux";
import { setcomnum, setdepnum,setareanum } from "../../redux/user";

const ModalComponents = (props) => {
    const dispatch = useDispatch();
    // 회사 및 부서명
    const storecorpart = useSelector((state) => state.UserInfo.com_num);
    const storedepnum = useSelector((state) => state.UserInfo.dep_num);
    const storerobotnumber = useSelector((state) => state.UserInfo.elec_num);
    const [corporatname, setcorporatname] = React.useState(`${storecorpart} / ${storedepnum}`);
    // 회사 및 부서명 선택 모달창 open여부
    const [corporatenameselect, setcorporatenameselect] = React.useState(false)
    // 회사명
    const [corname, setcorname] = React.useState('');
    // 부서명
    const [partname, setpartname] = React.useState('')
    // 회사명 선택여부
    const [cornameselect, setcornameselect] = React.useState(false);
    // 부서명 선택여부
    const [partnameselect, setpartnameselect] = React.useState(false);
    // 로봇 시리얼 번호
    const [robotnumber, setRobotNumber] = React.useState(storerobotnumber);

    // 회사명 리스트(추후 서버에서 받아와야함)
    const building = ['SSAFY','삼성전자','삼성중공업']

    // 회사명 메뉴 리스트
    const buildingmenuItems = [];
    for (let i = 0; i < building.length; i++) {
        buildingmenuItems.push(
        <MenuItem key={i} value={(i + 1) * 10}>
        {building[i]}
        </MenuItem>
    );
    }

    // 부서명 리스트(추후 서버에서 받아와야함)
    const part = ['C101','C102','C103']

    // 부서명 메뉴 리스트
    const partmenuItems = [];
    for (let i = 0; i < part.length; i++) {
        partmenuItems.push(
        <MenuItem key={i} value={(i + 1) * 10}>
        {part[i]}
        </MenuItem>
    );
    }

    // 회사명 선택시
    const handlebuildingChange = (event) => {
        setcorname(event.target.value);
        };

    // 부서명 선택시
    const handlepartChange = (event) => {
        setpartname(event.target.value)
    }

    // 회사명 및 부서명 입력을 위해 클릭시 모달창 open
    const handleopencorporate = () => {
        setcorporatenameselect(true)
    }

    // 회사명 및 부서명 입력을 마치고 확인 버튼 클릭시 실행되는 함수
    const handleclosecorporate = () => {
        // 사용자에게 보여줄 회사명 및 부서명 내용 작성(사용자가 선택한 회사명 및 부서명)
        dispatch(setcomnum(`${building[corname/10-1]}`))
        // 회사명 및 부서명 store에 저장(추후에는 백에 axios요청 보내야함)
        dispatch(setdepnum(`${part[partname/10-1]}`))
        // 회사명 및 부서명 저장
        setcorporatname(`${building[corname/10-1]} / ${part[partname/10-1]}`)
        // 모달창 close
        setcorporatenameselect(false)
    }
    // 사용자가 회사명 및 부서명을 입력했는지 여부를 판별할 함수
    const corporatnamecheck = corporatname !== ''

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

    // 입력값이 변경될때 호출되는 이벤트
    const handleInputChange = (event) => {
        // 들어오는 props를 name과 value값으로 분리
        const { name, value } = event.target;
        // name이 로봇 시리얼 번호 인경우 
        if (name === 'robotnumber') {
            // 로봇 시리얼 번호는 영어 소,대문자 숫자만 작성가능하게 규칙 설정
            const robotnum = value.replace(/[^a-zA-Z0-9]/g, '')
            // 최대 작성길이 설정
            const robotnumLength = 10
            // 최대 작성길이 안으로만 작성가능하게 설정
            const lastrobtnum = robotnum.slice(0,robotnumLength)
            // 사용자 입력값 저장
            setRobotNumber(lastrobtnum)
        }
        };

    const handlerobotnumbercick = () => {
        if (robotnumber === storerobotnumber) {
            setRobotNumber('')
        }
    }
    return (
        <div>
        <Modal open={props.open} onClose={props.close}>
            <Box sx={props.style}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
            <div style={{ marginTop: "2rem" }}>
                <span className={style.corchecktexthead}>
                {props.title}
                </span>
            </div>
            <div style={{ flex: "1" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "70%" }}>
                    <Box className={style.corporatenamebox} onClick={handleopencorporate}>
                        <p className={corporatnamecheck ? style.corporatename2 : style.corporatename}>{corporatname}</p>
                    </Box>
                    <div className={style.robotnumber}>
                        <TextField id="outlined-robotnumber" placeholder="로봇 번호" label="로봇 번호" name="robotnumber" value={robotnumber} onChange={handleInputChange} className={style.inputbox} onClick={handlerobotnumbercick}/>
                    </div>
                    {/* 회사 및 부서명 선택 모달창 */}
                    <Modal open={corporatenameselect} onClose={handleclosecorporate} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box sx={props.style}>
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
                    style={props.style}
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
                    style={props.style}
                    onclick={handleopenpartname}
                    id='partnamebox'
                    title='부서명'
                    value={partname}
                    label='부서명'
                    onchange={handlepartChange}
                    item={partmenuItems}
                    />
                    <div className={style.btn}>
                        <button className={style.closebtn} onClick={props.close}>
                                <p className={style.signuptext}>{props.btnclosetext}</p>
                        </button>
                        <button className={style.okbtn} onClick={props.ok}>
                                <p className={style.signuptext}>{props.btnoktext}</p>
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </Box>
        </Modal>
        </div>
    )
}

export default ModalComponents;