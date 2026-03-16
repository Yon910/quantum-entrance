let timerStart=null
let timerRunning=false
let interval

window.startTimer=function(){

if(timerRunning) return

timerStart=Date.now()

timerRunning=true

interval=setInterval(updateTimer,1000)

}

function updateTimer(){

let diff=Date.now()-timerStart

let minutes=Math.floor(diff/60000)

let seconds=Math.floor((diff%60000)/1000)

document.getElementById("timer").innerText=

minutes+" min "+seconds+" sec"

}

window.stopTimer=function(){

if(!timerRunning) return

clearInterval(interval)

timerRunning=false

timerStart=null

}
