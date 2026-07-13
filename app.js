const nameInput = document.getElementById('player-name-input');
const registrationBtn = document.getElementById('register-button');
const registrationScreen = document.getElementById('registration-screen');
const mainScreen = document.getElementById('main-screen');
const playerNameDisplay = document.getElementById('player-name-display');
const startFightBtn = document.getElementById('start-fight-btn');
const resetBtn = document.getElementById('reset-btn');

function showMainScreen() {
    registrationScreen.style.display = 'none';
    mainScreen.style.display = 'block';
    playerNameDisplay.textContent = localStorage.getItem('playerName');
}

const savedName = localStorage.getItem('playerName');
if (savedName) {
    showMainScreen();
}

registrationBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('playerName', name);
        showMainScreen();
    } else {
        alert('Please enter your name');
    }
});

startFightBtn.addEventListener('click', () => {
    console.log('New fight started!');
});

resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all data?')) {
        localStorage.removeItem('playerName');
        localStorage.removeItem('playerAvatar');
        localStorage.removeItem('playerWins');
        localStorage.removeItem('playerLosses');

        location.reload();
    }
});