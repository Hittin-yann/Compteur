'use strict'

//Namesqpace
let compteur = {
    modules: {}
};

//Module Affichage du compteur
compteur.modules.affichage = (function() {
    let interval;
    let targetDate = new Date("2024-06-14 20:00:00"); // Date cible
    return {
        //Fonction d'initialisation
        start: () => {
          console.log("Affichage du compteur !");
          if (Cookies.get("title") && Cookies.get("targetDate")) {
            console.log("Cookie check !");
            compteur.modules.affichage.setTitle(Cookies.get("title"));
            compteur.modules.affichage.setTargetDate(new Date(Cookies.get("targetDate")));
          }
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
            compteur.modules.evenement.start();
            // compteur.modules.widthDivs.start();
          }else{
            // Update the display with proper pluralization for days
            compteur.modules.affichage.updateDisplay(days, hours, minutes, seconds);
            document.querySelector('#cancel').addEventListener('click', (e) => {
              e.preventDefault();
              Cookies.remove('title');
              Cookies.remove('targetDate');
              // Refresh the page
              location.reload();
            });
          }

          // compteur.modules.affichage.clue(days, hours);
        },
        updateDisplay: (days, hours, minutes, seconds) => {
          document.querySelector("#compteur").innerHTML = `
            J-${days} <span class="separator">jour${days >= 2 ? 's' : ''}</span>
            ${compteur.modules.affichage.formatTime(hours)}:${compteur.modules.affichage.formatTime(minutes)}:${compteur.modules.affichage.formatTime(seconds)}
            <br /><button id='cancel'>Annulé Événement</button>`;
        },
        formatTime: (timeValue, padLength = 2, padChar = '0') => {
          return timeValue.toString().padStart(padLength, padChar);
        },
        // clue: (days, hours) => {
        //   if (days == 0 & hours < 23) {
        //     document.getElementById("compteur").innerHTML += 
        //     "<br /> Mystère n°1 : 🎮 🟢"+
        //     "<br /> Mystère n°2 : ❤️ 📖 🌐 myself"
        //   }
        // },
        setTargetDate: (newTargetDate) => {
          targetDate = newTargetDate;
        },
        setTitle: (newTitle) => {
          document.querySelector("h1").innerText = newTitle;
        }
    }
})();

//Module pour le renouvellement de l'évenement pour le compteur
compteur.modules.evenement = (function() {
    return {
      //Fonction d'initialisation
      start: () => {
        console.log("Gestion des evenements !");
        document.querySelector("#evenement").style.display = "block";
        document.forms["evenement"].addEventListener("submit", compteur.modules.evenement.getValueForms);
      },
      createdBr: (formConteneur) => {
        const br = document.createElement('br');
        formConteneur.appendChild(br);
      },
      getValueForms: (event) => {
        event.preventDefault();
        document.querySelector("#modal").style.display = "block";

        document.querySelector("#ouiModal").addEventListener("click", (e) => {
          e.preventDefault();

          let title = document.forms["evenement"].titrePage.value;
          let dateTime = document.forms["evenement"].dateTime.value;

          compteur.modules.affichage.setTitle(title);
          compteur.modules.affichage.setTargetDate(new Date(dateTime));

          Cookies.set('title', title);

          Cookies.set('targetDate', dateTime);

          document.forms["evenement"].reset();
          compteur.modules.affichage.start();

          document.querySelector("#modal").style.display = "none";
          document.querySelector("#evenement").style.display = "none";
        });
        document.querySelector("#nonModal").addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector("#modal").style.display = "none";
        });
      }
    }
})();

//Module qui gére la taille des div
// compteur.modules.widthDivs = (function() {
//   const maDiv = document.querySelector('#evenement');
//   const enfants = maDiv.querySelectorAll(':scope > *'); // Sélectionner tous les enfants directs de la div
//   return {
//     //Fonction d'initialisation
//     start: () => {
//       console.log("Gestion de la taille des divs");
//       let largeurMax = 0;
//       for (const enfant of enfants) {
//         const largeurEnfant = enfant.offsetWidth;
//         if (largeurEnfant > largeurMax) {
//           largeurMax = largeurEnfant;
//         }
//       }

//       maDiv.style.width = (largeurMax + 50) + 'px';
//     }
//   }
// })();

//Chargement des fonctions des exercices du module
window.addEventListener('load', () => {
    compteur.modules.affichage.start();
});