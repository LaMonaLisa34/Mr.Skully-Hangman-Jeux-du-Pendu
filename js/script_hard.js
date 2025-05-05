// MOT RANDOM
function getRandomEasy() {
    const wordsRandomEasy = wordsList12[Math.floor(Math.random() * wordsList12.length)];
    return wordsRandomEasy; 
}
let word = getRandomEasy();
console.log("Mot random :", word);

// ALPHABET
function createAlphabet() {
    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    
    // DOM ALPHABET
    let alphabetElement = document.getElementById('alphabet');
    const containerAlphabet = document.createElement('div');
    containerAlphabet.id = 'container-alphabet';
    alphabetElement.appendChild(containerAlphabet); 

    // CHAQUE LETTRE BOUTON
    alphabet.forEach(letter => {
        const buttonLettre = document.createElement('button');
        buttonLettre.innerText = letter;

        buttonLettre.addEventListener('click', () => {
            console.log("Lettre cliquée :", letter);  
            comparaison(letter, buttonLettre);
        });

        containerAlphabet.appendChild(buttonLettre);
    });
}

createAlphabet();

let createLocations = []; 
let nombreErreur = [];
let motTrouve = [];  
let lettresTrouvees = [];
let lettresUtilisees = []; 

// EMPLACEMENT MOT
for (let i = 0; i < word.length; i++) {
    let emplacementMot = document.getElementById('affichagemot');
    let createLocation = document.createElement('div');
    createLocation.innerText = "_";
    createLocation.style.padding = "7px";
    createLocations.push(createLocation);
    emplacementMot.appendChild(createLocation);
    motTrouve.push(false);
}

console.log(createLocations);

function comparaison(letter, button) {
    // Vérifier si la lettre a déjà été utilisée
    if (lettresUtilisees.includes(letter)) {
        return; 
    }
    // lettre utilisé dans letter
    lettresUtilisees.push(letter);  

    // Griser le bouton 
    button.style.backgroundColor = '#d3d3d3'; 
    button.style.color = '#a9a9a9'; 

    // verification lettre dans mot
    if (word.includes(letter)) {
        console.log("Lettre identique trouvée");

        // Parcourir le mot pour voir où se trouve la lettre
        word.split('').forEach((char, index) => {

            // si trouvé mettre à jout l'emplacement correspondant
            if (char === letter) {
                console.log("Lettre", letter, "trouvée à l'index", index);
                createLocations[index].innerText = letter;
                motTrouve[index] = true; // position come trouvé
                lettresTrouvees.push(letter); // push dans lettrestrouve
            }
        });

    } else {
        console.log("Lettre incorrecte");

        // erreur à jour dans tableau
        nombreErreur.push(letter);
        console.log("nombre erreur ", nombreErreur);

        // affichage image pendu
        let pendu = document.getElementById('containerpendu');
        let imageIndex = nombreErreur.length;  
        let imagePath = `../assets/decoupe/0${imageIndex}.png`;  
        console.log(imagePath);

        let imageElement = document.createElement('img');
        imageElement.src = imagePath;

        pendu.appendChild(imageElement);
    }

    // GAGNE
    if (motTrouve.every(valeur => valeur === true)) {
        console.log("Vous avez gagné !");
        setTimeout(() => {
            document.getElementById('gagne').classList.add('show');
        }, 500);

        setTimeout(() => {
            document.getElementById('gagne').classList.remove('show');
        }, 2500);

        document.getElementById('container-alphabet').style.display = 'none'; 
    }

    // PERDU
    if (nombreErreur.length === 13) {
        document.getElementById('perdu').classList.add('show');

        setTimeout(() => {
            document.getElementById('perdu').classList.remove('show');
        }, 2500);

        document.getElementById('container-alphabet').style.display = 'none'; 
    }
}

