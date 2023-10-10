import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import styled from "./TimeSet.module.css";
import { oneSwal } from "../../utils/reSwal";
import axiosToken from "../../utils/axiostoken";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
const TimeSet = React.forwardRef(
  ({ handleClose, selectedDate, selectOffice }, ref) => {
    // const token = useSelector((state) => state.UserInfo.accessToken);
    const OfficeNameList2 = useSelector((state) => state.OfficeNameList2);
    console.log(selectOffice, "확인해보자");
    const [time, setTime] = useState([
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ]);
    console.log(selectedDate, "날짜확인")
    const [fullTime, setFullTime] = useState([]);

    const currentTime = new Date();
    const day = String(currentTime.getDate()).padStart(2, "0");
    const month = String(currentTime.getMonth() + 1).padStart(2, "0");
    const year = currentTime.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    const ConfirmTime = (time, btnClassName) => {
      if (btnClassName === "TimeSet_btn__yLKlo TimeSet_past__wi3TV") {
        oneSwal("warning", "전 타임은 예약할 수 없습니다.");
      } else if (
        btnClassName === "TimeSet_btn__yLKlo TimeSet_selected__mcIBt"
      ) {
        oneSwal("warning", "예약이 차있는 시간입니다.");
      } else {
        handleClose(time);
      }
    };

    const timeElements = time.map((item, index) => {
      // fullTime에 있는 요소 중에서 index가 포함되어 있는지 확인
      const isTimeSelected = fullTime.includes(index);

      const [currentHour, currentMinute] = [
        currentTime.getHours(),
        currentTime.getMinutes(),
      ];
      const [itemHour, itemMinute] = item.split(":").map(Number);

      const isTimePast =
        selectedDate === formattedDate &&
        (currentHour > itemHour ||
          (currentHour === itemHour && currentMinute >= itemMinute));

      const btnClassName = isTimePast
        ? `${styled.btn} ${styled.past}`
        : isTimeSelected
        ? `${styled.btn} ${styled.selected}`
        : styled.btn;

      return (
        <Grid key={index} item xs={3} className={styled.each}>
          <button
            className={btnClassName}
            onClick={() => {
              ConfirmTime(item, btnClassName);
            }}
          >
            {item}
          </button>
        </Grid>
      );
    });

    const groupedTimeElements = [];
    for (let i = 0; i < timeElements.length; i += 4) {
      const group = timeElements.slice(i, i + 4);
      groupedTimeElements.push(
        <Grid container key={i} spacing={2} className={styled.box}>
          {group}
        </Grid>
      );
    }

    const selectedRoomValue = OfficeNameList2.roomNames.find((item) =>
      Object.keys(item).includes(selectOffice[0])
    );

    // 찾은 값이 있으면 해당 값을 가져오고, 없으면 null 반환
    const result = selectedRoomValue ? selectedRoomValue[selectOffice] : null;

    useEffect(() => {
      async function GetTimeList() {
        try {
          const response = await axiosToken().get(
            // `/meeting/time/${selectedDate}_${result}`
            `/meeting/time/${selectedDate}_${result}`
          );
          console.log(selectOffice);
          console.log(`/meeting/time/${selectedDate}_${result}`);
          setFullTime(response.data.times);
        } catch (error) {
          console.log(selectOffice);
          console.log(`/meeting/time/${selectedDate}_${result}`);
          console.error("회의실 예약 시간리스트 받아오기 실패", error);
        }
      }
      GetTimeList();
    }, [selectedDate, result]);

    return (
      <div className={styled.container}>
        <div className={styled.row}>
          <Box className={styled.box1}></Box>
          <p className={styled.p}>이전시간</p>
          <Box className={styled.box2}></Box>
          <p className={styled.p}>선택가능</p>
          <Box className={styled.box3}></Box>
          <p className={styled.p}>선택불가</p>
        </div>
        {groupedTimeElements}
      </div>
    );
  }
);

export default TimeSet;
