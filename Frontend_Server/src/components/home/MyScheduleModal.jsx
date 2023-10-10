// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { useSelector, useDispatch } from "react-redux";
// import Backdrop from "@mui/material/Backdrop";
// import { Box, Modal, Button, Input } from "@mui/material";
// import { useSpring, animated } from "@react-spring/web";
// import styled from "./MyScheduleModal.module.css";
// import "react-datepicker/dist/react-datepicker.css";
// import MyDatePicker from "./DatePicker";
// import TimeSelect from "./TimeSelect";
// import { formatDate,formatTime } from "../../utils/formatDate";

// const Fade = React.forwardRef(function Fade(props, ref) {
//   const {
//     children,
//     in: open,
//     onClick,
//     onEnter,
//     onExited,
//     ownerState,
//     ...other
//   } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter(null, true);
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited(null, true);
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {React.cloneElement(children, { onClick })}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element.isRequired,
//   in: PropTypes.bool,
//   onClick: PropTypes.any,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
//   ownerState: PropTypes.any,
// };

// const style = {
//   position: "fixed",
//   top: 0,
//   left: 0, // 왼쪽에 붙이기 위해 left를 0으로 설정
//   right: 0, // 오른쪽 끝까지 확장
//   transform: "translateY(0)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   height: "20rem",
//   p: "2rem",
// };

// export default function MyScheduleModal({ handleOpen, handleClose, open}) {
//   const nowDate = new Date()
//   const nowFormatdate = formatDate(nowDate)
//   const nowFormatTime = formatTime(nowDate)
//   const tmpTrashMyBook = useSelector((state) => state.MyTrash);
//   const AllTrashBook = useSelector((state) => state.TrashList);
//   const TrashMyBook = tmpTrashMyBook ? tmpTrashMyBook : {date : nowFormatdate, time: nowFormatTime}

//   const [selectDate, setSelectDate] = useState(TrashMyBook.date);
//   const [selectTime, setSelectTime] = useState(TrashMyBook.time);
//   const handleSubmit = () => {
//     return;
//   };
//   const handleDateChange = (selectedDate) => {
//     // 선택한 날짜를 처리하는 로직을 추가합니다.
//     const formattedDate = formatDate(selectedDate);
//     setSelectDate(formattedDate);
//   };
//   const handleTimeChange = (newTime) => {
//     // 시간이 변경되면 이 함수가 호출됨
//     setSelectTime(newTime); // selectTime 업데이트
//   };
//   return (
//     <div>
//       {TrashMyBook ? (
//         <a onClick={handleOpen} className={styled.a}>
//           시간변경
//         </a>
//       ) : null}

//       <Modal
//         aria-labelledby="spring-modal-title"
//         aria-describedby="spring-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         // BackdropComponent={Backdrop}
//         // BackdropProps={{
//         //   TransitionComponent: Fade,
//         // }}
//       >
//         <Fade in={open}>
//           <Box sx={style} className={styled.box}>
//             <div className={styled.dust}>
//               <MyDatePicker
//                 selectedDate={selectDate}
//                 onDateChange={(date) => handleDateChange(date)}
//               />
//             </div>
//             <div className={styled.dust}>
//               <TimeSelect
//                 myBook={TrashMyBook}
//                 allBooks={AllTrashBook}
//                 selectedDate={selectDate}
//                 onSelectTimeChange={(time) => {
//                   handleTimeChange(time);
//                 }}
//               />
//             </div>
//             <button className={styled.succesbtn}>쓰레기통 처리 신청</button>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }
