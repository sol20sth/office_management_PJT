import { createSlice } from '@reduxjs/toolkit';

const initialState = [false, false, false, false, false, false];

const WebsocketData = createSlice({
  name: 'WebsocketData',
  initialState,
  reducers: {
    initialState,
    // 전체 게시글 수정 함수
    setwebsocket: (state, action) => {
      // action.payload를 사용하여 상태를 완전히 대체합니다.
      return action.payload
    },
  },


});

export const { setwebsocket } = WebsocketData.actions;
export default WebsocketData.reducer;