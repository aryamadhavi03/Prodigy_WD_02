let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    let totalHundredths = Math.floor(ms / 10);
    let hundredths = totalHundredths % 100;
    let totalSeconds = Math.floor(totalHundredths / 100);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
}

function updateDisplay() {
    const now = Date.now();
    const timePassed = now - startTime + elapsedTime;
    display.textContent = formatTime(timePassed);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapTimes = [];
    display.textContent = '00:00:00:00';
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const now = Date.now();
        const lapTime = now - startTime + elapsedTime;
        lapTimes.push(lapTime);
        displayLapTimes();
    }
}

function displayLapTimes() {
    lapsContainer.innerHTML = lapTimes.map((time, index) => {
        return `<div class="lap-time">Lap ${index + 1}: ${formatTime(time)}</div>`;
    }).join('');
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
