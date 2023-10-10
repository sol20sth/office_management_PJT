import React, { useState, useEffect } from "react";
import style from "./swiper.module.css";
import MapFirst from "./MapFirst";
import MapSecond from "./MapSecond";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs"; // 변경된 import
import { setwebsocket } from "../../redux/websocket";

import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([Navigation, Pagination, Autoplay]);
function SwiperSlideComponent() {
  const Webdata = useSelector((state) => state.Websocketdata);
  const [stompClient, setStompClient] = useState(null);
  const [coordinate, setCoordinate] = useState([20,23]);
  const status1 = Webdata.slice(0,4)
  const status2 = Webdata.slice(4,6)
  useEffect(()=> {
    console.log(Webdata, status1,status2, "아아아아아ㅏ아아아아아아")
  },[Webdata])
  // const [status1, setStatus1] = useState([false,false,false,false]);
  // const [status2, setStatus2] = useState([false,false]);
  const xn = ((coordinate[0] - 15.0848) / 19.865) * 100;
  const yn1 = ((coordinate[1] - 23.8895) / 11.14) * 100;
  const yn2 = ((coordinate[1] - 12.0787) / 11.81) * 100;
  const dispatch = useDispatch();
  useEffect(() => {
    // WebSocket 서버에 연결
    console.log("웹소켓연결중");
    // const socket = new SockJS(" https://58a6-61-82-123-19.ngrok-free.app/ws");
    const socket = new SockJS("https://j9c103.p.ssafy.io:8080/ws");
    const stompClient = new Client(); // 변경된 방식으로 생성
    stompClient.webSocketFactory = () => {
      return socket;
    };
    stompClient.activate();
    stompClient.onConnect = () => {
      console.log("연결완료");
      // STOMP 구독 설정 (실제로 사용할 주제에 맞게 수정)
      // subscribe 주소 = /sub/location/{robot_serial}
      stompClient.subscribe("/sub/location/TESTBOT1", (message) => {
        // 메시지를 받았을 때 처리할 로직을 여기에 작성
        console.log("메시지", message);
        const receivedData = JSON.parse(message.body);
        console.log("받은데이터:", receivedData);
        // type 종류 coord , elec
        if(receivedData.type ==="coord") {
          console.log('좌표메세지')
          setCoordinate([receivedData.coord1, receivedData.coord2])
        } else if (receivedData.type ==="elec") {
          // setStatus1(receivedData.status.slice(0,4))
          // setStatus2(receivedData.status.slice(4,6))
          dispatch(setwebsocket(receivedData.status))
          console.log('기기상태 메세지')
        }
      });

      setStompClient(stompClient);
    };
    // 에러 핸들링
    stompClient.onStompError = (frame) => {
      console.error("소켓 연결 에러 발생:", frame);
      // 에러 처리 로직을 여기에 추가하세요
    };
    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
        console.log("연결종료");
      }
    };
  }, []);

  console.log(xn)
  console.log(yn1)

  return (
    <>
      <Swiper
        className={style.swiper}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
      >
        {coordinate[1] < 23.8885  ? (
          <>
            <SwiperSlide>
              <MapFirst status={status1} />
            </SwiperSlide>
            <SwiperSlide>
              <MapSecond xn={xn} yn={yn2} status={status2} />
            </SwiperSlide>
          </>
        ) : (
          <>
            <SwiperSlide>
              <MapFirst xn={xn} yn={yn1} status={status1}/>
            </SwiperSlide>
            <SwiperSlide>
              <MapSecond status={status2}/>
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </>
  );
}

export default SwiperSlideComponent;

// x축 너비 위 - 아래  : xlen   19.865
// y축 너비 오 - 왼  : ylen   22.3195
// 조건문 (맵 두개로 나눠야하니까 )
// y > 21.9955 회의실 slide 2  y < 23.8885 사무실 slide 1
// 하나하의좌 표 (xn, yn)

// x위치 ((xn-15.0848)//19.865) * 100
// y좌표 ((yn-12.5736)//22.3195) * 100  퍼센트로 좌표 설정 transform

// 조건문  15.0848 <= xn <= 34.9498  넘어가면 맵 넘어감
// 조건문 12.5736 <= yn <= 34.8931

// 기기 좌표 그리드
// 1
// (39.0984,6.8339 )
// 2
// (90.333, 5.445)


