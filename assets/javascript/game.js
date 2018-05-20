var wargame = {
    //Defining all the variables for the game to use.
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
        //Slowly types out the letters from a string and recursively
        //goes back and types the next letter to simulate typing.
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
    //HTML used to replace the HTML in the element id WOPR
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
        //Resets the game to game variables but keeps the winning games
        //created a function to add attributes to the element without
        //being repatitive
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
        //Joshua... uhh the Game picks a random word to play
        //then returns the word
        this.wordPicked = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];

        return this.wordPicked;
    },
    splitWord: function (str) {
        //To allow for easy checks and generating the blank spaces on HTML
        //the word that is passed to this function is split into an array
        //of letters.
        this.wordSplitted = str.split("");
        return this.wordSplitted;
    },
    ifExist: function (key) {
        //Checks if the letter typed by the player has already been entered
        //if entered it will return a true value, otherwise null
        //helps with reducing the amount of chances the player has
        for (var i = 0; i < this.lettersTried.length; i++) {
            if (key == (this.lettersTried[i])) {
                return true; 
            }
        }
    },
    setAttr: function (elem, attrs) {
        //A helper function for adding attributes to elements with out 
        //being repetitive in the code
        for (var key in attrs) {
            elem.setAttribute(key, attrs[key]);
            elem.innerHTML = "&nbsp;";
        }
        return elem;
    },
    checkMatch: function (str, array) {
        //Checks to see if a letter typed by the player is in the array
        //the player is currently playing against. In this game that array
        //would be the obj.wordSplitted
        var indexes = [], i;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === str) indexes.push(i);
        }
        return indexes;
    },
    storeGuess: function (str) {
        //Stores the guess of the player into an array that can be wiped,
        // added to or called back when needed
        this.lettersTried.push(str);
        document.getElementById("letters-tried").innerHTML = this.lettersTried;
    },
    guessedTwice: function (str, array) {
        //Makes sure the player hasn't already used this letter
        // returns true if they did but does nothing and also prevents
        // any duplicates from being added to the obj.lettersTried array
        for (var i = 0; i < array.length; i++) {
            
            if (str == (array[i])) {
                return true; 
            }
        }
    },
}

window.onload = function() {
    //Animation for the "Greetings" first page load
    //prompts the player to press Enter
    wargame.ttyText = wargame.welcome;
    wargame.ttyWriter();
}

document.onkeyup = function (event) {

    if (wargame.pressStart) {
        //Game checks if the game is already already in motion, if it is
        //the userguesses will now be stored and matched against the 
        //program word choice
        if ((event.keyCode >= 65) && (event.keyCode <= 90)){
            //Takes only the key values of A - Z to play the game
            //better option then manually typing in every letter
            //then iterating over all the letters
            if (wargame.triesLeft > 1) {
                //Checks if the player has any tries left
                // as long as their tries are 1 or over the game will continue
                var userGuess = event.key.toLowerCase();                
                //player guess and obj.wordSplitted are sent to a function that 
                //checks if the player has any matches in the array, if it matches
                //it returns a new array with the positions that it matched as the values
                //in the array
                var match = wargame.checkMatch(userGuess, wargame.wordSplitted);
                

                if (wargame.guessedTwice(userGuess, wargame.lettersTried)) {
                    //checks if player has already guessed the letter
                    return true;
                }

                else if ( match.length > 0) {
                    //if obj.checkMatch found matches and the length is more then 0
                    // the game will then continue to add those values to the HTML
                    //the array that came back from checkMatch have values of the index 
                    //with the corresponded letter in order for obj.wordSplitted.
                    //That helps with keeping the HTML up to date and also 
                    //create a solved word array
                    for (var i = 0; i < match.length; i++) {
                        var matchedDiv = document.querySelector(
                            "div.terminal-2 span[data-letter='" + match[i] + "']"
                        );
                        matchedDiv.innerHTML = wargame.wordSplitted[match[i]];
                        wargame.wordSolved.push(i)
                    }
                    wargame.storeGuess(userGuess);
                    
                    if (wargame.wordSolved.length === wargame.wordSplitted.length) {
                        //Checks if the word has the same length as the wordSplitted
                        //if it does the game is over and the player wins
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
                    //if the player does not have a duplicate letter typed and does
                    //not have a matching guess, the player loses a chance
                    wargame.triesLeft--;
                    document.getElementById("tries-left").innerHTML = wargame.triesLeft;
                    wargame.storeGuess(userGuess);
                    
                }
            }

            else {
                //if the player has less then 1 as the tries left,
                //the game ends and the player can longer continue
                //they will have to press N to restart the game
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
            //if the player presses enter after first prompt and has not played the game
            //already condition the game prompts with some aesthetics and asks the player
            // to press Y to play the game sets the game to obj.loggedIn true so that 
            //the player does not see this html again
            document.getElementById("WOPR").innerHTML = wargame.shallWePlay.html;
            wargame.ttyText = wargame.shallWePlay.text;
            wargame.ttyWriter();
            wargame.loggedIn = true;

        }

        else {
            if ((event.keyCode == 89) && (wargame.newGame == false) ) {
                // checks if the player has not finished the first game with 
                //obj.newGame as false. obj.newGame is set to true only when
                //a player has lost or won a game. This resets the game to a
                //new game with counter variables at default and sets
                //obj.pressStart to true for the next time the player types
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
                //if a player has finished a game win/lose this condition checks
                //that it is true and will reset the game while keeping the 
                //relevant counter information
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