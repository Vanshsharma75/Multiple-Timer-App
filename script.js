let timers = [];

// Add event listener for starting new timers
document.getElementById('start-timer').addEventListener('click', startTimer);

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
        const timer = {
            id: Date.now(),
            remainingTime: totalSeconds,
            interval: null,
        };
        timers.push(timer);
        displayTimer(timer);
        startCountdown(timer);
    } else {
        alert('Please set a valid time!');
    }
}

function displayTimer(timer) {
    const container = document.getElementById('timers-container');
    const timerDiv = document.createElement('div');
    timerDiv.id = `timer-${timer.id}`;
    timerDiv.classList.add('timer-item'); // Add a class for styling

    timerDiv.innerHTML = `
        <div class="timer-display">
            <span id="time-${timer.id}">${formatTime(timer.remainingTime)}</span>
        </div>
        <div class="timer-actions">
            <button class="stop-btn" onclick="stopTimer(${timer.id})">Stop Timer</button>
        </div>
    `;
    container.appendChild(timerDiv);
}

function startCountdown(timer) {
    timer.interval = setInterval(() => {
        timer.remainingTime--;

        if (timer.remainingTime <= 0) {
            clearInterval(timer.interval);
            markTimerEnded(timer);
        } else {
            document.getElementById(`time-${timer.id}`).innerText = formatTime(timer.remainingTime);
        }
    }, 1000);
}

function stopTimer(id) {
    // Find and stop the specific timer
    const timerIndex = timers.findIndex((t) => t.id === id);
    if (timerIndex > -1) {
        clearInterval(timers[timerIndex].interval);
        timers.splice(timerIndex, 1); // Remove timer from array

        // Remove the timer element from the DOM
        const timerDiv = document.getElementById(`timer-${id}`);
        if (timerDiv) {
            timerDiv.classList.add('fade-out'); // Add fade-out animation
            setTimeout(() => timerDiv.remove(), 500); // Wait for animation to finish
        }

        // If no active timers remain, clear all
        if (timers.length === 0) {
            clearAllTimers();
        }
    }
}

function clearAllTimers() {
    const container = document.getElementById('timers-container');
    container.innerHTML = ''; // Clear all active timer elements
}

function markTimerEnded(timer) {
    const timerDiv = document.getElementById(`timer-${timer.id}`);
    timerDiv.innerHTML = `<span class="timer-ended">Time's up!</span>`;
    timerDiv.classList.add('timer-ended-style'); // Style to mark as ended
    playAudioAlert();
}

function playAudioAlert() {
    const audio = new Audio('alert-sound.mp3'); // Ensure the file exists in your project
    audio.play();
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
