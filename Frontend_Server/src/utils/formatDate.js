export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 날짜를 2자리로 포맷팅

  return `${year}-${month}-${day}`;
}

export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0'); // 시를 2자리로 포맷팅
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분을 2자리로 포맷팅
  return `${hours}:${minutes}`;
}
export function formatTimerType(date) {
  const hours = String(date.getHours()).padStart(2, '0'); // 시를 2자리로 포맷팅
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분을 2자리로 포맷팅
  const seconds = String(date.getMinutes()).padStart(2, '0'); // 분을 2자리로 포맷팅
  return `${hours}:${minutes}:${seconds}`;
}