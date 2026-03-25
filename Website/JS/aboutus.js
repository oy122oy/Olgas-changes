function fitText() {
  const el = document.getElementById("fitText");
  const parent = el.parentElement;
  let fontSize = 100; // starts at its biggesst  
  el.style.fontSize = fontSize + "px";

  while (
    (el.scrollHeight > parent.clientHeight ||
     el.scrollWidth > parent.clientWidth) &&
    fontSize > 13.4
  ) {
    fontSize -= 1;
    el.style.fontSize = fontSize + "px";
  }
}

window.addEventListener("load", fitText);
window.addEventListener("resize", fitText);// this bit insures mathorix box text will not overflow when resizing the window, it will adjust the font size to fit the bo