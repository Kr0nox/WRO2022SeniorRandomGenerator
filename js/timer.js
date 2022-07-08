let timerStart = 120;
let curTimer = timerStart;
let timerRunning = false;

let timerText = document.getElementById("Timer");
let timerButton = document.getElementById("TimerControlButton");
let curInterval = -1;

function timerButtonPressed() {
    if (curTimer <= 0) {
        reset();
    } else {
        timerRunning = !timerRunning;
        if (timerRunning) {
            if (curTimer >= timerStart) {
                // Countdown
            }
            curInterval = setInterval(timer, 1000);
        } else {
            window.clearInterval(curInterval);
        }
    }

    updateTimerButton();
}

function timer() {
    curTimer = curTimer - 1;
    setTimer();

    if (curTimer <= 0 || !timerRunning) {
        // Timer is done
        timerRunning = false;
        window.clearInterval(curInterval);
        updateTimerButton();
    }
}

function reset() {
    generate();
    timerRunning = false;
    curTimer = timerStart;
    setTimer()
    updateTimerButton()
}

function updateTimerButton() {
    if (curTimer <= 0) {
        timerButton.style.visibility = "hidden";
    } else {
        timerButton.style.visibility = "visible";
        if (timerRunning) {
            timerButton.textContent = "STOP";
            timerButton.style.backgroundColor = "#b00"
        } else {
            timerButton.textContent = "START";
            timerButton.style.backgroundColor = "#080"
        }
    }
}

function setTimer() {
    timerText.textContent = getMinutes(curTimer) + ":" + getSeconds(curTimer);
}

function getMinutes(time) {
    return Math.floor(time / 60).toString();
}

function getSeconds(time) {
    let sec = time % 60;
    return sec < 10 ? "0" + sec.toString() : sec.toString();
}
