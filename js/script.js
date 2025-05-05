// === GÉNÉRATION D’UN MOT ALÉATOIRE ===
function getRandomEasy() {
    const wordsRandomEasy = wordsList5[Math.floor(Math.random() * wordsList5.length)];
    return wordsRandomEasy; 
}

let word = getRandomEasy(); // Mot à deviner
// console.log("Mot random :", word);

// === CRÉATION DU CLAVIER ALPHABÉTIQUE ===
function createAlphabet() {
    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    const alphabetElement = document.getElementById('alphabet');
    const containerAlphabet = document.createElement('div');
    containerAlphabet.id = 'container-alphabet';
    alphabetElement.appendChild(containerAlphabet); 

    // Crée un bouton pour chaque lettre
    alphabet.forEach(letter => {
        const buttonLettre = document.createElement('button');
        buttonLettre.innerText = letter;

        buttonLettre.addEventListener('click', () => {
            // console.log("Lettre cliquée :", letter);  
            comparaison(letter, buttonLettre); 
        });

        containerAlphabet.appendChild(buttonLettre);
    });
}

createAlphabet();

// === VARIABLES DE JEU ===
let createLocations = [];       // Emplacements visuels des lettres à deviner
let nombreErreur = [];          // Lettres incorrectes jouées
let motTrouve = [];             // Tableau booléen pour chaque lettre trouvée
let lettresTrouvees = [];       // Lettres correctes trouvées
let lettresUtilisees = [];      // Lettres déjà cliquées

// === AFFICHAGE DES EMPLACEMENTS DE LETTRES ===
for (let i = 0; i < word.length; i++) {
    let emplacementMot = document.getElementById('affichagemot');
    let createLocation = document.createElement('div');
    createLocation.innerText = "_";
    createLocation.style.padding = "15px";

    createLocations.push(createLocation);
    emplacementMot.appendChild(createLocation);
    motTrouve.push(false); // À chaque index, la lettre n'est pas encore trouvée
}

// console.log(createLocations);

// === FONCTION PRINCIPALE : TRAITEMENT DES CLICS DE LETTRE ===
function comparaison(letter, button) {

    // Ignore si déjà utilisée
    if (lettresUtilisees.includes(letter)) return;

    lettresUtilisees.push(letter);

    // Désactive visuellement le bouton
    button.style.backgroundColor = '#d3d3d3';
    button.style.color = '#a9a9a9';

    if (word.includes(letter)) {
        
        // console.log("Lettre identique trouvée");

        // Affiche la lettre à chaque bonne position
        word.split('').forEach((char, index) => {
            if (char === letter) {
                // console.log(`Lettre ${letter} trouvée à l’index ${index}`);
                createLocations[index].innerText = letter;
                motTrouve[index] = true;
                lettresTrouvees.push(letter);
            }
        });

    } else {
        // console.log("Lettre incorrecte");
        nombreErreur.push(letter); // Enregistre l'erreur
        // console.log("nombre erreur ", nombreErreur);

        // Affiche l'image correspondante à l'erreur
        let pendu = document.getElementById('containerpendu');
        let imageIndex = nombreErreur.length;
        let imagePath = `../assets/decoupe/0${imageIndex}.png`;

        let imageElement = document.createElement('img');
        imageElement.src = imagePath;
        pendu.appendChild(imageElement);
    }

    // === CONDITION DE VICTOIRE ===
    if (motTrouve.every(valeur => valeur === true)) {
        // console.log("Vous avez gagné !");
        setTimeout(() => {
            document.getElementById('gagne').classList.add('show');
        }, 500);
        setTimeout(() => {
            document.getElementById('gagne').classList.remove('show');
        }, 2500);
        document.getElementById('container-alphabet').style.display = 'none';
    }

    // === CONDITION DE DÉFAITE ===
    if (nombreErreur.length === 13) {
        document.getElementById('perdu').classList.add('show');
        setTimeout(() => {
            document.getElementById('perdu').classList.remove('show');
        }, 2500);
        document.getElementById('container-alphabet').style.display = 'none';
    }
}
