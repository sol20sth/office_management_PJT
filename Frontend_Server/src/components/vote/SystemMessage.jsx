import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "./SystemMessage.module.css";
import { setAllMessages, setRobotMessages } from "../../redux/messages";

function SystemMessage () {
  const dispatch = useDispatch();
  const AllMessages = useSelector((state) => state.Messages);
  const user_id = useSelector((state) => state.UserInfo.user_id);

  return (
    <>
      <div className={styled.container}>
        {AllMessages.map((message, index) => (
          <div key={index} className={styled.box}>
            <div className={styled.between}>
              {message.type === "office" ? (
                <p className={styled.item}>[회의실알림]</p>
              ) : message.type === "trash" ? (
                <p className={styled.item}>[쓰레기알림]</p>
              ) : message.type === "vote" ? (
                <p className={styled.item}>[투표알림]</p>
              ) : null}
              <span className={styled.span}>{message?.date}</span>
            </div>
            
              {message.type === "vote" && message.startEnd === true
                ? <p className={styled.item2}>{message.content}의 투표가 시작되었습니다</p>
                :message.type === "vote" && message.startEnd === false
                ? <p className={styled.item2}> {message.content}의 투표가 종료되었습니다</p>
                :message.type === "office" && message.startEnd === true
                ? <p className={styled.item2}> {message.content}의 준비가 시작되었습니다</p>
                :message.type === "office" && message.startEnd === false
                ?  <p className={styled.item2}>{message.content}의 준비가 완료되었습니다</p>
                : message.type === "trash"  && message.startEnd === true && message.content === user_id
                ? <p className={styled.item2}>{user_id}님의 쓰레기통을 비우기 시작하였습니다</p>
                : message.type === "trash"  && message.startEnd === false && message.content === user_id
                ? <p className={styled.item2}>{user_id}님의 쓰레기통을 비우기를 완료하였습니다.</p>
                : null}
            
          </div>
        ))}
      </div>
    </>
  );
};

export default SystemMessage;
