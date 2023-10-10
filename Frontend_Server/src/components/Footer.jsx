import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "./footer.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import HowToVoteRoundedIcon from "@mui/icons-material/HowToVoteRounded";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

function Footer () {
  const location = useLocation();
  const pathname = location.pathname;
  const homeClass = pathname === "/home" ? styled.active : "";
  const buildingClass = pathname === "/building" ? styled.active : "";
  const voteClass = pathname === "/vote" || pathname === "/votesystempage" || pathname === "/votecommunicationpage" || pathname === "/votecreate"  ? styled.active : "";
  const MyPageClass = pathname === "/mypage" ? styled.active : "";
  const navigate = useNavigate();
  const TF =
    pathname === "/login" || pathname === "/signup" || pathname === "/" || pathname === "/signup/two" || pathname === "/signup/resultpage";
  // 클릭 이벤트 핸들러 함수
  const handleIconClick = (go) => {
    if (pathname !== go) {
      navigate(go);
    }
  };

  return (
    <>
      {TF ? (
        <></>
      ) : (
        <footer className="footer" style={{backgroundColor:"white"}}>
          {/* <hr className={styled.hr} /> */}
          <Grid container style={{height: "100%", width: "100%"}}>
            <Grid item xs={3} className={styled.grid}>
              <HomeRoundedIcon
                className={homeClass}
                style={{ fontSize: "2.7rem" }}
                onClick={() => handleIconClick("/home")} // 클릭 시 이벤트 핸들러 호출
              />
            </Grid>
            <Grid item xs={3} className={styled.grid}>
              <CorporateFareRoundedIcon
                className={buildingClass}
                style={{ fontSize: "2.7rem" }}
                onClick={() => handleIconClick("/building")} // 클릭 시 이벤트 핸들러 호출
              />
            </Grid>
            <Grid item xs={3} className={styled.grid}>
              <HowToVoteRoundedIcon
                className={voteClass}
                style={{ fontSize: "2.7rem" }}
                onClick={() => handleIconClick("/votesystempage")} // 클릭 시 이벤트 핸들러 호출
              />
            </Grid>
            <Grid item xs={3} className={styled.grid}>
              <PermIdentityIcon
              className={MyPageClass}
              style={{fontSize:"2.7rem"}}
              onClick={() => handleIconClick("/mypage")} // 클릭 시 이벤트 핸들러 호출
                />
            </Grid>
          </Grid>
        </footer>
      )}
    </>
  );
};

export default Footer;
