import React, { useState ,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { InputLabel, Input } from "@mui/material";
import styled from "../home/DatePicker.module.css"
import '../home/DatePicker2.css'
import { parseISO } from "date-fns";

export default function OfficeMyDatePicker({officeMyBook}) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState(new Date());
  const date = parseISO(officeMyBook.date)
  

  const handleMonthChange = (date) => {
    setMonth(date.getMonth());
  };
  useEffect(() => {
    // officeMyBook.date이 변경될 때마다 startDate 업데이트
    setStartDate(date || new Date());
  }, []);
  return (
    <>
      <InputLabel htmlFor="datepicker" className={styled.label}><span>* </span>날짜선택</InputLabel>
      <DatePicker
        id="datepicker"
        className={styled.datepicker}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(selectDate) => setStartDate(selectDate)}
        customInput={<Input />}
        onMonthChange={handleMonthChange}
        dayClassName={(d) =>
          d.getDate() === startDate.getDate()
            ? "custom-day selected-day"
            : d.getMonth() === month
            ? "custom-day"
            : "custom-day gray-day"
        }
      />
    </>
  );
}
