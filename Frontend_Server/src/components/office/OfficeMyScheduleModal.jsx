import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import styled from "../home/MyScheduleModal.module.css";
import styled2 from "./OfficeMySchedule.module.css";
import "react-datepicker/dist/react-datepicker.css";
import MyDatePicker from "../home/DatePicker";
import { formatDate, formatTime } from "../../utils/formatDate";
import TimeSelect from "../home/TimeSelect";
import OfficeNum from "./OfficeNum";
import { setOfficeNameList } from "../../redux/office";
import axiosToken from "../../utils/axiostoken";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "fixed",
  top: 0,
  left: 0, // 왼쪽에 붙이기 위해 left를 0으로 설정
  right: 0, // 오른쪽 끝까지 확장
  transform: "translateY(0)",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "20rem",
  p: "2rem",
};

export default function OfficeMyScheduleModal({
  handleOpen,
  handleClose,
  open,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nowDate = new Date();
  const nowFormatdate = formatDate(nowDate);
  const nowFormatTime = formatTime(nowDate);

  const user_id = useSelector((state) => state.UserInfo.user_id);
  const tmpofficeMyBook = useSelector((state) => state.MyOffice);
  const AllOfficeBook = useSelector((state) => state.OfficeList);
  const officeMyBook = tmpofficeMyBook
    ? tmpofficeMyBook
    : { date: nowFormatdate, time: nowFormatTime };

  const [selectDate, setSelectDate] = useState(
    ""
  );
  const [selectTime, setSelectTime] = useState(
    tmpofficeMyBook ? tmpofficeMyBook.time : "선택"
  );

  const [selectOffice, setSelectOffice] = useState(officeMyBook?.office);

  // const token = useSelector((state) => state.UserInfo.accessToken);
  const OfficeName = useSelector((state) => state.OfficeNameList); // 회의실 이름 리스트

  const OfficeNameList = useSelector((state) => state.OfficeNameList);
  const OfficeNameList2 = useSelector((state) => state.OfficeNameList2);
  
  const [openChange, setOpenChange] = useState(false);
  const MyOffice = useSelector((state) => state.MyOffice);
  const resNum = MyOffice?.resNum;
  const roomNum = MyOffice?.officenum;
  const dateChange = MyOffice?.date;
  const resStart = MyOffice?.resStart;
  function handleCloseChange() {
    setOpenChange(false);
  }
  function handleOpenChange() {
    setOpenChange(true);
  }
  function findKeyByValue(targetValue) {
    const keys = OfficeNameList2.roomNames
    .filter((room) => Object.values(room).includes(targetValue))
    .map((room) => Object.keys(room)[0]);
    
    return keys.length > 0 ? keys : null;
  }
  
  console.log( OfficeNameList2.roomNames, selectOffice)

  function findValueByKey(key) {
    const room = OfficeNameList2.roomNames.find((item) => Object.keys(item)[0] === key);
    return room ? Object.values(room)[0] : null;
  }
  // 찾은 값이 있으면 해당 값을 가져오고, 없으면 null 반환
  const roomNumber = selectOffice? findValueByKey(selectOffice[0]) : null;
  // const result = selectOffice ? findKeyByValue(selectOffice) : null;

  const handleDateChange = (selectedDate) => {
    // 선택한 날짜를 처리하는 로직을 추가합니다.
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0' if needed
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setSelectDate(formattedDate);
  };

  const handleTimeChange = (newTime) => {
    // 시간이 변경되면 이 함수가 호출됨
    // console.log(newTime, "시간 선택");
    setSelectTime(newTime); // selectTime 업데이트
  };
  const handleOfficeChange = (newOffice) => {
    // 시간이 변경되면 이 함수가 호출됨
    // console.log(newOffice, "사무실 선택");
    setSelectOffice([newOffice]); // selectTime 업데이트
  };

  useEffect(() => {
    async function GetOfficeNameList() {
      try {
        const response = await axiosToken().get("meeting/roomInfo/");
        // console.log("전체 회의실이름:", response.data);
        dispatch(setOfficeNameList(response.data));
      } catch (error) {
        console.error("전체 회의실이름 실패", error);
      }
    }
    GetOfficeNameList();
  }, []);

  function handleNewOffice() {
    // console.log(selectDate, selectTime, selectOffice, "최종 확인 ");
    console.log(`${selectDate} ${selectTime}:00`, user_id, roomNumber);
    const data = {
      user_id: user_id,
      room_num: roomNumber,
      date: `${selectDate} ${selectTime}:00`,
    };
    // const data2 = {
    //   "res_id": Integer,
    // 	"time": String {"HH:mm:ss"} ex) "09:00:00"
    // }
    if (!selectOffice) {
      alert("회의실을 선택해주세요!!");
      return;
    } else if (selectTime === "선택") {
      alert("시간을 선택해 주세요!!");
      return;
    } 

    async function postCreateOfficeBook() {
      try {
        const response = await axiosToken().post(`/meeting/res`, data); // 데이터를 포함하여 POST 요청 보내기
        // console.log("나의 회의실 예약 확인", response.data);
        window.location.reload()
      } catch (error) {
        console.error("나의 회의실 예약 실패", error);
      }
    }
    postCreateOfficeBook();
  }

  function handleChangeOffice() {
    const data = {
      resNum: resNum,
      time: `${selectTime}:00`,
    };
    console.log(resNum);
    async function putCreateOfficeBook() {
      try {
        const response = await axiosToken().put(
          `/meeting/res/change`,
          data
        ); // 데이터를 포함하여 POST 요청 보내기
        // console.log("회의실 시간변경 확인", response.data);
        // navigate("/building");
        window.location.reload();
      } catch (error) {
        console.error("회의실 시간변경 실패", error);
      }
    }
    putCreateOfficeBook();
  }
  // console.log(tmpofficeMyBook, "tmpofficeMyBooktmpofficeMyBook")
  return (
    <div>
      {tmpofficeMyBook ? (
        <>
          <a onClick={() => handleOpenChange()} className={styled.a}>
            시간변경
          </a>
        </>
      ) : null}

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          TransitionComponent: Fade,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={styled.box}>
            <div className={styled.dust}>
              <MyDatePicker
                selectedDate={selectDate? selectDate: null}
                onDateChange={(date) => handleDateChange(date)}
                TF="true"
              />
            </div>
            <div
              className={`css-q0jhri-MuiInputBase-root-MuiInput-root ${styled2.center} ${styled.dust}`}
            >
              <OfficeNum
                OfficeName={OfficeName}
                selectOffice={selectOffice}
                onSelectOfficeChange={(office) => {
                  handleOfficeChange(office);
                }}
                TF="true"
              />
            </div>

            <div className={styled.dust}>
              <TimeSelect
                myBook={officeMyBook}
                allBooks={AllOfficeBook}
                selectOffice={selectOffice}
                selectedDate={selectDate}
                onSelectTimeChange={(time) => {
                  handleTimeChange(time);
                }}
              />
            </div>
            <button
              className={styled.succesbtn}
              onClick={() => handleNewOffice()}
            >
              회의실 신청
            </button>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openChange}
        onClose={handleCloseChange}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          TransitionComponent: Fade,
        }}
      >
        <Fade in={openChange}>
          <Box sx={style} className={styled.box}>
            <div className={styled.dust}>
              <MyDatePicker
                selectedDate={dateChange}
                value={dateChange}
                TF="false"
              />
              {/* <input value={dateChange} readOnly /> */}
            </div>

            <div
              className={`css-q0jhri-MuiInputBase-root-MuiInput-root ${styled2.center} ${styled.dust}`}
            >
              <OfficeNum
                OfficeName={OfficeName}
                selectOffice={findKeyByValue(roomNum)}
                TF="false"
              />
              {/* <input value={keysForNumbers[0]} readOnly/> */}
            </div>

            <div className={styled.dust}>
              <TimeSelect
                myBook={officeMyBook}
                allBooks={AllOfficeBook}
                selectOffice={findKeyByValue(roomNum)}
                selectedDate={dateChange}
                onSelectTimeChange={(time) => {
                  handleTimeChange(time);
                }}
              />
            </div>
            <button
              className={styled.succesbtn}
              onClick={() => handleChangeOffice()}
            >
              시간변경
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
