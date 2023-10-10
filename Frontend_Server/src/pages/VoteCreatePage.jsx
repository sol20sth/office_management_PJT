import React, { useState, useEffect } from "react";
import style from "./VoteCreatePage.module.css";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import VoteNormalTimePicker from "../components/vote/VoteNormalTimePicker";
import { formatTime } from "../utils/formatDate";
import { twoSwal } from "../utils/reSwal";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import AddCatagory from "../components/vote/AddCatagory";
import axios from "axios";
import dayjs from "dayjs";
import axiosToken from "../utils/axiostoken";
import { useSelector, useDispatch } from "react-redux";

const RobotBoxComponent = ({
  confirmRobotVote,
  selectedCurrency,
  setSelectedCurrency,
  title,
  setTitle,
}) => {
  const area_num = useSelector((state) => state.UserInfo.area_num);
  const UserInfo = useSelector((state) => state.UserInfo);
  console.log(UserInfo, "유저인포");
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    function getCurrencies() {
      axiosToken()({
        method: "get",
        url: `/vote/elecInfo/${area_num}`,
        // url: `/vote/elecInfo/TESTBOT1`,
      })
        .then((response) => {
          // 성공적인 응답 처리
          console.log("투표 가능한 기기 이름 받아오기 :", response.data);
          setCurrencies(response.data.elec_list);
        })
        .catch((error) => {
          // 오류 처리
          console.error("투표 가능한 기기 이름 받아오기 에러", error);
        });
    }
    getCurrencies();
  }, []);

  const handleChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e);
  };
  return (
    <Box noValidate autoComplete="off">
      <div className={style.box1}>
        <TextField
          id="outlined-제목-flexible"
          label="제목"
          multiline
          maxRows={4}
          className={style.title}
          value={title || "" }
          onChange={(e) => handleChangeTitle(e.target.value)}
        />
      </div>
      <div className={style.box2}>
        <TextField
          id="outlined-select-currency"
          select
          label="유효기기"
          value={selectedCurrency || "null"}
          onChange={handleChange}
          helperText="기기를 선택해주세요"
          className={style.select}
        >
          {currencies.map((option) => {
            const key = Object.keys(option)[0];
            const value = option[key];
            return (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
      <div>
        <p className={style.info}>투표의 유효시간은 10분입니다!</p>
      </div>
      <button className={style.btn} onClick={() => confirmRobotVote()}>
        만들기
      </button>
    </Box>
  );
};

const NormalBoxComponent = ({
  confirmNormalVote,
  title,
  selectedTime,
  catagory,
  setTitle,
  setSelectedTime,
  setCatagory,
}) => {
  const handleTimeChange = (newTime) => {
    const currentDateTime = dayjs(); // 현재 날짜와 시간을 가져옵니다.
    const combinedDateTime = currentDateTime
      .set("hour", newTime.split(":")[0])
      .set("minute", newTime.split(":")[1]);
    setSelectedTime(combinedDateTime.format()); // 선택한 시간을 상태 변수에 설정합니다.
  };

  const handleCatagoryChange = () => {
    const tmp = [...catagory];
    tmp.push([]);
    setCatagory(tmp);
    console.log(catagory);
  };

  const handleCatagoryChangeContext = ({ index, content }) => {
    const tmp = [...catagory];
    tmp[index] = content;
    setCatagory(tmp);
  };
  console.log(selectedTime, "확인용");
  return (
    <>
      <div className={style.normalbox}>
        <div className={style.box1}>
          <TextField
            id="outlined-제목-flexible"
            label="제목"
            multiline
            maxRows={4}
            className={style.title}
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={style.box3}>
          <VoteNormalTimePicker
            selectedTime={selectedTime}
            handleTimeChange={handleTimeChange}
          />
        </div>
        <div className={style.box1}>
          <AddCatagory
            handleCatagoryChange={handleCatagoryChange}
            handleCatagoryChangeContext={handleCatagoryChangeContext}
            catagory={catagory}
          />
        </div>
      </div>
      <button
        className={style.btn}
        onClick={() => {
          confirmNormalVote();
        }}
      >
        만들기
      </button>
    </>
  );
};

export default function VoteCreatePage() {
  const navigate = useNavigate();
  const [voteType, setVoteType] = useState("robot");
  const [title, setTitle] = useState(null);
  const nowTime = new Date();
  const currentDateTime = dayjs();
  const area_num = useSelector((state) => state.UserInfo.area_num);
  const UserInfo = useSelector((state) => state.UserInfo);
  const [selectedCurrency, setSelectedCurrency] = React.useState("");

  // 현재 시간 이후의 5분 단위의 시간 계산
  const next5Minute = currentDateTime.add(
    5 - (currentDateTime.minute() % 5),
    "minute"
  );

  // 초기값으로 현재 시간 이후의 5분 단위의 시간 설정
  const [selectedTime, setSelectedTime] = useState(next5Minute);
  const [catagory, setCatagory] = useState([[]]);

  const changeNormal = () => {
    setVoteType("robot");
  };

  const confirmRobotVote = () => {
    twoSwal("info", "로봇투표를 만드시겠습니까?").then((result) => {
      if (result.isConfirmed) {
        console.log(title, selectedCurrency, area_num);
        axiosToken()({
          method: "post",
          url: `/vote/create`,
          data: {
            title: title,
            elec_num: selectedCurrency,
            area_num: area_num,
            user_id:UserInfo.user_id
          },
        })
          .then((response) => {
            // 성공적인 응답 처리
            console.log("투표 만들기 :", response.data);
            // window.location.reload();
            console.log("확인"); // 확인 버튼 클릭 시 실행할 코드
          })
          .catch((error) => {
            console.error("투표 만들기에러 에러", error);
          });
          navigate("/vote");
          window.location.reload();
      }
    });
  };

  const confirmNormalVote = () => {
    const apiUrl = "YOUR_API_ENDPOINT";

    // Prepare the data to be sent in the request body.
    const data = {
      title,
      selectedTime,
      catagory,
    };

    // Send the POST request using Axios.
    axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle the response if needed
        console.log("Vote created successfully", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the POST request
        console.error("Error creating vote", error);
      });
  };

  const goVotePage = () => {
    navigate("/vote");
  };
  return (
    <div className={style.votepagemaind}>
      <div
        className={style.arrow}
        onClick={() => {
          goVotePage();
        }}
      >
        <ArrowCircleLeftIcon />
      </div>
      <div className={style.voteheadertext}>
        <p
          id="robot"
          onClick={() => changeNormal()}
          className={voteType === "vote" ? style.othertext : ""}
        >
          로봇호출투표
        </p>
        {/* <p
          id="normal"
          onClick={() => changeRobot()}
          className={voteType === "robot" ? style.othertext : ""}
        >
          일반투표
        </p> */}
      </div>
      {voteType === "robot" ? (
        <div className={style.container}>
          <RobotBoxComponent
            confirmRobotVote={confirmRobotVote}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            title={title}
            setTitle={setTitle}
          />
        </div>
      ) : (
        <div className={style.container}>
          <NormalBoxComponent
            confirmNormalVote={confirmNormalVote}
            title={title}
            selectedTime={selectedTime}
            catagory={catagory}
            setTitle={setTitle}
            setSelectedTime={setSelectedTime}
            setCatagory={setCatagory}
          />
        </div>
      )}
    </div>
  );
}
