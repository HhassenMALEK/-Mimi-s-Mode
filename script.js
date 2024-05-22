
console.log("Hello Extension")

//c'est une fonction qui permet de selectionner un texte.
function getUserSelection() {

  //utilisation de la methode getSelection() qui permet de selectionner un texte et le type en string
  const selection = window.getSelection().toString();
  if (selection) {

    console.log("selection", selection);

    //appel la fonction encode pour traduire le text selectionné en code morse.
    const translation = encode(selection)

    //appel de la fonction insertHtmlAfterSelection pour afficher le code morse traduit.
    insertHtmlAfterSelection (window.getSelection(), translation);
  }
}

document.addEventListener("mouseup", getUserSelection);

// Source de la fonction insertHtmlAfterSelection: https://stackoverflow.com/questions/3597116/insert-html-after-a-selection

function insertHtmlAfterSelection(selectionObject, translation) {
  let range;
  let expandedSelRange;

  // une condition if qui permet a se positionner a la fin du texte sélectionné.
  if (selectionObject.getRangeAt && selectionObject.rangeCount) {
    
    //prend le text ainsi que le html associé
      range = selectionObject.getRangeAt(0);
      
      console.log("test Range", range)
    //se positionner à la fin du text selectionné
      range.collapse(false);

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)

      //création de l'élément div qui contiendra la traduction
      const el = document.createElement("div");

      //affectation du code html + le style + la traduction
      el.innerHTML = `<span style="color: #CC6633;">[Morse: ${translation} ]</span>`;
      
      //insertion de l'elelement dans la page
      let frag = document.createDocumentFragment();
      
      console.log(el)
      
      let node;
      let lastNode;
      //parcourir le text selectionné
      while ((node = el.firstChild)) {
        // le node va devenir l'enfant de frag
          lastNode = frag.appendChild(node);
      }
      //inserer le fragment dans la plage
      range.insertNode(frag);

      // Effaccer l'ancienne traduction.
      selectionObject.empty();
      console.log(translation)
  }
}

//Code morse


function getLatinCharacterList(phrase) {
  return phrase.split("");
}

function encode(phrase) {
  let latinToMorse = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
      'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
      'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
      '6': '-....', '7': '--...', '8': '---..', '9': '----.',
      '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
      '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
      '$': '...-..-', '@': '.--.-.',
      'À': '.--.-', 'Ä': '.-.-', 'Æ': '.-.-', 'Ç': '-.-..', 'É': '..-..', 'È': '.-..-', 'Ö': '---.', 'Ü': '..--',
      'ß': '...--..', 'Ñ': '--.--', 'Ź': '--..-', ' ': ' '
  };

  // Convertir la phrase en majuscules
  phrase = phrase.toUpperCase();

  let morseCode = "";

  for (let i = 0; i < phrase.length; i++) {
      let lettre = phrase[i];

      // Vérifier si la lettre est dans l'objet latinToMorse
      if (lettre in latinToMorse) {
          // Ajouter le code à la lettre
          morseCode += latinToMorse[lettre] + ' ';
      } else {
          // ajout d'un espace Si la lettre n'est pas dans l'objet,
          morseCode += " ";
      }
  }
  // Retirer les espaces à la fin et au début
  console.log(morseCode)
  return morseCode.trim();

}