import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  user_id:"",
  user_pw: "",
  user_name: "",
  accessToken:"",
  com_name: "", // 회사이름
  com_num:"", // 회사번호(서버 요청시 번호로)
  dep_name: "", // 부서이름
  dep_num:"", // 부서번호(서버 요청시 번호로)
  area_num: "", // 구역번호
  seat_num: "", // 자리번호 
  elec_num:"", // 기기번호
  isAutoLoginChecked: false,
  loginchecked:false,
  queue_num: -1,
  deviceToken: "", // 휴대폰 기기 토큰
};

const MobileUser = createSlice({
  name: 'MobileUser',
  initialState,
  reducers: {
    initialState,
    setid: (state, action) => {
      state.user_id = action.payload;
    },
    setpw: (state,action) => {
      state.user_pw = action.payload
    },
    setname: (state, action) => {
      state.user_name = action.payload;
    },
    setaccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setcomname: (state, action) => {
      state.com_name = action.payload;
    },
    setdepname: (state, action) => {
      state.dep_name = action.payload;
    },
    setcomnum: (state, action) => {
      state.com_num = action.payload;
    },
    setdepnum: (state, action) => {
      state.dep_num = action.payload;
    },
    setareanum: (state, action) => {
      state.area_num = action.payload;
    },
    setseatnum: (state, action) => {
      state.seat_num = action.payload;
    },
    setelecnum: (state, action) => {
      state.elec_num = action.payload;
    },
    setAutoLoginChecked: (state, action) => {
      state.isAutoLoginChecked = action.payload;
    },
    setloginchecked: (state, action) => {
      state.loginchecked = action.payload;
    },
    setqueuenum: (state, action) => {
      state.queue_num = action.payload;
    },
    setdeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
    setLogout: (state) => {
    // 상태를 초기 상태로 되돌릴 때는 불변성을 유지하며 업데이트
    return {
      ...initialState,
    };
    },
  },
});

export const { setid, setpw, setname, setaccessToken, setcomnum,setLogout, setdeviceToken,setqueuenum,
  setdepnum, setareanum, setseatnum, setelecnum, setAutoLoginChecked, setloginchecked, setcomname, setdepname} = MobileUser.actions;
export default MobileUser.reducer;