import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { InputLabel, Input } from "@mui/material";
import styled from "./DatePicker.module.css";
import "./DatePicker2.css";
import { parseISO, isBefore, startOfToday } from "date-fns";

export default function MyDatePicker({ selectedDate, onDateChange, TF }) {
  const [startDate, setStartDate] = useState(
    selectedDate ? parseISO(selectedDate) : new Date()
  );
  const [month, setMonth] = useState(startDate.getMonth());

  const handleMonthChange = (date) => {
    setMonth(date.getMonth());
  };

  useEffect(() => {
    setStartDate(selectedDate ? parseISO(selectedDate) : new Date());
  }, [selectedDate]);

  const minSelectableDate = startOfToday();

  const dayClassName = (d) => {
    const isSameDay = d.getDate() === startDate.getDate();
    const isSameMonth = d.getMonth() === startDate.getMonth();
    const isPastDate = isBefore(d, minSelectableDate);

    if (isPastDate) {
      return "custom-day gray-day"; // 이전 날짜 스타일 적용
    } else if (isSameDay && isSameMonth) {
      return "selected custom-day";
    } else if (isSameMonth) {
      return "custom-day";
    } else {
      return "custom-day";
    }
  };
  const isReadOnly = TF === "false"; // "true" 문자열을 true 불리언으로 변환
  return (
    <>
      <InputLabel htmlFor="datepicker" className={styled.label}>
        <span>* </span>날짜선택
      </InputLabel>
      <DatePicker
        id="datepicker"
        className={styled.datepicker}
        popperClassName={`${styled.datepickerPopper}`}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(selectDate) => { // 클릭시 선택 날짜 변경
          setStartDate(selectDate);
          onDateChange(selectDate);
        }}
        customInput={<Input />} // input을 기본으로 변경
        onMonthChange={handleMonthChange} // 월 변화 확인
        minDate={minSelectableDate} // 최소 날짜 설정
        dayClassName={dayClassName}
        readOnly={isReadOnly} // TF 값에 따라 readOnly 속성 설정
      />
    </>
  );
}
