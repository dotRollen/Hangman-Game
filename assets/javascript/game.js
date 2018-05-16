// Set the score number variables and "Guesses so far" array.
var wargame = {
    winsScore: 0,
    triesLeft: 10,
    lettersGuessed: [],
    // Set array from A to Z for the computer to guess.
    letterBank: [
        "a", "b", "c", "d", "e", 
        "f", "g", "h", "i", "j", 
        "k", "l", "m", "n", "o", 
        "p", "q", "r", "s", "t", 
        "u", "v", "w", "x", "y", 
        "z"
    ],
    wordBank: [
        "wargames",
        "David",
        "Jennifer",
    ],
    choseWord: function(array){
        var computerChoice = array[Math.floor(Math.random() * array.length)];
    },
    ifExist: function(param, array) {
        for (var i = 0; i < array.length; i++) {
            if (param == (array[i])) {
                return true; 
            }
        }
    },
}

document.onkeyup = function(event) {
    
    //Creates a variable to store the key the player has pressed.
    var userGuess = event.key.toLowerCase();
    console.log(userGuess)
}