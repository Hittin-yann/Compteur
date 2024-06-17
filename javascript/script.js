'use strict'

//Namesqpace
let compteur = {
    modules: {}
};

//Module Affichage du compteur
compteur.modules.affichage = (function() {
    let interval;
    const targetDate = new Date("2024-06-25 20:00:00"); // Date cible
    return {
        //Fonction d'initialisation
        start: () => {
          console.log("Affichage du compteur !");
          interval = setInterval(compteur.modules.affichage.countdown, 1000); // Update every second
        },
        countdown: () => {
          document.querySelector("#compteur").innerHTML = ""; // clean compteur

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
            document.querySelector("#compteur").innerHTML = "C'est l'heure ! ";
          }else{
            // Update the display with proper pluralization for days
            compteur.modules.affichage.updateDisplay(days, hours, minutes, seconds);
          }

          compteur.modules.affichage.clue(days, hours);
        },
        updateDisplay: (days, hours, minutes, seconds) => {
          document.querySelector("#compteur").innerHTML = `
            J-${days} <span class="separator">jour${days >= 2 ? 's' : ''}</span>
            ${compteur.modules.affichage.formatTime(hours)}:${compteur.modules.affichage.formatTime(minutes)}:${compteur.modules.affichage.formatTime(seconds)}
            `;
        },
        formatTime: (timeValue, padLength = 2, padChar = '0') => {
          return timeValue.toString().padStart(padLength, padChar);
        },
        clue: (days, hours) => {
          if (days == 0 & hours < 23) {
            document.getElementById("compteur").innerHTML += 
            "<br /> Mystère n°1 : 🎮 🟢"+
            "<br /> Mystère n°2 : ❤️ 📖 🌐 myself"
          }
        }
    }
})();

//Chargement des fonctions des exercices du module
window.addEventListener('load', () => {
    compteur.modules.affichage.start();
});