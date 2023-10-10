import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./MapFirst.module.css";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import { TbAirConditioningDisabled, TbAirConditioning } from "react-icons/tb";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";

function MapFirst({ xn, yn, status }) {
  const Webdata = useSelector((state) => state.Websocketdata);
  const myseat_num = useSelector((state) => state.UserInfo.seat_num);
  const robot = {
    position: "absolute",
    top: `${yn-6}%`,
    right: `${xn-3}%`,
  };
  const robotSize = "27px";

  // 각 자리를 나타낼 박스들을 담아 놓은 변수
  const boxes = [];
  // 전체 자리수
  const totalBoxes = 9;

  // for문을 통해 각각의 자리에 대한 값 지정하여 코드 작성
  for (let i = 1; i <= totalBoxes; i++) {
    const isselectbox = myseat_num === i;
    // 사용자 자리에 별도의 스타일 지정
    // 추가로 style[`box${i}`]의 경우 css파일에 저장해놓은 각 box들의 위치 값을 지정하는 것
    const classNames = isselectbox
      ? [style.selectbox, style[`box${i}`]]
      : [style.notselectbox, style[`box${i}`]];

    // isSelected 변수를 기반으로 기존에 선택된 상자와 비선택 상자에 스타일 적용
    boxes.push(<Box key={i} className={classNames} />);
  }

  const airpurifier = [];
  const aircon = [];
  // 기기별 작동상태
  const ison =status; // 에어컨1, 공기청정기1, 공기청정기2, 에어컨2;
  console.log(ison)
  for (let i = 0; i < ison.length; i++) {
    if (i === 1 || i===2) {
      const airpurifierStyleClass = i === 1 ? style.airpurifier1 : style.airpurifier2;
      const icons = ison[i] ? (
        <Icon key={i} icon="mdi:air-purifier" className={airpurifierStyleClass} />
      ) : (
        <Icon
          key={i}
          icon="mdi:air-purifier-off"
          className={airpurifierStyleClass}
        />
      );

      airpurifier.push(icons);
    } else {
      const airconStyleClass = i === 0 ? style.aircon1 : style.aircon2;
      const icons = ison[i] ? (
        <TbAirConditioning key={i} className={airconStyleClass} />
        ) : (
          <TbAirConditioningDisabled key={i} className={airconStyleClass} />
          );
  
      aircon.push(icons);
    }
  }

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "85.5%",
    backgroundColor:'white',
    borderRadius:'1rem'
  };

  return (
    <div style={containerStyle}>
      {/* MapFirst 컴포넌트의 내용(사무실 페이지) */}
      {/* 문 표시 */}
      <Box className={style.doorbox} />
      {/* 위에서 설정한 box들을 불러오기 */}
      {boxes}
      {/* 사용자 설명을 위한 선택 box(빨간색) */}
      <Box className={style.explbox2}></Box>
      <p className={style.expltext2}>내 자리</p>
      {airpurifier}
      {aircon}
      {yn===undefined ? (
      <div style={robot}>
      </div>
      ) : (
      <div style={robot}>
        <SmartToyTwoToneIcon style={{ fontSize: robotSize }} />
      </div>
      )}
    </div>
  );
}

export default MapFirst;
