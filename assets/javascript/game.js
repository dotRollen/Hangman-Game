var wargame = {
    winsScore: 0,
    triesLeft: 12,
    lettersTried: [],
    wordBank: [
        "wargames",
        "david",
        "jennifer",
    ],
    pressStart: false,
    wordPicked: "",
    wordSplitted: [],
    pickWord: function () {
        this.wordPicked = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];

        return this.wordPicked;
    },
    splitWord: function (word) {
        this.wordSplitted = word.split("");
        return this.wordSplitted;
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
    checkMatch: function (str, array) {
        var indexes = [], i;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === str) indexes.push(i);
        }
        return indexes;
    }
}

document.onkeyup = function (event) {
    
    if (wargame.pressStart) {

        if ((event.keyCode >= 65) && (event.keyCode <= 90)){
            if (wargame.triesLeft >= 1) {
                
                var userGuess = event.key.toLowerCase();
                wargame.lettersTried.push(userGuess);
                document.getElementById("letters-tried").innerHTML = wargame.lettersTried;
                var match = wargame.checkMatch(userGuess, wargame.wordSplitted);

                if ( match.length > 0) {
                    for (var i = 0; i < match.length; i++) {
                        var matchedDiv = document.querySelector(
                            "div.score-board span[data-letter='" + match[i] + "']"
                        );
                        matchedDiv.innerHTML = wargame.wordSplitted[match[i]];
                    }
                }

                else {

                    wargame.triesLeft--;
                    document.getElementById("tries-left").innerHTML = wargame.triesLeft;
                    
                }

                //var match = document.querySelector("div.score-board span[data-letter='" + i + "']");
                //match.innerHTML = wargame.wordSplitted[i];
            }

            else {
                alert("Game over man!");
                wargamer.pressStart = false;
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
                        "data-letter": i,
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