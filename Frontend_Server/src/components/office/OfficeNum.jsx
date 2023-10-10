import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "./officeNum.module.css";
export default function OfficeNum({
  OfficeName,
  selectOffice,
  onSelectOfficeChange,
  TF,
}) {
  console.log(OfficeName, selectOffice, TF);
  const handleMenuItemClick = (item) => {
    onSelectOfficeChange(item);
  };

  const MenuItems = () => {
    return OfficeName.map((item) => {
      return (
        <MenuItem
          key={item}
          value={item}
          onClick={() => handleMenuItemClick(item)}
        >
          {item}
        </MenuItem>
      );
    });
  };
  const fixed = () => {
    return (
      <MenuItem
        value={selectOffice}
        onClick={() => handleMenuItemClick(selectOffice)}
      >
        {selectOffice}
      </MenuItem>
    );
  };

  return (
    <Box sx={{ minWidth: 120 }} className={styled.box}>
      {TF === "true" ? (
        <>
          <InputLabel htmlFor="selecoffice" className={styled.label3}>
            <span>* </span>회의실선택
          </InputLabel>

          <FormControl fullWidth>
            <Select
              id="selecoffice"
              value={selectOffice ? selectOffice : "x"}
              onChange={(event) => onSelectOfficeChange(event.target.value)}
              className={styled.select}
              sx={{ fontSize: "0.9rem", fontWeight: "normal" }}
            >
              {MenuItems()}
            </Select>
          </FormControl>
        </>
      ) : (
        <>
          <InputLabel htmlFor="selecoffice" className={styled.label3}>
            <span>* </span>회의실이름
          </InputLabel>
          <p
            id="selecoffice"
            className={`${styled.p}`}
            sx={{
              fontSize: "0.9rem",
              fontWeight: "normal",
            }}
          >{selectOffice}</p>
        </>
      )}
    </Box>
  );
}
