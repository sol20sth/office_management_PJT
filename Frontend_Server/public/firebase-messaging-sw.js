// 'install' 이벤트 핸들러: 서비스 워커가 설치될 때 실행됩니다.
self.addEventListener("install", function (e) {
  console.log("fcm sw install.."); // 로그 출력: 서비스 워커 설치 중임을 표시
  self.skipWaiting(); // 서비스 워커를 활성화하기 위해 대기 중인 다른 서비스 워커를 바로 활성화합니다.
});

// 'activate' 이벤트 핸들러: 서비스 워커가 활성화될 때 실행됩니다.
self.addEventListener("activate", function (e) {
  console.log("fcm sw activate.."); // 로그 출력: 서비스 워커가 활성화됨을 표시
});

// 'push' 이벤트 핸들러: 푸시 알림을 받았을 때 실행됩니다.
self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json()); // 로그 출력: 푸시 메시지 데이터를 출력

  if (!e.data.json()) return; // 푸시 메시지 데이터가 없으면 종료

  // 푸시 메시지 데이터에서 필요한 정보 추출
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  // 푸시 알림 옵션 설정
  const notificationOptions = {
    body: resultData.body, // 알림 본문 내용
    icon: "./images/logo.png", // 알림 아이콘 이미지 경로
    tag: resultData.tag, // 알림 태그 (중복 알림 관리용)
    ...resultData, // 푸시 메시지 데이터에서 추가 옵션 병합
  };

  // 로그 출력: 푸시 메시지 데이터와 알림 설정 정보 출력
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  // 알림을 화면에 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 'notificationclick' 이벤트 핸들러: 알림 클릭 시 실행
self.addEventListener("notificationclick", function (event) {
  console.log("notification click"); // 로그 출력: 알림 클릭 이벤트 발생을 표시

  const url = "/votesystempage"; // 알림 클릭 시 열릴 URL
  event.notification.close(); // 알림을 닫기
  
  // 클라이언트에서 새 창을 열기
  event.waitUntil(clients.openWindow(url));
});
