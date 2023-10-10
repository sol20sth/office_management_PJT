import { createSlice } from '@reduxjs/toolkit';

const initialState = []
// "resNum": Integer,
// "userId": String,
// "roomNum": Integer,
// "date": String,
// "resStart": String
const AllOfficeList = createSlice({
  name: "AllOfficeList",
  initialState: initialState,
  reducers: {
    initialState,
    setAllofficeBook: (state, action) => {
      return action.payload;
    },
    setOffice: (state, action) => {
      // 기존 데이터(state.articles)를 복제하여 새로운 배열을 만듭니다.
      const updatedOfficeList = [...state.OfficeList];
      // 새로운 데이터(action.payload)를 추가합니다.
      updatedOfficeList.push(...action.payload);
      // state.articles를 업데이트합니다.
      state.OfficeList = updatedOfficeList;
    },
  }
})

const initialState2 = null

const MyOffice = createSlice({
  name: "MyOffice",
  initialState: initialState2,
  reducers: {
    initialState,
    setMyofficeBook: (state, action) => {
      return action.payload;
    }
  }
})

const initialState3 = []

const OfficeNameList = createSlice({
  name: "OfficeNameList",
  initialState: initialState3,
  reducers: {
    initialState,
    setOfficeNameList: (state, action) => {
      return action.payload;
    }
  }
})

const initialState4 = {roomNames: []}
// roomNames: [{room1:1}, {room2:2}]

const OfficeNameList2 = createSlice({
  name: "OfficeNameList2",
  initialState: initialState4,
  reducers: {
    initialState,
    setOfficeNameList2: (state, action) => {
      state.roomNames = action.payload;
    }
  }
})


export const {setOffice, setAllofficeBook} = AllOfficeList.actions;
export const {setMyOffice,setMyofficeBook} = MyOffice.actions;
export const {setOfficeNameList} = OfficeNameList.actions;
export const {setOfficeNameList2} = OfficeNameList2.actions;
export const AllOfficeListReducer = AllOfficeList.reducer;
export const MyOfficeReducer = MyOffice.reducer;
export const OfficeNameListReducer = OfficeNameList.reducer;
export const OfficeNameList2Reducer = OfficeNameList2.reducer;




