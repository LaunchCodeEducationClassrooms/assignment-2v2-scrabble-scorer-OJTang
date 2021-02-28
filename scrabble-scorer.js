// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${Number(pointValue)}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let illegalCharaters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '^', '&', '*', '\(', '\)', '?', '_', '-', '+', '=', '\\', '/', '.', ',', '\`', '~', ':', '\;', '[', ']', '|', '{', '}'];

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ");
     for (j = 0; j < illegalCharaters.length; j++) {
       if (word.includes(illegalCharaters[j])) {
         console.log('Invalid input. Try again.')
         initialPrompt();
       }
    }
    return word;
};


let simpleScore = function(word) {
  let score = 0;
  score = word.length;
  return `Points for \"${word}\": ${Number(score)}.`
};

let vowelBonusScore = function(word) {
  word  = word.toLowerCase();
  let score = 0;
  for (i = 0; i < word.length; i++) {
    if (word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u' || word[i] === 'y') {
      score = score + 3;
    } else {
      score = score + 1;
    }
  }
  return `Points for \"${word}\": ${Number(score)}.`;
};




	

const scoringAlgorithms = [{
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: 'A function with a parameter for user input that returns a score.'
}, 

{
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: 'A function that returns a score based on the number of vowels and consonants.'
},

{
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: 'Uses the scrabbleScore() function to determine the score for a given word.'
}];

function scorerPrompt(initialPrompt) {
  let algoInput = input.question(`0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  Enter 0, 1, or 2: `)

  if (algoInput === '0') {

    console.log(simpleScore(initialPrompt));

  } else if (algoInput === '1') {
    
    console.log(vowelBonusScore(initialPrompt));

  } else if (algoInput === '2') {

    console.log(scrabbleScore(initialPrompt));
  } else {
    console.log('Invalid number. Try again.')
    scorerPrompt();
  }
}

let newObject = {};

function transform(object) {
  for (key in object) {
    for (i = 0; i < object[key].length; i++) {
    if (key === '1') {
      newObject[object[key][i].toLowerCase()] = 1;
    } else if (key  === '2') {
      newObject[object[key][i].toLowerCase()] = 2;
      } else if (key === '3') {
          newObject[object[key][i].toLowerCase()] = 3;
        } else if (key === '4') {
          newObject[object[key][i].toLowerCase()] = 4;
        } else if (key === '5') {
          newObject[object[key][i].toLowerCase()] = 5;
        } else if (key === '8') {
          newObject[object[key][i].toLowerCase()] = 8;
        } else if (key === '10') {
          newObject[object[key][i].toLowerCase()] = 10;
        }
      }
    }
  return newObject;
}
    
let newPointStructure = transform(oldPointStructure);

newPointStructure[' '] = 0;


let scrabbleScore = function(word) {
	word = word.toLowerCase();
	let score = 0;
 for (key in newPointStructure)   {
    for (i = 0; i < word.length; i++) {
    if (key === word[i]) {
       score = score + newPointStructure[key];
      }
    }
  }
	return `Points for \"${word}\": ${Number(score)}.`;
}

function runProgram() {
   return scorerPrompt(initialPrompt());
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

