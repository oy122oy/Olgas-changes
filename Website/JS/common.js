function toggleHamburger() {
  var menu = document.getElementById("hamburgerMenu");
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
  } else {
    menu.classList.add("open");
  }
}

function toggleFab() {
  var fab = document.querySelector(".fabContainer");
  if (fab.classList.contains("open")) {
    fab.classList.remove("open");
  } else {
    fab.classList.add("open");
  }
}

function goHome() {
  window.location.href = "index.html";
}

function goSearch() {
  var bar = document.getElementById("headerSearchBar");
  if (bar) {
    bar.focus();
    bar.scrollIntoView();
  }
}

function toggleDark() {
  document.body.classList.toggle("dark-mode");
}
