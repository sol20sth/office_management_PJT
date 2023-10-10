import * as React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function VoteNormalTimePicker({
    handleTimeChange,
  }) {
  // 현재 시간을 계산
  const currentDateTime = dayjs();
  let currentHour = currentDateTime.hour();
  let currentMin = Math.ceil(currentDateTime.minute() / 5) * 5;

  if (currentMin === 60) {
      currentMin = 0;
      currentHour += 1;
  }
  let nowtime = ''
  if (currentMin < 10) {
    nowtime = `${currentHour}:0${currentMin}`
  } else {
    nowtime = `${currentHour}:${currentMin}`
  }
  const [time, settime] = useState(nowtime);

  const onChange = (event) => {
      const newTime = event.target.value;
      settime(newTime);
      handleTimeChange(newTime);
  }

  // 5분 간격으로 생성할 MenuItem 배열 생성
  const menuItems = [];
  for (let h = currentHour; h <= 17; h++) {
      for (let m = (h === currentHour ? currentMin : 0); m < 60; m += 5) {
          const formattedHour = h.toString().padStart(2, '0');
          const formattedMin = m.toString().padStart(2, '0');
          const menuItemValue = `${formattedHour}:${formattedMin}`;
          menuItems.push(
              <MenuItem key={menuItemValue} value={menuItemValue}>
                    <span style={{ textAlign: 'center', width: '100%' }}>{menuItemValue}</span>
              </MenuItem>
          );
      }
  }

  const menuProps = {
    PaperProps: {
        style: {
            maxHeight: '40vh', // 메뉴 아이템 리스트의 최대 높이
            
        },
    },
  };


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">종료 시간</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="종료 시간"
          onChange={onChange}
          MenuProps={menuProps} // 메뉴 아이템 리스트의 스타일을 지정
        >
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
}
