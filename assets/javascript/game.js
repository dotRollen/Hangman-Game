var wargame = {
    winsScore: 0,
    triesLeft: 12,
    lettersTried: [],
    wordBank: [
        "wargames",
        "david",
        "jennifer",
        "falken",
        "joshua",
    ],
    pressStart: false,
    newGame: false,
    loggedIn: false,
    wordPicked: "",
    wordSplitted: [],
    wordSolved: [],
    ttyText: "",
    ttyCounter: 0,
    ttySpeed: 100,
    ttyLoc: "",
    ttyWriter: function () {
        if (wargame.ttyCounter < wargame.ttyText.length) {
            document.getElementById("typedtext").innerHTML += wargame.ttyText.charAt(wargame.ttyCounter);
            wargame.ttyCounter++;
            setTimeout(wargame.ttyWriter, wargame.ttySpeed);
        }
        else {
            wargame.ttyCounter = 0;
        }
    },
    welcome: "Greetings Professor Falken...",
    shallWePlay: {
        html: `
            <div class="voice">
                <audio src="assets/media/Shall-we-play-a-game.mp3" autoplay>
                    <p>If you are reading this, it is because your browser does not support the audio element.</p>
                </audio>
            </div>
            <div class="terminal">
                <h1>&gt; <span id="typedtext"></span></h1>
                <h2>&gt; Press Y to play...<span class="blinking-cursor">|</span></h2>
            </div>
        `,
        text: "SHALL WE PLAY A GAME?...",
    },
    beginPlay: {
        html: `
            <div class="voice">
            <audio src="assets/media/Fine.mp3" autoplay>
                <p>If you are reading this, it is because your browser does not support the audio element.</p>
            </audio>
            </div>
            <div class="terminal">
                <h1>&gt; <span id="typedtext"></span></h1>
                <h2>&gt; Use letters to guess the word...</h2>
                <h1>&gt; </h1>
            </div>
        `,
        text: "FINE...",
    },
    youWin: {
        html: `
            <div class="voice">
            <audio src="assets/media/Excellent.mp3" autoplay>
                <p>If you are reading this, it is because your browser does not support the audio element.</p>
            </audio>
            </div>
            <div class="terminal">
                <h1>&gt; <span id="typedtext"></span></h1>
                <h2>&gt; You win press N to play again...</h2>
                <h1>&gt; </h1>
            </div>
        `,
        text: "EXCELLENT...",
    },
    youLose: {
        html: `
            <div class="voice">
            <audio src="assets/media/Strange-game.mp3" autoplay>
                <p>If you are reading this, it is because your browser does not support the audio element.</p>
            </audio>
            </div>
            <div class="terminal">
                <h1>&gt; <span id="typedtext"></span></h1>
                <h1>&gt; </h1>
                <h2>&gt; You lose press N to play again...</h2>
                <h1>&gt; </h1>
            </div>
        `,
        text: "STRANGE GAME... THE ONLY WINNING MOVE IS NOT TO PLAY...",
    },
    resetGame: function () {
        for (var i = 0; i < this.wordSplitted.length; i++) {
    
            var main = document.getElementById("word");
            var letterSpan = document.createElement("span");

            main.append(
                this.setAttr(letterSpan, {
                    "data-letter": i,
                    "class": "word-letter",
                })
            );
        }

        document.getElementById("tries-left").innerHTML = this.triesLeft = 12;
        document.getElementById("letters-tried").innerHTML = this.lettersTried = [];

        this.wordSolved = [];
        this.pressStart = true;
    },
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
    },
    storeGuess: function (str) {
        this.lettersTried.push(str);
        document.getElementById("letters-tried").innerHTML = this.lettersTried;
    },
    guessedTwice: function (str, array) {
        for (var i = 0; i < array.length; i++) {
            
            if (str == (array[i])) {
                return true; 
            }
        }
    },
}

window.onload = function() {
    wargame.ttyText = wargame.welcome;
    wargame.ttyWriter();
}

document.onkeyup = function (event) {

    if (wargame.pressStart) {

        if ((event.keyCode >= 65) && (event.keyCode <= 90)){
            
            if (wargame.triesLeft > 1) {
                
                var userGuess = event.key.toLowerCase();                
                var match = wargame.checkMatch(userGuess, wargame.wordSplitted);

                if (wargame.guessedTwice(userGuess, wargame.lettersTried)) {
                    return true;
                }

                else if ( match.length > 0) {
                    for (var i = 0; i < match.length; i++) {
                        var matchedDiv = document.querySelector(
                            "div.terminal-2 span[data-letter='" + match[i] + "']"
                        );
                        matchedDiv.innerHTML = wargame.wordSplitted[match[i]];
                        wargame.wordSolved.push(i)
                    }
                    wargame.storeGuess(userGuess);
                    
                    if (wargame.wordSolved.length === wargame.wordSplitted.length) {
                        wargame.winsScore++;

                        document.getElementById("wins-score").innerHTML = wargame.winsScore;
                        document.getElementById("WOPR").innerHTML = wargame.youWin.html;
                        wargame.ttyText = wargame.youWin.text;
                        wargame.ttyWriter();

                        wargame.pressStart = false;
                        wargame.newGame = true;
                    }
                }

                else {

                    wargame.triesLeft--;
                    document.getElementById("tries-left").innerHTML = wargame.triesLeft;
                    wargame.storeGuess(userGuess);
                    
                }
            }

            else {
                document.getElementById("WOPR").innerHTML = wargame.youLose.html;
                wargame.ttyText = wargame.youLose.text;
                wargame.ttyWriter();
                wargame.pressStart = false;
                wargame.newGame = true;
            }
        }
    }

    else {

        if (wargame.loggedIn == false && event.keyCode == 13) {

            document.getElementById("WOPR").innerHTML = wargame.shallWePlay.html;
            wargame.ttyText = wargame.shallWePlay.text;
            wargame.ttyWriter();
            wargame.loggedIn = true;

        }

        else {
            if ((event.keyCode == 89) && (wargame.newGame == false) ) {

                document.getElementById("WOPR").innerHTML = wargame.beginPlay.html;
                wargame.ttyText = wargame.beginPlay.text;
                wargame.ttyWriter();
                document.getElementById("score-board").removeAttribute("style");
                document.getElementById("word").innerHTML = "";

                wargame.pressStart = true;
                wargame.splitWord(wargame.pickWord());
                wargame.resetGame();
            }
            else if ((event.keyCode == 78) && (wargame.newGame)){

                document.getElementById("WOPR").innerHTML = wargame.beginPlay.html;
                wargame.ttyText = wargame.beginPlay.text;
                wargame.ttyWriter();
                document.getElementById("word").innerHTML = "";

                wargame.pressStart = true;
                wargame.splitWord(wargame.pickWord());
                wargame.resetGame();
                wargame.newGame = false;
            }
        }
    }
}