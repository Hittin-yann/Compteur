const targetDate = new Date("2024-06-14 20:00:00"); // Date cible (ici le 14 juin 2024 à 20h)

const countdown = () => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  // Calculate remaining days (consider target date crossing midnight)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Optimized calculation of remaining hours, minutes, and seconds
  const remainingTime = diff % (1000 * 60 * 60);
  let hours = Math.floor(remainingTime / (1000 * 60 * 60));
  if (hours == 0) {
    hours = 23;
  }
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // Update the display with proper pluralization for days
  document.getElementById("compteur").innerHTML = `
    J-${days} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (diff <= 0) {
    clearInterval(interval);
    document.getElementById("compteur").innerHTML = "C'est l'heure ! ";
  }
};

const interval = setInterval(countdown, 1000); // Update every second