const senpais = ['Luka Furst', 'Marko Pozenel', 'Nikolaj Zimic', 'Igor Kononenko'];
var currentSenpai = 'Ni ga';
var currentGame = [];
var guessesLeft = 10;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function gameFinished() {
    for (var i = 0; i < currentGame.length; i++) {
        if (currentGame[i] == '_') {
            return false;
        }
    }
    return true;
}

export const vim = async (args: string[]): Promise<string> => {
    return `'vim' is so outdated. how about 'nvim'?`;
};

export const start = async (args: string[]): Promise<string> => {
    guessesLeft = 10;
    currentGame = [];
    currentSenpai = senpais[getRandomInt(senpais.length)];
    for(var i = 0; i < currentSenpai.length; i++){
        if(currentSenpai[i] == ' '){
            currentGame.push(' ');
        } else {
            currentGame.push('_');
        }
    }
    return `
You have been chosen a new senpai!
    `;
};

export const end = async (args: string[]): Promise<boolean> => {
    if (gameFinished()) {
        return true;
    } else {
        return false;
    }
};

export const newletter = async (argLetter: string[]): Promise<string> => {
    var letter = argLetter[0][0];
    //check if letter is in senpai
    var found = false;
    for(var i = 0; i < currentSenpai.length; i++){
        if(currentSenpai[i].toLowerCase() == letter){
            currentGame[i] = currentSenpai[i];
            found = true;
        }
    }

    var output = '';
    if(found){
        if(gameFinished()){
            output = 'You have won! You have hung ' + currentSenpai.split(" ")[1] + '-chan!';
        } else {
            output = `You found the letter ${letter}!`;
        }
    } else {
        guessesLeft--;
        if (guessesLeft == 0) {  
            output = "You have ran out of guesses! The senpai was " + currentSenpai + "!";
        }  else {
            output = `You didn't find the letter ${letter}! You have ${guessesLeft} guesses left.`;
        }
    }

    return `
${output}
    `;
};

export const status = async (args: string[]): Promise<string> => {
    return currentGame.join(' ');
}
