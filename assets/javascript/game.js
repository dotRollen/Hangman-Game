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
    wordSplitted: [],
    pickWord: function () {
        this.wordPicked = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        return this.wordPicked;
    },
    splitWord: function (word) {
        this.wordSplit = word.split("");
        return this.wordSplit;
    },
    ifExist: function (key) {
        for (var i = 0; i < this.lettersTried.length; i++) {
            if (key == (this.lettersTried[i])) {
                return true; 
            }
        }
    },
    setAttr: function (elem, attrs) {
        for (var key in attrs) {
            elem.setAttribute(key, attrs[key]);
            elem.innerHTML = "&nbsp;";
        }
        return elem;
    },
}

document.onkeyup = function (event) {
    
    if (wargame.pressStart) {

        if ((event.keyCode >= 65) && (event.keyCode <= 90)){
            if (triesLeft >= 1) {

                var userGuess = event.key.toLowerCase();

                for (var i = 0; i < wargame.wordSplitted; i++) {
                    
                    if (userGuess == wargame.wordSplitted[i]) {
                        
                    }
                }
            }

            else {
                alert("Game over man!")
            }
        }
    }

    else {

        if (event.keyCode == 13) {
            
            wargame.splitWord(wargame.pickWord());

            document.getElementById("word").innerHTML = "";

            for (var i = 0; i < wargame.wordSplitted.length; i++) {

                var main = document.getElementById("word");
                var letterSpan = document.createElement("span");

                main.append(
                    wargame.setAttr(letterSpan, {
                        "data-letter": wargame.wordSplitted[i],
                        "class": "word-letter",
                    })
                );
            }

            document.getElementById("tries-left").innerHTML = wargame.triesLeft = 12;
            document.getElementById("letters-tried").innerHTML = wargame.lettersTried = [];

            wargame.pressStart = true;
        }
    }
}