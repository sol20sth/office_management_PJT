import Swal from "sweetalert2";
// 재사용하기 위한 alert 함수


export function oneSwal (icon, text) {
  return Swal.fire({
    icon: icon,
    text: text,
    showCancelButton: false,
    confirmButtonText: "확인",
    customClass: {
      container: "custom-swal", // Add a custom class
    },
    willOpen: () => {
      // Set z-index when the modal is about to open
      const customSwal = document.querySelector(".custom-swal");
      if (customSwal) {
        customSwal.style.zIndex = 9999;
      }
    },
    
  });
};
export function twoSwal (icon, text) {
  return Swal.fire({
    icon: icon,
    text: text,
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText : "취소",
    customClass: {
      container: "custom-swal", // Add a custom class
    },
    willOpen: () => {
      // Set z-index when the modal is about to open
      const customSwal = document.querySelector(".custom-swal");
      if (customSwal) {
        customSwal.style.zIndex = 9999;
      }
    },
  });
};
