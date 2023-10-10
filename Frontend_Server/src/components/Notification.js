import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../firebase-messaging-sw';
import { setdeviceToken } from '../redux/user';
import { useDispatch } from 'react-redux';

function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const dispatch = useDispatch()
  useEffect(() => {
    requestPermission()
      .then((token) => {
        console.log(token);
        dispatch(setdeviceToken(token)); // Redux 스토어에 토큰 저장
      })
      .catch((error) => {
        console.error('Error requesting permission:', error);
      });
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`, {
        duration: 60000, 
        position: 'top-right'
      });
});
    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err));
    };
  }, [dispatch]);
  return (
    <div>
      <Toaster />
    </div>
  );
}
export default Notification;