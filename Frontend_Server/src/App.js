import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 웹(앱) 전체 페이지 링크
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import BuildingPage from "./pages/BuildingPage";
import VotePage from "./pages/VotePage";
import SignupPageTwo from "./pages/SignupTwoPage"
import SignupResultPage from "./pages/SignupResultPage";
import VoteSystemPage from "./pages/VoteSystemPage";
import VoteCommunicationPage from "./pages/VoteCommunicationPage"
import VoteCreatePage from "./pages/VoteCreatePage";
import MyPage from "./pages/MyPage"
import "./firebase-messaging-sw.js";
import Notification from "./components/Notification";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 페이지링크, 보여줄 페이지 설정 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/votesystempage" element={<VoteSystemPage />} />
          <Route path="/votecommunicationpage" element={<VoteCommunicationPage />} />
          <Route path="/votecreate" element={<VoteCreatePage />} />
          <Route path="/signup/two" element={<SignupPageTwo />} />
          <Route path="/signup/resultpage" element={<SignupResultPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
        <Notification/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
