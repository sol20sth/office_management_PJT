import React, { useState, useEffect } from "react";
import style from "./VotePage.module.css";
import { useNavigate } from "react-router";
import { setVoteList } from "../redux/vote";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CompletedVoteComponent from "../components/vote/CompletedVoteComponent";
import BoxComponent from "../components/vote/BoxComponentVote";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./votepage.css";
import axiosToken from "../utils/axiostoken";

function VotePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const area_num = useSelector((state) => state.UserInfo.area_num);
  const UserInfo = useSelector((state) => state.UserInfo);

  const handleopensystempage = () => {
    navigate("/votesystempage");
  };
  const handleopencommunicationpage = () => {
    navigate("/votecommunicationpage");
  };
  const GoCreatePage = () => {
    navigate("/votecreate");
  };
  // 투표글 현황
  const votelist = useSelector((state) => state.Vote.votelist);
  const [endPointList, setEndPointList] = useState(
    new Array(votelist.length).fill(false)
  );
  const [checkBoxState, setCheckBoxState] = useState(
    new Array(votelist.length).fill(false)
  );
  const [votedList, setVotedList] = useState(new Array(votelist.length).fill(false));
  const boxes = [];
  const boxeslength = votelist.length; // 전체 상자 개수

  // 투표 클릭시 상세보기 창 보여주는 이벤트
  const handleVoteClick = (i) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[i] = !updatedIsOpenArray[i];
    setIsOpenArray(updatedIsOpenArray);
  };

  const updateEndpoint = (idx) => {
    setEndPointList((prevEndPointList) => {
      const updatedEndPoint = [...prevEndPointList]; // 이전 상태를 복제
      updatedEndPoint[idx] = true; // 원하는 인덱스를 true로 설정
      return updatedEndPoint; // 업데이트된 배열을 반환하여 상태 업데이트
    });
  };

  useEffect(() => {
    function getVoteList() {
      axiosToken()({
        method: "get",
        url: `/vote/voteInfo/${area_num}`,
        // url: `/vote/voteInfo/:area_num`,
      })
        .then((response) => {
          // 성공적인 응답 처리
          console.log("투표 전체 데이터 받아오기 :", response.data);
          dispatch(setVoteList(response.data.vote_list));
        })
        .catch((error) => {
          // 오류 처리
          console.error("투표 전체 데이터 받아오기 에러", error);
        });
    }
    getVoteList();
  }, []);

  const handleCheckboxChange = ({ index, i }) => {
    const updatedCheckboxStates = [...checkBoxState];
    updatedCheckboxStates[i] = index === 0; // index가 0이면 true, 그 외에는 false
    setCheckBoxState(updatedCheckboxStates);
  };

  // 투표후 확인버튼 클릭시 이벤트
  const voteend = (elec_num, agree, i) => {
    // console.log(elec_num, agree, "확인해보자구")
    // 휴지통 비우기 신청 함수
    axiosToken()({
      method: "post",
      url: "/vote/dovote",
      data: {
        elec_num: elec_num, // 해당 전자기기
        agree: agree,
      },
    })
      .then((response) => {
        // 성공적인 응답 처리
        const updatedVotedList = [...votedList];
        updatedVotedList[i] = true;
        setVotedList(updatedVotedList);
      })
      .catch((error) => {
        // 오류 처리
        console.error("투표 완료 오류:", error);
      });
  };

  const [isOpenArray, setIsOpenArray] = React.useState(
    new Array(boxeslength).fill(false)
  );
  for (let i = 0; i < boxeslength; i++) {
    // 체크박스를 체크박스 라벨 수 만큼 표시
    const tmp = ["켜기", "끄기"];
    // 투표를 이미 한 경우 해당 버튼 비활성화
    const isAlreadyVoted = votedList[i];
    const checkboxLabels = tmp.map((label, index) => (
      <FormControlLabel
        // 체크박스별 구분을 위한 key값 부여
        key={`label-${index}`}
        // 체크박스라는 표시
        control={
          isAlreadyVoted ? (
            <Checkbox disabled />
          ) : (
            <Checkbox />
          )
        }
        // 체크박스 옆 설명(라벨)
        label={label}
        className={style.checkbox}
        onChange={() => handleCheckboxChange({ index, i })}
      />
    ));
    // 투표글 박스 생성
    boxes.push(
      <div key={i} className={style.votebox}>
        {!endPointList[i] && isOpenArray[i] ? (
          // 투표글이 열려있을 때의 내용
          <>
            <BoxComponent
              i={i}
              endPointList={endPointList}
              handleVoteClick={handleVoteClick}
              updateEndpoint={updateEndpoint}
              IconComponent={KeyboardArrowDownIcon}
            />
            <Box
              key={`box-open-${i}`}
              className={style.textbox}
              sx={{ marginTop: "0.5rem" }}
            >
              <p>{votelist[i].voteName}</p>
              <FormGroup>{checkboxLabels}</FormGroup>
              <button
                className={isAlreadyVoted ? style.okoffbtn : style.okbtn}
                onClick={() => {
                  voteend(votelist[i].elecNum, checkBoxState[i], i);
                }}
                disabled={isAlreadyVoted} // 이미 투표한 경우 버튼 비활성화
              >
                {isAlreadyVoted ? "투표 완료" : "투표"}
              </button>
            </Box>
          </>
        ) : !endPointList[i] && !isOpenArray[i] ? (
          <>
            <BoxComponent
              i={i}
              // votelist={votelist}
              endPointList={endPointList}
              handleVoteClick={handleVoteClick}
              updateEndpoint={updateEndpoint}
              IconComponent={KeyboardArrowRightIcon}
            />
          </>
        ) : endPointList[i] && !isOpenArray[i] ? (
          <>
            <BoxComponent
              i={i}
              // votelist={votelist}
              endPointList={endPointList}
              handleVoteClick={handleVoteClick}
              updateEndpoint={updateEndpoint}
              IconComponent={KeyboardArrowRightIcon}
            />
          </>
        ) : (
          <>
            <BoxComponent
              i={i}
              // votelist={votelist}
              endPointList={endPointList}
              handleVoteClick={handleVoteClick}
              updateEndpoint={updateEndpoint}
              IconComponent={KeyboardArrowDownIcon}
            />
            <CompletedVoteComponent i={i} />
          </>
        )}
      </div>
    );
  }
  

  return (
    <div className={style.votepagemaind}>
      {/* 페이지 표시 */}
      <div className={style.voteheadertext}>
        <p onClick={handleopensystempage} className={style.othertext}>
          시스템
        </p>
        <p className={style.votepagetext}>투표</p>
        <p onClick={handleopencommunicationpage} className={style.othertext}>
          소통
        </p>
      </div>
      <div className={style.container} style={{ height: "60vh" }}>
        {boxes}
      </div>
      <div className={style.btnbox}>
        <button className={style.btn} onClick={() => GoCreatePage()}>
          투표만들기
        </button>
      </div>
    </div>
  );
}

export default VotePage;