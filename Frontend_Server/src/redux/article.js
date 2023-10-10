import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 전체 게시글
    articles:[],
};

const ArticleList = createSlice({
  name: 'ArticleList',
  initialState,
  reducers: {
    initialState,
    // 전체 게시글 수정 함수
    setArticleList: (state, action) => {
      state.articles = action.payload;
    },

    setarticle: (state, action) => {
      // 기존 데이터(state.articles)를 복제하여 새로운 배열을 만듭니다.
      const updatedArticles = [...state.articles];
      // 새로운 데이터(action.payload)를 추가합니다.
      updatedArticles.push(...action.payload);
      // state.articles를 업데이트합니다.
      state.articles = updatedArticles;
    },
  },


});

export const { setarticle, setArticleList} = ArticleList.actions;
export default ArticleList.reducer;