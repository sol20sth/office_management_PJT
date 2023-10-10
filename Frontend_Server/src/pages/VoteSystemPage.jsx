import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import style from "./VoteSystemPage.module.css";
import SystemMessage from "../components/vote/SystemMessage";
import axiosToken from "../utils/axiostoken";
import { setAllMessages } from "../redux/messages";

function VoteSystemPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.UserInfo.user_id);
  // const token = useSelector((state) => state.UserInfo.accessToken);
  const handleopenvotepage = () => {
    navigate("/vote");
  };
  const handleopencommunicationpage = () => {
    navigate("/votecommunicationpage");
  };
  

  useEffect(() => {
    async function GetMessage() {
      try {
        const response = await axiosToken().get(`alarm/${user_id}`);
        if (response.data.message === "Success") {
          console.log("시스템메세지 받아오기 성공: ", response.data.message_list);
          dispatch(setAllMessages(response.data.message_list));
        }
      } catch (error) {
        console.error("시스템메세지 받아오기 실패", error);
      }
    }
    GetMessage();
  }, []);

  return (
    <div className="total-content-container">
      <div className={style.votepagemaind}>
        <div className={style.voteheadertext}>
          <p className={style.votepagetext}>시스템</p>
          <p className={style.othertext} onClick={handleopenvotepage}>
            투표
          </p>
          <p onClick={handleopencommunicationpage} className={style.othertext}>
            소통
          </p>
        </div>
        <SystemMessage />
      </div>
    </div>
  );
}

export default VoteSystemPage;
