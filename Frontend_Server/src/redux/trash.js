import { createSlice } from '@reduxjs/toolkit';

const initialState = [{date : "2023-09-07", time: "19:00"},{date : "2023-09-07", time: "16:30"},{date : "2023-09-07", time: "18:30"}]

const TrashList = createSlice({
  name: "TrashList",
  initialState: initialState,
  reducers: {
    initialState,
    setTrash: (state, action) => {
      // 기존 데이터(state.articles)를 복제하여 새로운 배열을 만듭니다.
      const updatedTrashList = [...state.TrashList];
      // 새로운 데이터(action.payload)를 추가합니다.
      updatedTrashList.push(...action.TrashList);
      // state.articles를 업데이트합니다.
      state.TrashList = updatedTrashList;
    },
  }
})

const initialState2 = {data : 4}

const MyTrash = createSlice({
  name: "MyTrash",
  initialState: initialState2,
  reducers: {
    initialState,
  }
})

export const {setTrash} = TrashList.actions;
export const {setMyTrash} = MyTrash.actions;
export const TrashListReducer = TrashList.reducer;
export const MyTrashReducer = MyTrash.reducer;




