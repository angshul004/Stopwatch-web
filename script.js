let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapCounter = 1;

const display = document.querySelector('.timer-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapTimes');

//format time
function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000));
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return (
        (hours < 10 ? '0' : '') + hours + ' : ' +
        (minutes < 10 ? '0' : '') + minutes + ' : ' +
        (seconds < 10 ? '0' : '') + seconds + ' . ' +
        (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds
    );
}

// Start button
startButton.addEventListener('click', function () {
    if (isRunning) {
        return;
    }
    
    isRunning = true;
    startTime = Date.now() - elapsedTime;

    intervalId = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);

    startButton.disabled = true;  
    pauseButton.disabled = false;
    lapButton.disabled = false;   
});

// Pause button
pauseButton.addEventListener('click', function () {
    if (!isRunning) {
        return;
    }
    
    isRunning = false;
    clearInterval(intervalId);
    
    pauseButton.disabled = true; 
    startButton.disabled = false;
});

// Reset button
resetButton.addEventListener('click', function () {
    clearInterval(intervalId); 
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00 : 00 : 00 . 000'; 
    lapList.innerHTML = '';
    lapCounter = 1;

    startButton.disabled = false; 
    pauseButton.disabled = true;
    lapButton.disabled = true;
});

// Lap button
lapButton.addEventListener('click', function () {
    if (!isRunning) {
        return;
    }

    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
});

pauseButton.disabled = true;
lapButton.disabled = true;
