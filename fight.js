export const enemies = [
    {   id: 1,
        name: 'Jerry',
        avatar: './avatars/enemy1.png',
        health: 80,
        attackZones: 2,
        defenseZones: 1,
        damage: 10
    },
    {   id: 2,
        name: 'Butch',
        avatar: './avatars/enemy2.png',
        health: 120,
        attackZones: 1,
        defenseZones: 3,
        damage: 15
    },
    {   id: 3,
        name: 'Spike',
        avatar: './avatars/enemy3.png',
        health: 160,
        attackZones: 3,
        defenseZones: 2,
        damage: 20
    }
];

export let currentLevel = 0;
export const battleEnemyName = document.getElementById('battle-enemy-name');
export const enemyAvatar = document.getElementById('enemy-avatar');
export const enemyHealth = document.getElementById('enemy-health');
export const enemyHealthText = document.getElementById('enemy-health-text');
export const playerHealth = document.getElementById('player-health');
export const playerHealthText = document.getElementById('player-health-text');

export function startFight() {
    const enemy = enemies[currentLevel];
    battleEnemyName.textContent = enemy.name;
    enemyAvatar.src = enemy.avatar;
    enemyHealth.style.width = '100%';
    enemyHealthText.textContent = `${enemy.health} / ${enemy.health}`;
    playerHealth.style.width = '100%';
    playerHealthText.textContent = `100 / 100`;

    localStorage.setItem('playerHealth', 100);
    localStorage.setItem('enemyHealth', enemy.health);
    localStorage.setItem('currentLevel', currentLevel);
}

export function loadBattleState() {
    const playerHP = localStorage.getItem('playerHealth');
    const enemyHP = localStorage.getItem('enemyHealth');
    const level = localStorage.getItem('currentLevel');

    if (playerHP !== null && enemyHP !== null && level !== null) {
        currentLevel = parseInt(level);
        const enemy = enemies[currentLevel];

        const playerHealthValue = parseInt(playerHP);
        playerHealth.style.width = (playerHealthValue / 100) * 100 + '%';
        playerHealthText.textContent = `${playerHealthValue} / 100`;

        const enemyHealthValue = parseInt(enemyHP);
        enemyHealth.style.width = (enemyHealthValue / enemy.health) * 100 + '%';
        enemyHealthText.textContent = `${enemyHealthValue} / ${enemy.health}`;

        battleEnemyName.textContent = enemy.name;
        enemyAvatar.src = enemy.avatar;

        return true;
    }
    return false;
}

let selectedAttack = null;
let selectedDefense = [];

const attackZones = document.querySelectorAll('.attack-zone');
attackZones.forEach(zone => {
    zone.addEventListener('click', ()=> {
        attackZones.forEach(btn => btn.classList.remove('selected'));
        zone.classList.add('selected');
        selectedAttack = zone.dataset.zone;
        checkFightReady();
    });
})

const defenseZones = document.querySelectorAll('.defense-zone');
defenseZones.forEach(zone => {
    zone.addEventListener('click', ()=> {
        zone.classList.toggle('selected');
        const selected = document.querySelectorAll('.defense-zone.selected');

        if (selected.length > 2) {
            zone.classList.remove('selected');
        }
        selectedDefense = Array.from(document.querySelectorAll('.defense-zone.selected'))
            .map(btn => btn.dataset.zone);
            checkFightReady();
    });
})

function checkFightReady() {
    const hint = document.getElementById('battle-hint');
    const fightBtn = document.getElementById('fight-btn');

    if (!selectedAttack && selectedDefense.length < 2) {
        hint.textContent = 'Choose 1 zone to attack and 2 zones to defend';
        fightBtn.disabled = true;
    } else if (!selectedAttack) {
        hint.textContent = 'Choose 1 zone to attack';
        fightBtn.disabled = true;
    } else if (selectedDefense.length < 2) {
        hint.textContent = 'Choose 2 zones to defend';
        fightBtn.disabled = true;
    } else {
        hint.textContent = 'Ready to fight!';
        fightBtn.disabled = false;
    }
}