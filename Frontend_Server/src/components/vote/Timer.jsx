import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "./timer.module.css";

const Timer = ({ props, endPoint, updateEndpoint, idx }) => {
  const endTime = props;
  const calculateRemainingTime = (endTime) => {
    const now = moment();
    const end = moment(endTime, "HH:mm:ss");
    const duration = moment.duration(end.diff(now));
    // console.log(end);
    return {
      hour: duration.hours(),
      min: duration.minutes(),
      sec: duration.seconds(),
    };
  };

  const [remainingTime, setRemainingTime] = useState(null); // 초기에는 null로 설정

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRemainingTime = calculateRemainingTime(endTime);
      setRemainingTime(updatedRemainingTime);

      if (
        updatedRemainingTime.hour <= 0 &&
        updatedRemainingTime.min <= 0 &&
        updatedRemainingTime.sec <= 0
      ) {
        updateEndpoint(idx);
        clearInterval(interval);
      }
    }, 1000);

    // 컴포넌트가 언마운트될 때 interval을 정리합니다.
    return () => clearInterval(interval);
  }, [endPoint, idx, endTime]);

  // remainingTime이 null이면 "계산 중"을, 그렇지 않으면 시간을 표시
  const displayTime = remainingTime === null ? <span className={styled.loading}>계산중</span> : (
    <>
      {endPoint ? (
        <span className={styled.end}>투표 종료</span>
      ) : (
        <span>
          {remainingTime.hour >= 10
            ? remainingTime.hour
            : "0" + remainingTime.hour}{" "}
          :
          {remainingTime.min >= 10
            ? remainingTime.min
            : "0" + remainingTime.min}{" "}
          :
          {remainingTime.sec >= 10
            ? remainingTime.sec
            : "0" + remainingTime.sec}
        </span>
      )}
    </>
  );

  return (
    <span>
      {displayTime}
    </span>
  );
};

export default Timer;
