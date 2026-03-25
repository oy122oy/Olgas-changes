
function getLeague(pct) {
  if (pct <= 40) return "fail";
  if (pct <= 50) return "pass";
  if (pct <= 60) return "bronze";
  if (pct <= 80) return "silver";
  return "gold";
}

function renderLeaderboard() {
  let data = JSON.parse(localStorage.getItem("math0ryxLeaderboard") || "[]");

  // Sort by percentage descendingg
  data.sort((a, b) => b.percentage - a.percentage);

  // top 4 lucky guys with higheest percentase of score  
  const topContainer = document.getElementById("top4Container");
  topContainer.innerHTML = "";
  const top4 = data.slice(0, 4);

  top4.forEach(player => {
    const div = document.createElement("div");
    div.className = "top-card";
    div.innerHTML = `
      <img src="${player.avatar}" alt="${player.nickname}">
      <h5>${player.nickname}</h5>
      <p><strong>${player.score}</strong> points • ${player.percentage}%</p>
      <span class="league league-${player.league}">${player.league.toUpperCase()}</span>
    `;
    topContainer.appendChild(div);
  });

  //  table
  const tbody = document.getElementById("leaderBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    document.getElementById("emptyMsg").style.display = "block";
    return;
  }

  data.forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${player.avatar}" alt=""></td>
      <td><strong>${player.nickname}</strong></td>
      <td style="text-align:center;">${player.score}</td>
      <td style="text-align:center; font-weight:bold;">${player.percentage}%</td>
      <td style="text-align:center;"><span class="league league-${player.league}">${player.league.toUpperCase()}</span></td>
    `;
    tbody.appendChild(row);
  });
}

window.onload = renderLeaderboard;