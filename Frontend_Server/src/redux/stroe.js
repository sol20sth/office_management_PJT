import UserInfo from './user'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import ArticleList from './article'
import Messages from './messages';
import WebsocketData from './websocket';
import { TrashListReducer, MyTrashReducer } from './trash';
import {AllOfficeListReducer, MyOfficeReducer, OfficeNameListReducer, OfficeNameList2Reducer} from './office';
import VoteList from './vote'
import Completevote from './completevote';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  UserInfo : persistReducer(persistConfig, UserInfo),
  Article: ArticleList,
  Messages : Messages,
  TrashList : TrashListReducer,
  MyTrash : MyTrashReducer,
  OfficeList : AllOfficeListReducer,
  MyOffice : MyOfficeReducer,
  OfficeNameList: OfficeNameListReducer,
  OfficeNameList2: OfficeNameList2Reducer,
  Vote: VoteList,
  Completevote: Completevote,
  Websocketdata: WebsocketData
});


export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)