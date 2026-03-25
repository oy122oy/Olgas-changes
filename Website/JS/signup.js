// to subscribe to Math0ryx allert

function showMath0ryxAlert() {
  alert(
    "Math0ryx got you!\nPlease follow link on your email to set up your account!",
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("indexSec4EmailSubmit");
  const emailField = document.getElementById("indexSec4EmailField");
  const popup = document.getElementById("success-popup");
  const closeBtn = document.getElementById("popup-close");

  if (!submitBtn || !popup) return;

  submitBtn.addEventListener("click", () => {
    if (emailField) emailField.value = "";
    popup.classList.add("popup-visible"); // show popup
  });

  // Click OK button to0hide
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("popup-visible");
  });

  // Cclick outside the orange box to hide
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("popup-visible");
    }
  });
});
