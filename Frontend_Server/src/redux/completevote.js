import { createSlice } from '@reduxjs/toolkit';


const initialState = [
  // {content: '너무추워요', time:'17:00:15', name: '에어컨', check:[["켜기", 10], ["끄기", 20], ["안녕?", 30]]}
]
const CompleteVote = createSlice({
  name: 'CompleteVote',
  initialState,
  reducers: {
    initialState,
    setvote: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setvote } = CompleteVote.actions;
export default CompleteVote.reducer;