// Change this date to your planned launch date.
const launchDate = new Date("December 31, 2026 20:00:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const distance = launchDate - now;

    const ids = ["days", "hours", "minutes", "seconds"];

    if (distance <= 0) {
        ids.forEach(id => document.getElementById(id).textContent = "00");
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
