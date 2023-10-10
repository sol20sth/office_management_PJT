import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import style from "./HomePage.module.css";
import TimeSet from "../components/office/OfficeTimeSet";
import axiosToken from "../utils/axiostoken";
import { Modal } from "@mui/material";
import OfficeMyScheduleModal from "../components/office/OfficeMyScheduleModal";
import { formatDate, formatTime } from "../utils/formatDate";
import {
  setMyofficeBook,
  setAllofficeBook,
  setOfficeNameList,
  setOfficeNameList2,
} from "../redux/office";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/core";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLocation } from "react-router-dom";
function BuildPage() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const location = useLocation();
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.UserInfo.accessToken);
  const user_id = useSelector((state) => state.UserInfo.user_id);
  const UserInfo = useSelector((state) => state.UserInfo);
  const officelist = useSelector((state) => state.OfficeNameList);
  const com_num = useSelector((state) => state.UserInfo.com_num);

  // 숫자에 해당하는 key를 저장할 배열을 만듭니다.
  const OfficeNameList2 = useSelector((state) => state.OfficeNameList2);
  const MyOffice = useSelector((state) => state.MyOffice);
  const AllOfficeBook = useSelector((state) => state.OfficeList);
  // console.log(AllOfficeBook, "확인해보자 모든예약")
  function findKeyByValue(targetValue) {
    const keys = OfficeNameList2.roomNames
      .filter((room) => Object.values(room).includes(targetValue))
      .map((room) => Object.keys(room)[0]);
    return keys.length > 0 ? keys : null;
  }

  let nextofficebook = [];

  if (AllOfficeBook?.length > 0) {
    // currentofficebook = AllOfficeBook[0];
    nextofficebook = JSON.parse(JSON.stringify(AllOfficeBook)); // 깊은 복사를 사용하여 할당
  } else {
    // currentofficebook = "미신청";
  }

  const [officenum, setOfficenum] = useState(1); // 회의실 번호

  const increaseOfficenum = () => {
    if (officenum < officelist.length) {
      setOfficenum(officenum + 1);
    }
  };

  const decreaseOfficenum = () => {
    if (officenum - 1 >= 1) {
      setOfficenum(officenum - 1);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const nowDate = new Date();
  const nowFormatdate = formatDate(nowDate);

  const [open, setOpen] = React.useState(false);
  const BookhandleOpen = () => setOpen(true);
  const BookhandleClose = () => setOpen(false);

  const handleClose = (time) => {
    // 모달을 닫기 위해 setIsOpen(false) 호출
    setIsOpen(false);
    // 선택된 시간을 저장
    setSelectedTime(time);
  };

  useEffect(() => {
    async function GetmyOfficeBook() {
      try {
        const response = await axiosToken().get(`meeting/${user_id}`);
        console.log("나의 회의실예약:", response.data);
        const roomResArray = response.data.roomRes;
        const myOfficeBook = roomResArray.map((data) => {
          return {
            date: data.date,
            time: data.resStart,
            officenum: data.roomNum,
            resNum: data.resNum,
            userId: data.userId,
          };
        });

        if (myOfficeBook.length > 0) {
          dispatch(setMyofficeBook(myOfficeBook[0]));
          const restOfItems = myOfficeBook.slice(1);
          dispatch(setAllofficeBook(restOfItems));
        }
      } catch (error) {
        console.error("나의 회의실예약 실패", error);
      }
    }

    async function GetOfficeNameList() {
      try {
        const response = await axiosToken().get(`meeting/roomInfo/${com_num}`);
        // console.log("전체 회의실이름:", response.data.roomNames);
        const tmp = response.data.roomNames.map((item) => Object.keys(item)[0]);
        // console.log(tmp, "템프");
        dispatch(setOfficeNameList(tmp));
        dispatch(setOfficeNameList2(response.data.roomNames));
      } catch (error) {
        console.error("전체 회의실이름 실패", error);
      }
    }
    GetmyOfficeBook();
    GetOfficeNameList();
  }, [com_num]);

  function deleteOffice(resNum) {
    console.log(resNum);
    async function DeleteOffice() {
      try {
        const response = await axiosToken().delete(
          `meeting/res/delete/${resNum}`
        );
        // console.log("삭제:", response.data.roomNames);
        window.location.reload();
      } catch (error) {
        console.error("삭제 실패", error);
      }
    }
    DeleteOffice();
  }

  return (
    <>
      <Container className={style.container}>
        <div className={style.fourty}>
          <div className={style.textdeco}>
            <p className={style.title}>현재 예정된 회의</p>
          </div>
          {MyOffice ? ( // 데이터가 있는 경우
            <div className={style.booking}>
              <p className={style.bookingdate}>{MyOffice.date}</p>
              <div className={style.officeBox}>
                <p className={style.officeName}>
                  {findKeyByValue(MyOffice.officenum)}
                </p>
              </div>
              <p className={style.nowbookinghour}>
                {MyOffice.time.slice(0, 5)}
              </p>
              <div className={style.deletebox}>
                <button
                  className={style.deletebtn}
                  onClick={() => {
                    deleteOffice(MyOffice.resNum);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            // 데이터가 없는 경우
            <div className={style.booking}>
              <p className={style.notbooking}>미신청</p>
            </div>
          )}
          <OfficeMyScheduleModal
            handleOpen={BookhandleOpen}
            handleClose={BookhandleClose}
            open={open}
            className={style.a}
          />
        </div>
        <br />
        <div className={style.fourty2}>
          <div>
            <p className={style.title}>다음 예정된 회의</p>
          </div>
          <div className={style.officeNameChoice}>
            <KeyboardArrowLeftIcon
              className={style.decreasebtn}
              onClick={decreaseOfficenum}
            />
            <p className={style.officename}>{findKeyByValue(officenum)}</p>
            <KeyboardArrowRightIcon
              className={style.increasebtn}
              onClick={increaseOfficenum}
            />
          </div>
          {/* <div className={style.office}>
            <p>내일신청현황예시</p>
          </div> */}
          <Swiper
            className={style.swiper}
            spaceBetween={50}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
          >
            {nextofficebook && nextofficebook.length > 0 ? (
              officelist.map((office, index) => (
                <SwiperSlide key={index}>
                  {nextofficebook.some((data) => data.officenum === index + 1) ? (
                    nextofficebook
                      .filter((checkdata) => checkdata.officenum === index + 1)
                      .map((data, index) => (
                        <div className={style.booking} key={index}>
                          <p className={style.bookingdate}>{data.date}</p>
                          <p className={style.bookinghour}>{data.time.slice(0, 5)}</p>
                          <div className={style.deletebox}>
                            <button
                              className={style.deletebtn}
                              onClick={() => {
                                deleteOffice(data.resNum);
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className={style.booking}>
                      <p className={style.notbooking}>미신청</p>
                    </div>
                  )}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className={style.booking}>
                  <p className={style.notbooking}>미신청</p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </Container>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <TimeSet
          handleClose={handleClose}
          AllOfficeBook={AllOfficeBook}
          selectedDate={nowFormatdate}
        />
      </Modal>
      <button
        className={style.officebtn}
        onClick={() => {
          BookhandleOpen();
        }}
      >
        회의실 신청
      </button>
      <div className={style.conbtn}>
        {/* <a className={style.a} onClick={()=>{AllOffice()}}>현황확인</a> */}
      </div>
    </>
  );
}

export default BuildPage;
