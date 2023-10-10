import React, { useState, useRef } from "react";
import { InputLabel, Input, Modal, Box } from "@mui/material";
import styled from "./TimeSelect.module.css";
import TimeSet from "./TimeSet";
import OfficeTimeSet from "../office/OfficeTimeSet";
import { useLocation } from "react-router-dom";

function TimeSelect({ myBook, allBooks, onSelectTimeChange, selectedDate,selectOffice }) {
  const [open, setOpen] = useState(false); // 모달 열고 닫는 변수
  const modalRef = useRef(null);
  const [time, setTime] = useState(myBook.time); // 나의 예약 시간
  const location = useLocation();

  const handleOpen = () => {
    // 회의실 선택 후 시간선택이 가능하도록 만들기
    if (!selectOffice) {
      // selectOffice 데이터가 없을 때 alert 창 열기
      alert("회의실을 먼저 선택해 주세요!!");
    } else if (!selectedDate){
      alert("날짜를 먼저 선택해 주세요!")
    } else {
      setOpen(true);
    }
  };

  const handleClose = (prop = null) => {
    if (typeof prop === "string") {
      // 선택완료시 선택 시간 변경
      setTime(prop);
      onSelectTimeChange(prop);
    } else {
      setTime(time);
    }
    setOpen(false);
  };

  return (
    <>
      <div
        className={`css-q0jhri-MuiInputBase-root-MuiInput-root ${styled.center}`}
        onClick={handleOpen}
      >
        <InputLabel htmlFor="selectime" className={styled.label2}>
          <span>* </span>시간선택
        </InputLabel>

        <Input
          id="selectime"
          className={`${styled.input}`} // 텍스트 가운데 정렬 클래스 추가
          label="시간선택"
          value={time.slice(0,5)}
          readOnly // 입력 불가능하도록 설정
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        ref={modalRef}
      >
        <OfficeTimeSet
          handleClose={handleClose}
          AllOfficeBook={allBooks}
          selectedDate={selectedDate}
          selectOffice={selectOffice}
        />
      </Modal>
    </>
  );
}

export default TimeSelect;
