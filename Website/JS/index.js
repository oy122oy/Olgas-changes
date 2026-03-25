function toggleHamburger() {
  const menu = document.getElementById("hamburgerMenu");
  menu.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  const menu = document.getElementById("hamburgerMenu");
  const hamburger = document.querySelector(".hamburger");

  if (menu.classList.contains("active")) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("active");
    }
  }
});

  const video = document.getElementById('videoWelcomePage');
const audio = document.getElementById('audioWelcomePage');

video.loop = true;  

// ssync play/pause
video.onplay = () => {
  audio.play().catch(err => console.log("Autoplay blocked:", err));
};

video.onpause = () => {
  audio.pause();
};

// only wehen audio ends stop everything
audio.onended = () => {
  video.pause();
  video.currentTime = 0;    
  audio.currentTime = 0;     
};

//for leading section2 to savescore page on click
document.getElementById('indexSec2Border').addEventListener('click', () => {
  window.location.href = 'savescore.html';
});