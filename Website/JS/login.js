
function showMath0ryxAlert() {
  alert("Math0ryx got you!\nYou have successfully logged in!");
}

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn   = document.getElementById("loginSubmitBtn");
  const popup       = document.getElementById("success-popup");
  const closeBtn    = document.getElementById("popup-close");
  const emailField  = document.getElementById("loginEmail");     

  if (!submitBtn || !popup || !closeBtn || !emailField) {
    console.error("Login elements not found");
    return;
  }

  submitBtn.addEventListener("click", () => {
    emailField.value = "";

    popup.classList.remove("popup-hidden");
    popup.classList.add("popup-visible");

  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("popup-visible");
    popup.classList.add("popup-hidden");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("popup-visible");
      popup.classList.add("popup-hidden");
    }
  });
});