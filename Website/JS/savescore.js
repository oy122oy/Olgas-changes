


// every page with quizz should send updated scores before redirecting to the savescorehtml
let myScore  = Number(localStorage.getItem("currentQuizScore"))      || 0;
let totalQ   = Number(localStorage.getItem("currentTotalQuestions")) || 20; //we oly have 20 questions 
let percent  = Math.round((myScore / totalQ) * 100);
let quizName = localStorage.getItem("currentQuizName") || "Quiz";

// league assignment by score percentrage
function getLeague(p) {
  if (p < 40) return "Fail";
  if (p < 50) return "Pass";
  if (p < 70) return "Bronze";
  if (p < 85) return "Silver";
  return "Gold";
}

// remember last avatars not to upload them again
let avatarURL = localStorage.getItem("lastAvatar") ||
                "https://via.placeholder.com/120/006600/ffffff?text=👤";
document.getElementById("avatarShow").src = avatarURL;

// random avatars from reviewfaces locallly
document.getElementById("randomBtn").onclick = function () {
  let randomLinks = [
    "Images/ReviewFaces/reviewface1.png",
    "Images/ReviewFaces/reviewface2.png",
    "Images/ReviewFaces/reviewface3.png",
    "Images/ReviewFaces/reviewface4.png",
    "Images/ReviewFaces/reviewface5.png",
    "Images/ReviewFaces/reviewface6.png",
    "Images/ReviewFaces/reviewface7.png"
  ];
  avatarURL = randomLinks[Math.floor(Math.random() * randomLinks.length)];
  document.getElementById("avatarShow").src = avatarURL;
  localStorage.setItem("lastAvatar", avatarURL);
};

// when uploading the photo
document.getElementById("avatarFile").onchange = function (e) {
  let file = e.target.files[0];
  if (!file) return;
  let reader = new FileReader();
  reader.onload = function (ev) {
    avatarURL = ev.target.result;
    document.getElementById("avatarShow").src = avatarURL;
    localStorage.setItem("lastAvatar", avatarURL);
  };
  reader.readAsDataURL(file);
};

// sends to Flask database 
document.getElementById("saveBtn").onclick = async function () {
  let nick  = document.getElementById("nick").value.trim();
  let error = document.getElementById("errorMsg");

  if (nick === "") {
    error.textContent = "Please write a nickname!";
    return;
  }

  error.textContent = "";

  try {
    let response = await fetch("http://127.0.0.1:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: nick,
        avatar:   avatarURL,
        score:    myScore,
        percent:  percent,
        league:   getLeague(percent),
        quizname: quizName
      })
    });

    if (!response.ok) throw new Error("Server error");

    let result = await response.json();

    if (result.updated) {
      error.style.color = "blue";
      error.textContent = "Your score was updated! ✅";
    } else {
      error.style.color = "green";
      error.textContent = "New score saved! ✅";
    }

    localStorage.setItem("lastAvatar", avatarURL);
    await loadLeaderboard();

  } catch (err) {
    // Flask not running — fall back to localStorage
    error.style.color = "orange";
    error.textContent = "Saved locally only (Flask not running)";
    saveLocally(nick);
    showLocalTable();
  }
};

// ─ leaderboard FROM Flask ──
async function loadLeaderboard() {
  try {
    let res  = await fetch("http://127.0.0.1:5000/scores");
    let rows = await res.json();
    renderTable(rows);
  } catch (err) {
    showLocalTable(); // fallback
  }
}

// ── the table ──
function renderTable(rows) {
  let tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No scores yet. Be the first!</td></tr>';
    return;
  }

  rows.forEach((player, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.rank || i + 1}</td>
      <td><img src="${player.avatar}" width="50" height="50" style="border-radius:50%; object-fit:cover;"></td>
      <td>${player.nickname}</td>
      <td>${player.score}</td>
      <td>${player.percent}%</td>
      <td class="league-${(player.league || "").toLowerCase()}">${player.league}</td>
    `;
    tbody.appendChild(row);
  });
}

// ── save to localStorage if Flask is down ──
function saveLocally(nick) {
  let allScores = JSON.parse(localStorage.getItem("math0ryxScores")) || [];
  let existing  = allScores.find(p => p.nickname.toLowerCase() === nick.toLowerCase());

  if (existing) {
    existing.score      = myScore;
    existing.percentage = percent;
    existing.league     = getLeague(percent);
    existing.avatar     = avatarURL;
  } else {
    allScores.push({
      nickname:   nick,
      avatar:     avatarURL,
      score:      myScore,
      percentage: percent,
      league:     getLeague(percent)
    });
  }

  allScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("math0ryxScores", JSON.stringify(allScores));
}

// ──  show localStorage table ──
function showLocalTable() {
  let allScores = JSON.parse(localStorage.getItem("math0ryxScores")) || [];
  let mapped = allScores.map((p, i) => ({
    rank:     i + 1,
    avatar:   p.avatar,
    nickname: p.nickname,
    score:    p.score,
    percent:  p.percentage,
    league:   p.league
  }));
  renderTable(mapped);
}

// ── lload leaderboard on page open ──
window.onload = loadLeaderboard;
