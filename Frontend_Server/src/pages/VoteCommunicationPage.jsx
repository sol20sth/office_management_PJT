// 소통 페이지
import React, { useState, useEffect } from "react";
// 페이지 이동을 위한 navigate
import { useNavigate } from "react-router";
// css파일 호출(module.css형식으로 파일을 만들어서 호출하면 해당 지역변수느낌으로만 적용가능)
import style from "./VoteCommunicationPage.module.css";
// mui icon
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
// redux-toolkit store에 저장한 initialState값을 변경을 위해 사용하는 set함수
import { setarticle, setArticleList } from "../redux/article";
// useSelector = redux-toolkit store에 저장한 initialState 사용을 위해 호출, useDispath는 redux-toolkit store에 저장한 initialState값을 변경할때 사용
import { useSelector, useDispatch } from "react-redux";
// import http from "../utils/axios";
// 게시글 상태 업데이트 부분은 백이랑 연동하고 테스트 다시 해봐야할듯
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import axiosToken from "../utils/axiostoken";
function VoteCommunicationPage() {
  const com_num = useSelector((state) => state.UserInfo.com_num);
  const user_id = useSelector((state) => state.UserInfo.user_id);
  const navigate = useNavigate();
  // 투표 페이지로 이동
  const handleopenvotepage = () => {
    navigate("/vote");
  };
  // 시스템 메시지 페이지로 이동
  const handleopensystempage = () => {
    navigate("/votesystempage");
  };
  useEffect(() => {
    function getCommunicationList() {
      axiosToken()({
        method: "get",
        url: `/chat/${com_num}`,
      })
        .then((response) => {
          // 성공적인 응답 처리
          console.log("데이터:", response.data);
          const extractedContentList = response.data.chat.map(
            (item) => item.content
          );
          console.log(extractedContentList);
          dispatch(setArticleList(extractedContentList));
        })
        .catch((error) => {
          // 오류 처리
          console.error("오류:", error);
        });
    }
    getCommunicationList();
  }, []);
  // emoji 선택창 오픈
  const [emojiopen, setemojiopen] = React.useState(false);

  const dispatch = useDispatch();

  // 사용자 입력값
  const [value, setValue] = React.useState("");

  // 현재 시간
  const [nowdate, setnowdate] = React.useState("");

  // 입력값이 변경될 때마다 호출되는 함수
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // 입력값이 20자 이상이면 자르기
    if (inputValue.length > 24) {
      alert("한줄 소통 최대글자수 입니다.");
      setValue(inputValue.slice(0, 24));
    } else {
      setValue(inputValue);
    }
  };

  // 엔터 키를 눌렀을 때 호출되는 함수
  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      // value 상태의 값을 newarticle 변수에 저장
      const newArticleContent = value;
      // 현재 시간을 가져옴
      const date = new Date();
      // 년도
      const year = date.getFullYear();
      // 월
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
      // 일
      const day = String(date.getDate()).padStart(2, "0"); // 날짜를 2자리로 포맷팅
      // 시
      const hours = String(date.getHours()).padStart(2, "0"); // 시를 2자리로 포맷팅
      // 분
      const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 2자리로 포맷팅
      // 초
      const seconds = String(date.getSeconds()).padStart(2, "0"); // 초를 2자리로 포맷팅
      // 원하는 형태로 수정
      const alltime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      // 저장
      setnowdate(alltime);

      // 기존 게시글에 새로운 게시글 추가
      const updatedArticleList = [
        // 게시글 내용, 최신여부, 시간
        [newArticleContent, true, alltime],
      ];

      axiosToken()({
        method: "post",
        url: `/chat/make`,
        data: {
          user_id: user_id,
          content: value,
          com_num: com_num,
        },
      })
        .then((response) => {
          // 성공적인 응답 처리
          console.log("데이터:", response.data);
          // Redux에 업데이트된 게시글 리스트 저장
          dispatch(setarticle(updatedArticleList));

          // value 상태를 초기화
          setValue("");
        })
        .catch((error) => {
          // 오류 처리
          console.error("오류:", error);
        });
    }
  };

  // 게시글 현황
  const articlelist = useSelector((state) => state.Article.articles);
  // 수정을 위해 복사(최신날짜별로 정렬)
  const updatearticlelist = [...articlelist];

  // 날짜 및 시간 값을 기준으로 정렬
  updatearticlelist.sort((a, b) => {
    // '2023.09.06T13:40:10' 형식의 문자열을 Date 객체로 변환
    const dateA = new Date(a[2]);
    const dateB = new Date(b[2]);

    // 두 Date 객체를 비교하여 내림차순 정렬
    return dateB - dateA;
  });
  // 게시글 저장할 box생성
  const boxes = [];
  // 전체 게시글 수
  const boxeslength = updatearticlelist?.length;
  for (let i = 0; i < boxeslength; i++) {
    // 사용자가 읽지 않은 최신 게시글인 경우
    if (updatearticlelist[i][1]) {
      boxes.push(
        <Box key={i} className={style.newbox}>
          {/* 기본 프로필 이미지 설정 */}
          <div className={style.profile}>
            <Avatar src={process.env.PUBLIC_URL + "/images/userprofile.png"} />
          </div>
          {/* 클릭이벤트 지정 및 내용이 18자 이상인 경우 제거 */}
          <p className={style.new}>{updatearticlelist[i]}</p>
        </Box>
      );
      // 사용자가 읽은 예전글인 경우
    } else {
      boxes.push(
        <Box key={i} className={style.box}>
          {/* 기본 프로필 이미지 설정 */}
          <div className={style.profile}>
            <Avatar src={process.env.PUBLIC_URL + "/images/userprofile.png"} />
          </div>
          {/* 게시글 내용 */}
          <p className={style.p}>{updatearticlelist[i][0].slice(0, 24)}</p>
        </Box>
      );
    }
  }

  const handleopenemoji = () => {
    if (emojiopen) {
      setemojiopen(false);
    } else {
      setemojiopen(true);
    }
  };

  // 이모지 선택 이벤트 핸들러
  const handleclickemoji = (emojiObject, event) => {
    const emojiimg = emojiObject.emoji;

    // 선택한 이모지 이미지를 value 상태에 추가 (이모지의 이미지 주소를 추가)
    const tmp = value + emojiimg;
    setValue(tmp);

    // 이모지 선택창 닫기
    setemojiopen(false);
  };

  return (
    <div className={style.votepagemaind}>
      {/* 시스템, 투표, 소통 페이지로 이동하기 위한 p태그 */}
      <div className={style.voteheadertext}>
        <p className={style.othertext} onClick={handleopensystempage}>
          시스템
        </p>
        <p className={style.othertext} onClick={handleopenvotepage}>
          투표
        </p>
        <p className={style.votepagetext}>소통</p>
      </div>
      <div
        className={style.articlemain}
        style={{ height: `${window.innerHeight * 0.09}%` }}
      >
        <p style={{ marginTop: "1rem" }}></p>
        {/* 실제 게시글들 나열 */}
        {boxes}
      </div>
      {/* 입력창 */}
      <div className={style.inputlabel}>
        <InsertEmoticonIcon
          className={style.emojiicon}
          onClick={handleopenemoji}
        />
        <OutlinedInput
          placeholder="내용을 작성해주세요."
          sx={{ width: "80vw" }}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />
      </div>
      {emojiopen && (
        <div
          style={{
            fontSize: "0.5rem",
            maxHeight: "9.5rem",
            position: "absolute",
            bottom: `${window.innerHeight * 0.03}rem`,
          }}
        >
          <EmojiPicker
            searchDisabled="true"
            skinTonesDisabled="true"
            width="95vw"
            height={window.innerHeight * 0.5}
            onEmojiClick={handleclickemoji}
            previewConfig={{ showPreview: false }}
            categories={[
              { category: "suggested", name: "최근 사용" },
              { category: "smileys_people", name: "표정 및 활동" },
              { category: "animals_nature", name: "동물 및 자연" },
              { category: "food_drink", name: "음식 및 음료" },
              { category: "travel_places", name: "장소 및 이동수단" },
              { category: "activities", name: "활동" },
              { category: "objects", name: "사물" },
              { category: "symbols", name: "상징" },
              { category: "flags", name: "국기" },
            ]}
          />
        </div>
      )}
      {/* 입력창 내에서 이모지 이미지를 표시 */}
      <div className={style.emojiImages}>
        {value
          .match(/https:\/\/.*\.(png|jpg|jpeg|gif)/g)
          ?.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt="Emoji" />
          ))}
      </div>
    </div>
  );
}

export default VoteCommunicationPage;
