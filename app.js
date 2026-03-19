// Firebase読み込み
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyBDo5is2nLnfGXV3Hofp3UB3_B3v06XZOY",
  authDomain: "quantum-entrance.firebaseapp.com",
  projectId: "quantum-entrance",
  storageBucket: "quantum-entrance.firebasestorage.app",
  messagingSenderId: "918925262335",
  appId: "1:918925262335:web:040ce8ba290f0c94febbca",
  measurementId: "G-18QGTLM0MX"
};


// Firebase初期化
const app = initializeApp(firebaseConfig);


// Authentication
const auth = getAuth(app);


// Firestore
const db = getFirestore(app);


// Googleログイン
window.login = async function(){

  const provider = new GoogleAuthProvider();

  try{

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    document.getElementById("loginBtn").style.display = "none";

    document.getElementById("welcome").innerText =
    "今日も頑張りましょう " + user.displayName + " さん 🌸";

    generateTodayMessage();

  }catch(error){

    alert("ログイン失敗");
    console.error(error);

  }

}


// タイマー
let timerStart = null;
let timerRunning = false;
let interval;


// タイマー開始
window.startTimer = function(){

  if(timerRunning) return;

  timerStart = Date.now();

  timerRunning = true;

  interval = setInterval(updateTimer,1000);

};


// タイマー表示更新
function updateTimer(){

  let diff = Date.now() - timerStart;

  let minutes = Math.floor(diff / 60000);

  let seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("timer").innerText =
  minutes + " min " + seconds + " sec";

}


// タイマー停止
window.stopTimer = function(){

  if(!timerRunning) return;

  clearInterval(interval);

  timerRunning = false;

  timerStart = null;

};


//タイマーリセット
window.resetTimer = function(){

  clearInterval(interval);

  timerRunning = false;

  timerStart = null;

  document.getElementById("timer").innerText = "0 min 0 sec";

}

//勉強記録
window.recordStudy = function(){

  let timerText = document.getElementById("timer").innerText;

  let subject = document.getElementById("subject").value;

  let today = new Date().toLocaleDateString();

  console.log(today + " " + subject + " " + timerText);

  alert("記録しました！");

}

//グラフ表示
const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Math', 'Physics', 'Chemistry'],
    datasets: [{
      label: 'Study Time (min)',
      data: [30, 20, 10],
    }]
  }
});

// 科目リスト
let subjects = [];


// 初期化
window.onload = function(){

loadSubjects();

};


// 科目を読み込む
function loadSubjects(){

const saved = localStorage.getItem("subjects");

if(saved){
subjects = JSON.parse(saved);
}else{
subjects = ["数学","電磁気","量子"];
}

updateSubjectUI();

}


// UI更新
function updateSubjectUI(){

const select = document.getElementById("subject");

select.innerHTML = "";

subjects.forEach(sub => {

const option = document.createElement("option");

option.value = sub;
option.text = sub;

select.appendChild(option);

});

}


// 科目追加
window.addSubject = function(){

const input = document.getElementById("newSubject");

const newSub = input.value.trim();

if(newSub === "") return;

subjects.push(newSub);

localStorage.setItem("subjects", JSON.stringify(subjects));

updateSubjectUI();

input.value = "";

};
