var wargame = {
    winsScore: 0,
    triesLeft: 10,
    lettersTried: [],
    wordBank: [
        "wargames",
        "David",
        "Jennifer",
    ],
    pressStart: false,
    wordPicked: "",
    wordSplit: [],
    pickWord: function(){
        this.wordPicked = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        console.log("I chose this word " + this.wordPicked)
        return this.wordPicked;
    },
    splitWord: function(word){
        this.wordSplit = word.split("")
        console.log("Word is now split as " + this.wordSplit)
    },
    ifExist: function(key) {
        for (var i = 0; i < this.lettersTried.length; i++) {
            if (key == (this.lettersTried[i])) {
                return true; 
            }
        }
    },
}

document.onkeyup = function(event) {
    


    if (wargame.pressStart) {

        if ((event.keyCode >= 65) && (event.keyCode <= 90)){
            if (triesLeft >= 1) {
                var userGuess = event.key.toLowerCase();
            }

            else {
                alert("Game over!");
            }
            
            var userGuess = event.key.toLowerCase();

        }
    }
    else {

        if (event.keyCode == 13) {
            
            wargame.splitWord(wargame.pickWord());

            document.getElementById("tries-left").innerHTML = wargame.triesLeft = 12;
            document.getElementById("letters-tried").innerHTML = wargame.lettersTried = [];

            //wargame.pressStart = true;
        }
    }
}