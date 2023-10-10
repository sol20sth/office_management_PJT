import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {setdeviceToken} from './redux/user'
// import { useDispatch } from "react-redux";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "ssafy-working-robot-project.firebaseapp.com",
  projectId: "ssafy-working-robot-project",
  storageBucket: "ssafy-working-robot-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestPermission() {
  // const dispatch = useDispatch();
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });

  if (token) {
    console.log("token: ", token);
    setdeviceToken(token)
    return token
  }else { 
  console.log("Can not get Token");
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
