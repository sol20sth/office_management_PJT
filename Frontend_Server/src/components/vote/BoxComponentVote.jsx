import React from "react";
import style from "../../pages/VotePage.module.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Timer from "./Timer";
import { useSelector, useDispatch } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const BoxComponent = ({
  i,
  endPointList,
  handleVoteClick,
  updateEndpoint,
  IconComponent
}) => {
  const votelist = useSelector((state) => state.Vote.votelist);
  return (
    <Box
      key={`box-${i}`}
      className={style.newbox}
      style={{ display: "table-cell", verticalAlign: "middle" }}
      onClick={() => handleVoteClick(i)}
    >
      <Grid container className={style.titletext}>
        {/* 투표글 작성자 이미지 */}
        <Grid item xs={2}>
          <div className={style.profile}>
            <Avatar src={process.env.PUBLIC_URL + "/images/userprofile.png"} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <p className={style.new}>{votelist[i].voteName.slice(0, 21)}</p>
        </Grid>
        {/* 남은시간 표시 */}
        <Grid item xs={3}>
          <p className={style.timename}> 남은 시간</p>
          <p className={style.time}>
            <Timer
              props={votelist[i].endTime}
              endPoint={endPointList[i]}
              updateEndpoint={() => updateEndpoint(i)}
              idx={i}
            />
          </p>
        </Grid>
        <Grid item xs={1}>
          {/* 투표 아이콘 */}
          {IconComponent==KeyboardArrowDownIcon ? (
            <KeyboardArrowDownIcon
            className={style.arrowdown}
            onClick={() => handleVoteClick(i)}
            />
          ) : (
            <KeyboardArrowRightIcon
              className={style.arrowright}
              onClick={() => handleVoteClick(i)}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoxComponent;
