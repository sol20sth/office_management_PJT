import React from "react";
import { TbAirConditioningDisabled, TbAirConditioning } from "react-icons/tb";
import { Icon } from "@iconify/react";
import style from "./mapsecond.module.css";
import Box from "@mui/material/Box";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import { PiTelevisionSimpleBold, PiTelevisionSimpleFill } from "react-icons/pi";

function MapSecond({ xn, yn, status }) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "85%",
  };

  const createIconStyle = (top, right, status) => ({
    position: "absolute",
    top,
    right,
    fontSize: "18px",
    color: status ? "gray" : "green",
  });

  const createRobotStyle = (top, right, hasCoordinates) => ({
    position: "absolute",
    top: hasCoordinates ? `${top}%` : 0,
    right: hasCoordinates ? `${right}%` : 0,
    fontSize: "27px",
  });

  return (
    <div style={containerStyle}>
      <img
        src={process.env.PUBLIC_URL + "/map/2pages.png"}
        alt="title"
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          borderRadius: "1rem",
        }}
      />

      {/* Air Conditioning Icons */}
      <div style={createIconStyle("6.8339%", "39.0984%", status[1])}>
        {status[1] ? <TbAirConditioning /> : <TbAirConditioningDisabled />}
      </div>
      <div style={createIconStyle("5.445%", "90.333%", status[0])}>
        {status[0] ? <TbAirConditioning /> : <TbAirConditioningDisabled />}
      </div>

      {/* Robot Icon */}
      {xn && yn && (
        <div style={createRobotStyle(yn - 6, xn, true)}>
          <SmartToyTwoToneIcon />
        </div>
      )}

      {/* Air Purifier Icons */}
      <div style={createIconStyle("68.25%", "87.11%", status[1])}>
        {status[1] ? (
          <Icon icon="mdi:air-purifier" />
        ) : (
          <Icon icon="mdi:air-purifier-off" />
        )}
      </div>
      <div style={createIconStyle("72.4944%", "39.6904%", status[0])}>
        {status[0] ? (
          <Icon icon="mdi:air-purifier" />
        ) : (
          <Icon icon="mdi:air-purifier-off" />
        )}
      </div>

      {/* TV Icons */}
      <div style={createIconStyle("42.4022%", "89.6209%", status[1])}>
        {status[1] ? (
          <PiTelevisionSimpleBold />
        ) : (
          <PiTelevisionSimpleFill />
        )}
      </div>
      <div style={createIconStyle("41.832%", "41.3652%", status[0])}>
        {status[0] ? (
          <PiTelevisionSimpleBold />
        ) : (
          <PiTelevisionSimpleFill />
        )}
      </div>

      <Box className={style.doorbox} />
      <Icon icon="mdi:garbage" className={style.garbage} />
    </div>
  );
}

export default MapSecond;
