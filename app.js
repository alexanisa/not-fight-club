const nameInput = document.getElementById('player-name-input');
const registrationBtn = document.getElementById('register-button');
const registrationScreen = document.getElementById('registration-screen');
const mainScreen = document.getElementById('main-screen');
const playerNameDisplay = document.getElementById('player-name-display');
const startFightBtn = document.getElementById('start-fight-btn');
const resetBtn = document.getElementById('reset-btn');

const characterNameDisplay = document.getElementById('character-name-display');
const playerAvatar = document.getElementById('player-avatar');
const winsDisplay = document.getElementById('wins-display');
const lossesDisplay = document.getElementById('losses-display');
const avatarBtns = document.querySelectorAll('.avatar-btn');
const backToMainBtn = document.getElementById('back-to-main-from-character');
const navButtons = document.querySelectorAll('.nav-btn');
const characterScreen = document.getElementById('character-screen');

const nameSetting = document.getElementById('settings-name-input');
const saveSettingsBtn = document.querySelector('.save-btn');
const backFromSettingsBtn = document.querySelector('.back-btn');
const settingsCurrentNameDisplay = document.getElementById('settings-current-name-display');

const backFromBattleBtn = document.getElementById('back-to-main-from-battle');

import { startFight, loadBattleState, getWins } from "./fight.js";

function showMainScreen() {
    document.getElementById('registration-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    showScreen('main-screen');
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
        localStorage.removeItem('playerHealth');
        localStorage.removeItem('enemyHealth');
        localStorage.removeItem('currentLevel');
        showMainScreen();
    } else {
        alert('Please enter your name');
    }
});

resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all data?')) {
        localStorage.removeItem('playerName');
        localStorage.removeItem('playerAvatar');
        localStorage.removeItem('playerWins');
        localStorage.removeItem('playerLosses');
        document.getElementById('app').style.display = 'none';
        document.getElementById('registration-screen').style.display = 'block';
        location.reload();
    }
});

export function showScreen(screenId) {
    document.querySelectorAll('#app > section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
    let app = document.getElementById('app');
    if (screenId === 'battle-screen') {
        app.classList.add('full-width');
    } else {
        app.classList.remove('full-width');
    }
}

navButtons.forEach(btn => {
    btn.addEventListener('click', ()=> {
        let screen = btn.dataset.screen;
        if (screen === 'main') {
            showScreen('main-screen');
        } else if (screen === 'character') {
            showScreen('character-screen');
            updateCharacterScreen();
        } else if (screen === 'settings') {
            showScreen('settings-screen');
            updateSettingScreen();
        } else if (screen === 'battle') {
            showScreen('battle-screen');
        }
    });
})

function updateCharacterScreen() {
    let name = localStorage.getItem('playerName') || 'Unknown';
    let avatar = localStorage.getItem('playerAvatar') || './avatars/avatar1.png';
    let wins = getWins();

    characterNameDisplay.textContent = name;
    playerAvatar.src = avatar;
    document.getElementById('battle-avatar').src = avatar;

    let totalWins = Object.values(wins).reduce((a, b) => a + b, 0);
    winsDisplay.textContent = totalWins;
    lossesDisplay.textContent = localStorage.getItem('playerLosses') || 0;

    let winsList = document.getElementById('wins-list');
    if (winsList) {
        winsList.innerHTML = '';
        for (let [enemy, count] of Object.entries(wins)) {
            let li = document.createElement('li');
            li.innerHTML = `${enemy}: <span class="win-count">${count}</span>`;
            winsList.appendChild(li);
        }
    }
}

backToMainBtn.addEventListener('click', ()=> {
    showScreen('main-screen');
})

avatarBtns.forEach(avatarBtn => {
    avatarBtn.addEventListener('click', ()=> {
        let avatarCh = avatarBtn.dataset.avatar;
        playerAvatar.src = avatarCh;
        localStorage.setItem('playerAvatar', avatarCh);

        avatarBtns.forEach(btn => btn.classList.remove('active'));
        avatarBtn.classList.add('active');
        document.getElementById('battle-avatar').src = avatarCh;
    })
})

function updateSettingScreen() {
    settingsCurrentNameDisplay.textContent = localStorage.getItem('playerName');
    nameSetting.value = localStorage.getItem('playerName');
}

saveSettingsBtn.addEventListener('click', ()=> {
    let newName = nameSetting.value.trim();
    if (newName) localStorage.setItem('playerName', newName);
    updateSettingScreen();
    playerNameDisplay.textContent = newName;
})

backFromSettingsBtn.addEventListener('click', ()=> {
    showScreen('main-screen');
})

function hasSavedBattle() {
    return localStorage.getItem('playerHealth') !== null;
}

startFightBtn.addEventListener('click', ()=> {
    if (hasSavedBattle()) {
        if (confirm('You have a battle in progress. Continue?')) {
            loadBattleState();
            showScreen('battle-screen');
        } else {
            localStorage.removeItem('playerHealth');
            localStorage.removeItem('enemyHealth');
            localStorage.removeItem('currentLevel');
            startFight();
            showScreen('battle-screen');
        }
    } else {
        startFight();
        showScreen('battle-screen');
    }
})

backFromBattleBtn.addEventListener('click', () => {
    showScreen('main-screen');
});
