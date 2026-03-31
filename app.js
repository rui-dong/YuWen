let dataObj = {};
let words = [];
let index = 0;
let results = [];

// 读取数据
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    dataObj = data.data;
  });

// 开始练习
function start() {
  let grade = document.getElementById("grade").value.trim();
  let semester = document.getElementById("semester").value.trim().toUpperCase();
  let lesson = document.getElementById("lesson").value.trim();

  if (!dataObj[grade] || !dataObj[grade][semester] || !dataObj[grade][semester][lesson]) {
    alert("找不到该课");
    return;
  }

  words = [...dataObj[grade][semester][lesson]["识字"]];
  shuffle(words);

  index = 0;
  results = [];

  // 切换界面
  document.getElementById("inputArea").style.display = "none";
  document.getElementById("practiceArea").style.display = "block";
  document.getElementById("resultArea").style.display = "none";

  showWord();
}

// 显示字
function showWord() {
  document.getElementById("word").innerText = words[index];
}

// 记录结果
function mark(correct) {
  results.push({
    char: words[index],
    correct: correct
  });

  index++;

  if (index >= words.length) {
    showResults();
  } else {
    showWord();
  }
}

// 显示统计
function showResults() {
  document.getElementById("practiceArea").style.display = "none";
  document.getElementById("resultArea").style.display = "block";

  let html = "<h2>结果</h2>";

  results.forEach(r => {
    html += `
      <div class="charBox">
        <div>${r.char}</div>
        <div>${r.correct ? "✔" : "✘"}</div>
      </div>
    `;
  });

  html += "<p>按回车返回</p>";

  document.getElementById("resultArea").innerHTML = html;
}

// 回车控制
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    // 如果在结果页 → 返回首页
    if (document.getElementById("resultArea").style.display === "block") {
      reset();
    }
  }
});

// 重置
function reset() {
  document.getElementById("inputArea").style.display = "block";
  document.getElementById("practiceArea").style.display = "none";
  document.getElementById("resultArea").style.display = "none";
}

// 洗牌
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
