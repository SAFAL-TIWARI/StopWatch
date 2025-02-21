let startStopBtn = document.getElementById('startStopBtn');
let lapBtn = document.getElementById('lapBtn');
let resetBtn = document.getElementById('resetBtn');
let display = document.getElementById('display');
let lapsContainer = document.getElementById('laps');

let stopwatchInterval;
let elapsedTime = 0;
let running = false;
let startTime = 0;

startStopBtn.addEventListener('click', function () {
    if (running) {
        clearInterval(stopwatchInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    } else {
        startTime = Date.now() - elapsedTime; // Track elapsed time correctly
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10ms
        startStopBtn.textContent = 'Stop';
        running = true;
    }
    // running = !running;
});

lapBtn.addEventListener('click', function () {
    if (running) {
        let lapTime = display.textContent;
        let lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
});

resetBtn.addEventListener('click', function () {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    display.textContent = '00:00:00:00';
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
    running = false;
});

function updateStopwatch() {

    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(unit) {
    return String(unit).padStart(2, '0');
}
// function padMilliseconds(unit) {
//     return String(unit).padStart(2, '0'); // Ensure 2-digit milliseconds
// }