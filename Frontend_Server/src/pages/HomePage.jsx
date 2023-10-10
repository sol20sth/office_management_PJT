import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setqueuenum } from "../redux/user";
import { Container } from "@mui/material";
import style from "./HomePage.module.css";
import http from "../utils/axios";
import axiosToken from "../utils/axiostoken";
import SwiperSlideComponent from "../components/socket/SwiperSlideComponent";

function Home() {
  const dispatch = useDispatch();
  const area_num = useSelector((state) => state.UserInfo.area_num);
  const seat_num = useSelector((state) => state.UserInfo.seat_num);
  const queue_num = useSelector((state) => state.UserInfo.queue_num);
  const user_id = useSelector((state) => state.UserInfo.user_id);
  const createTrashBook = () => {
    // 휴지통 비우기 신청 함수
    axiosToken()({
      method: "post",
      url: "/trash/res",
      data: {
        area_num: area_num,
        seat_num: seat_num,
        user_id: user_id
      },
    })
      .then((response) => {
        // 성공적인 응답 처리
        console.log("휴지통 비우기 신청 성공:", response.data);
        dispatch(setqueuenum(response.data.queue_num));
        window.location.reload();
      })
      .catch((error) => {
        // 오류 처리
        console.error("휴지통 비우기 신청 오류:", error);
        console.log(area_num,seat_num,user_id)
      });
  };

  useEffect(() => {
    function getQueuenum() {
      axiosToken()({
        method: "get",
        url: `/trash/${user_id}`,
      })
        .then((response) => {
          // 성공적인 응답 처리
          console.log("대기 순위 번호:", response.data);
          dispatch(setqueuenum(response.data.queue_num));
        })
        .catch((error) => {
          // 오류 처리
          console.error("대기 순위 번호 받오오기 에러", error);
        });
    }
    getQueuenum();
  }, []);

  return (
    <div className="total-content-container">
      <Container className={style.container}>
        <div className={style.map}>
          <SwiperSlideComponent />
        </div>

        <div className={style.fourty}>
          <div className={style.textdeco}>
            <p className={style.title}>나의 신청현황</p>
          </div>
          <div className={style.my}>
            {queue_num === -1 ? (
              <p>미신청</p>
            ) : queue_num === 0 ? (
              <p>처리중입니다</p>
            ) : queue_num === 1 ? (
              <p>곧 도착합니다</p>
            ): (
              <p>{queue_num}번 째 순서입니다.</p>
            )}
          </div>
        </div>
        <div className={style.conbtn}>
          {queue_num===-1 ? (
            <button
              className={style.btn}
              onClick={() => {
                createTrashBook();
              }}
            >
              휴지통 비우기 신청
            </button>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default Home;