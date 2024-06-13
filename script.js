const targetDate = new Date("2024-06-14 20:00:00"); // Date cible (ici le 14 juin 2024 à 20h)

const countdown = () => {
  document.getElementById("compteur").innerHTML = ""; // clean compteur

  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  // Calculate remaining days (consider target date crossing midnight)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Calculate remaining time in milliseconds
  const remainingTime = diff % (1000 * 60 * 60);

  // Calculate remaining hours considering minutes and seconds
  // const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60)) - (days * 24);

  // Optimized calculation of remaining minutes and seconds
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  if (diff <= 0) {
    clearInterval(interval);
    document.getElementById("compteur").innerHTML = "C'est l'heure ! ";
  }else{
    // Update the display with proper pluralization for days
    document.getElementById("compteur").innerHTML = `
    J-${days} <span class="separator">jour${days >= 2 ? 's' : ''}</span>
    ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
    `;
  }

  clue(days, hours);
};

function clue (days, hours) {
  if (days == 0 & hours < 23) {
    document.getElementById("compteur").innerHTML =+ 
    "<br /> Mystère n°1 : 🎮"+
    "<br /> Mystère n°2 : ❤️ 📖 🌐"
  }
}

const interval = setInterval(countdown, 1000); // Update every second