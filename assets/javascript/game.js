var wargame = {
    winsScore: 0,
    triesLeft: 10,
    lettersGuessed: [],
    wordBank: [
        "wargames",
        "David",
        "Jennifer",
    ],
    pressStart: false,
    choseWord: function(array){
        var computerChoice = array[Math.floor(Math.random() * array.length)];
        return computerChoice;
    },
    ifExist: function(string, array) {
        for (var i = 0; i < array.length; i++) {
            if (string == (array[i])) {
                return true; 
            }
        }
    },
    
}

document.onkeyup = function(event) {
    
    if (wargame.pressStart())
        if ((event.keyCode >= 65) && (event.keyCode <= 90)){

            if (triesLeft >= 1) {
                var userGuess = event.key.toLowerCase();
            }

            else {
                alert("Game over!");
            }
            
            var userGuess = event.key.toLowerCase();

        }
    else {
        alert("Game starting...");
    }

}