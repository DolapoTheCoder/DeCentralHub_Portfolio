const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
let currentDate = new Date();
let prayerData = JSON.parse(localStorage.getItem('prayerData')) || {};

const achievements = [
    { name: "First Prayer", description: "Complete your first prayer", condition: (stats) => stats.totalPrayers >= 1 },
    { name: "Daily Devotion", description: "Complete all prayers in a day", condition: (stats) => stats.maxDaily === 5 },
    { name: "Week of Worship", description: "Maintain a 7-day streak", condition: (stats) => stats.currentStreak >= 7 },
    { name: "Fortnight of Faith", description: "Maintain a 14-day streak", condition: (stats) => stats.currentStreak >= 14 },
    { name: "Ramadan Warrior", description: "Complete 100 prayers", condition: (stats) => stats.totalPrayers >= 100 },
    { name: "Ramadan Champion", description: "Complete all prayers for 30 days", condition: (stats) => stats.daysTracked >= 30 && stats.totalPrayers >= 150 }
];

function updateDate() {
    document.getElementById('date-display').textContent = currentDate.toDateString();
}

function createPrayerTracker() {
    const tracker = document.getElementById('prayer-tracker');
    tracker.innerHTML = '';
    prayers.forEach(prayer => {
        const div = document.createElement('div');
        div.className = 'prayer-item';
        div.innerHTML = `
            <span>${prayer}</span>
            <input type="checkbox" id="${prayer.toLowerCase()}" onchange="updatePrayerStatus('${prayer.toLowerCase()}')">
        `;
        tracker.appendChild(div);
    });
    loadPrayerStatus();
}

function updatePrayerStatus(prayer) {
    const dateString = currentDate.toDateString();
    prayerData[dateString] = prayerData[dateString] || {};
    prayerData[dateString][prayer] = document.getElementById(prayer).checked;
    localStorage.setItem('prayerData', JSON.stringify(prayerData));
    updateStats();
}

function loadPrayerStatus() {
    const dateString = currentDate.toDateString();
    const dayData = prayerData[dateString] || {};
    prayers.forEach(prayer => {
        document.getElementById(prayer.toLowerCase()).checked = dayData[prayer.toLowerCase()] || false;
    });
    updateStats();
}

function updateStats() {
    const stats = calculateStats();
    document.getElementById('streak').textContent = stats.currentStreak;
    document.getElementById('max-streak').textContent = stats.maxStreak;
    document.getElementById('daily-completed').textContent = stats.dailyCompleted;
    document.getElementById('daily-progress').style.width = `${(stats.dailyCompleted / 5) * 100}%`;
    document.getElementById('total-prayers').textContent = stats.totalPrayers;
    document.getElementById('days-tracked').textContent = stats.daysTracked;
    updateAchievements(stats);
}

function calculateStats() {
    const stats = {
        currentStreak: 0,
        maxStreak: 0,
        dailyCompleted: 0,
        totalPrayers: 0,
        daysTracked: 0,
        maxDaily: 0
    };

    let currentStreak = 0;
    const sortedDates = Object.keys(prayerData).sort((a, b) => new Date(b) - new Date(a));

    sortedDates.forEach((date, index) => {
        const dayData = prayerData[date];
        const completedToday = Object.values(dayData).filter(Boolean).length;

        stats.totalPrayers += completedToday;
        stats.daysTracked++;
        stats.maxDaily = Math.max(stats.maxDaily, completedToday);

        if (completedToday > 0) {
            currentStreak++;
            if (index === 0) {
                stats.currentStreak = currentStreak;
            }
        } else {
            currentStreak = 0;
        }

        stats.maxStreak = Math.max(stats.maxStreak, currentStreak);
    });

    const today = currentDate.toDateString();
    stats.dailyCompleted = Object.values(prayerData[today] || {}).filter(Boolean).length;

    return stats;
}

function updateAchievements(stats) {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';

    achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = `${achievement.name}: ${achievement.description}`;
        li.className = achievement.condition(stats) ? 'unlocked' : 'locked';
        achievementsList.appendChild(li);
    });
}

function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    updateDate();
    loadPrayerStatus();
}

function initializePrayerTracker() {
    updateDate();
    createPrayerTracker();
    document.getElementById('prev-day').addEventListener('click', () => changeDate(-1));
    document.getElementById('next-day').addEventListener('click', () => changeDate(1));
}

initializePrayerTracker();
