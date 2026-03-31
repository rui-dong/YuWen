let dataObj = {};
let words = [];
let index = 0;

// 加载数据
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    dataObj = data;
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

  // 取识字表
  words = [...dataObj[grade][semester][lesson]["识字"]];

  // 打乱顺序
  shuffle(words);

  index = 0;
  showWord();
}

// 显示当前字
function showWord() {
  if (words.length === 0) return;

  document.getElementById("word").innerText = words[index];
}

// 回车切换
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    nextWord();
  }
});

function nextWord() {
  if (words.length === 0) return;

  index++;

  if (index >= words.length) {
    // 全部完成 → 重新打乱
    shuffle(words);
    index = 0;
  }

  showWord();
}

// 洗牌算法（随机顺序核心）
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
