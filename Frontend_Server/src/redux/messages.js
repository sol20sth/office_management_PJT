import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // { type: "trash", startEnd: false, user_id: "123", date: "10:10:00" ,content:"x"},
  // { type: "vote", startEnd: false, user_id: "123", date: "10:10:00" ,content:"에어컨1"},
  // { type: "vote", startEnd: false, user_id: "123", date: "10:10:00" ,content:"티비"},
  // { type: "office", startEnd: true, user_id: "123", date: "10:10:00", content:"회의실1" },
  // { type: "trash", startEnd: false, user_id: "123", date: "10:10:00" , content:"x"},
  // { type: "trash", startEnd: false, user_id: "123", date: "10:10:00" ,content:"x"},
  // { type: "trash", startEnd: false, user_id: "123", date: "10:10:00" ,content:"x"},
];

const Messages = createSlice({
  name: 'Messages',
  initialState,
  reducers: {
    setAllMessages: (state, action) => {
      // 새로운 상태 객체를 반환합니다.
      return action.payload;
    },
    setRobotMessages: (state) => {
      // type이 'robot'인 Messages만 필터링하여 반환합니다.
      return state.filter((message) => message.type === 'robot');
    },
  },
});

export const {setAllMessages, setRobotMessages} = Messages.actions;
export default Messages.reducer;