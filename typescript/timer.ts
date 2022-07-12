let timerStart : number = 120;
let curTimer : number = timerStart;
let timerRunning : boolean = false;

let timerText : HTMLElement = document.getElementById("Timer");
let timerButton : HTMLElement = document.getElementById("TimerControlButton");
let curInterval : number = -1;

reset();

function timerButtonPressed() : void {
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

function timer() : void {
    curTimer = curTimer - 1;
    setTimer();

    if (curTimer <= 0 || !timerRunning) {
        // Timer is done
        timerRunning = false;
        window.clearInterval(curInterval);
        updateTimerButton();
    }
}

function reset() : void {
    //generate();
    window.clearInterval(curInterval);
    timerRunning = false;
    curTimer = timerStart;
    setTimer()
    updateTimerButton()
}

function updateTimerButton() : void {
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

function setTimer() : void {
    timerText.textContent = getMinutes(curTimer) + ":" + getSeconds(curTimer);
}

function getMinutes(time:number) : string {
    return Math.floor(time / 60).toString();
}

function getSeconds(time:number) : string {
    let sec = time % 60;
    return sec < 10 ? "0" + sec.toString() : sec.toString();
}
