import React, { useState, useRef } from "react";
import { Grid } from "@mui/material";
import styled from "./TimeSet.module.css";
import { oneSwal, twoSwal } from "../../utils/reSwal";


const TimeSet = React.forwardRef(
  ({ handleClose, AllTrashBook, selectedDate }, ref) => {
    const time = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
    ];

    const currentTime = new Date();
    const day = String(currentTime.getDate()).padStart(2, "0");
    const month = String(currentTime.getMonth() + 1).padStart(2, "0");
    const year = currentTime.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    const ConfirmTime = (time, btnClassName) => {
      if (btnClassName === "TimeSet_btn__8zHGW TimeSet_past__EBRhC") {
        oneSwal("warning", "전 타임은 예약할 수 없습니다.");
      } else if (
        btnClassName === "TimeSet_btn__8zHGW TimeSet_selected__VeLCx"
      ) {
        oneSwal("warning", "예약이 차있는 시간입니다.");
      } else {
        handleClose(time);
      }
    };

    const timeElements = time.map((item, index) => {
      const isTimeSelected = AllTrashBook.some((officeItem) => {
        return officeItem.time === item && officeItem.date === selectedDate;
      });

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
            onClick={() => ConfirmTime(item, btnClassName)}
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

    return (
    <div className={styled.container}>

      {groupedTimeElements}
      </div>);
  }
);

export default TimeSet;
