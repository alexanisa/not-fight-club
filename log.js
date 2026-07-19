export function addLogEntry(message, type = '') {
    const logEntries = document.getElementById('log-entries');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = message;
    logEntries.appendChild(logEntry);
    logEntries.scrollTop = logEntries.scrollHeight;
}