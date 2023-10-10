import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    votelist:[]
};

const Votelist = createSlice({
  name: 'Votelist',
  initialState,
  reducers: {
    initialState,
    setVoteList : (state, action) => { 
      state.votelist = action.payload
    },
    setvote: (state, action) => {
        state.id = action.payload;
      },
  },
});



export const { setvote,setVoteList } = Votelist.actions;
export default Votelist.reducer;