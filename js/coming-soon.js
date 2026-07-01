const launchDate = "2026-07-31T23:59:59-03:00";

const countdown = document.querySelector(".countdown");
const countdownFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown(targetDate) {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdown.hidden = true;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownFields.days.textContent = pad(days);
  countdownFields.hours.textContent = pad(hours);
  countdownFields.minutes.textContent = pad(minutes);
  countdownFields.seconds.textContent = pad(seconds);
}

if (launchDate) {
  const targetDate = new Date(launchDate).getTime();

  if (!Number.isNaN(targetDate)) {
    countdown.hidden = false;
    updateCountdown(targetDate);
    setInterval(() => updateCountdown(targetDate), 1000);
  }
}

