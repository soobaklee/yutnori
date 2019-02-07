// /*----- constants -----*/ 

const sticks = {
    back: {
        video: "video/back.m4v",
        points: -1,
        retoss: false
    },
    doh: {
        video: 'video/doh.m4v',
        points: 1,
        retoss: false
    },
    geh: {
        video: 'video/geh.m4v',
        points: 2,
        retoss: false,
    },
    guhl: {
        video: 'video/guhl.m4v',
        points: 3,
        retoss: false,
    },
    yut: {
        video: 'video/yut.m4v',
        points: 4,
        retoss: true
    },
    moh: {
        video: 'video/moh.m4v',
        points: 5,
        retoss: true
    }
}
const playLookup = ['back', 'doh', 'geh', 'guhl', 'yut', 'moh'];

const gameboard = ['item01', 'item02', 'item03', 'item04', 'item05', 'item06', 'item07', 'item08', 'item09', 'item10', 'item11', 'item12', 'item13', 'item14', 'item15', 'item16', 'item17', 'item18', 'item19', 'item20'];

const p1Disabled = document.querySelector('#play1').disabled;
const p2Disabled = document.querySelector('#play2').disabled;

const p1Life = document.querySelector('#p1 h1');
const p2Life = document.querySelector('#p2 h1');

// /*----- app's state (variables) -----*/ 
let tossResults, points, livesCompleted, playerResult;
var p1, p2;
let playerTurn = p1;
let p1Points = [];
let p2Points = [];
let p1LivesCompl = [];
let p2LivesCompl = [];
let p1GamePosition = [];
let p2GamePosition = [];
let vid = document.getElementById('stick-toss');


// /*----- cached element references ----*/ 
//Stick play for each player
let p1TossResult = document.querySelector('#stick-toss');
let p2TossResult = document.querySelector('#stick-toss');


// /*----- event listeners -----*/ 
//Tossing the sticks
document.querySelector('#play1').addEventListener('click', p1Toss, p1Retoss);
document.querySelector('#play1').removeEventListener('click', p1TossEnd);
document.querySelector('#play2').addEventListener('click', p2Toss, p2Retoss);
document.querySelector('#play2').removeEventListener('click', p2TossEnd);


// /*----- functions -----*/



function render() {
    // playPause();
    // p1Toss();
    // p1Retoss();
    // p2Toss();
    // p2Retoss();
}

function randomToss() {
    return playLookup[Math.floor(Math.random() * 6)];
}

function b1Red() {
    document.getElementById('play1').style.border = '5px solid red';
    return;
}

function b2Blue() {
    document.getElementById('play2').style.border = '5px solid blue';
    return;
}

function p1Toss() {
    playerResult = randomToss();   
    console.log(document.querySelector('#stick-toss').src = sticks[playerResult].video);
    vid.autoplay = true;

    p1Points.push(sticks[playerResult].points);
    
    p1GamePosition = (`${gameboard[(p1Points.reduce(function (acc, a) {
        return acc + a;
    }, 0)-1)]}`);

    if (`${p1GamePosition}` === `${p2GamePosition}`) {
        $('.p1Position').removeClass('p1Position');
        $(`#${p1GamePosition}`).addClass('p1Position');
        p2Points = [];
        $('.p2Position').removeClass('p2Position');
        // $(`#${p1GamePosition}`).addClass('samePosition').addClass('p1Position');
    } else {
        $('.p1Position').removeClass('p1Position');
        // $('.p2Position').removeClass('samePosition');
        $(`#${p1GamePosition}`).addClass('p1Position');
    }

    if (p1Points.reduce(function(acc, a) {return acc + a;}, 0) > 20) {

        document.querySelector('aside h1').innerHTML = 'Player 1 has completed a life!';
        //use toggle on off for this sentence
        p1LivesCompl.push(1);
        document.querySelector('#play1 span').innerHTML = p1LivesCompl.reduce(function(acc, a) {
            return acc + a;
        }, 0);
        p1Points = [];
    }
    
    if (p1LivesCompl.reduce(function(acc, a) {
        return acc + a
        }, 0) === 2) {
        document.querySelector('header h1').innerHTML = "Player 1 Wins!!";
        document.querySelector('header h1').style.color = 'red';
        document.querySelector('aside h1').innerHTML = "Player 1 Wins!!";
        document.querySelector('aside h1').style.color = 'red';
        document.querySelector('#play1').disabled = true;
        document.querySelector('#play2').disabled = true;
    } else {
        document.querySelector('#play1').disabled = true;
        p1Retoss();
    }

}

function p1TossEnd() {
    document.querySelector('#play1').disabled = true;
    document.querySelector('#play1').style.border = '2px solid white';
    document.querySelector('#play2').disabled = false;
    document.querySelector('#play2').style.border = '5px solid blue';
}

function p1Retoss() {
    (playerResult === 'moh' || playerResult === 'yut') ? (
    (document.querySelector('#play1').disabled = false) && 
    p1Toss()) :
        p1TossEnd();
}

function p2Toss() {
    playerResult = randomToss();
    console.log(document.querySelector('#stick-toss').src = sticks[playerResult].video);
    // playVideo();
    p2Points.push(sticks[playerResult].points);
    p2GamePosition = (`${gameboard[(p2Points.reduce(function (acc, a) {
        return acc + a;
    }, 0)-1)]}`);

    if (`${p2GamePosition}` === `${p1GamePosition}`) {
        $('.p2Position').removeClass('p2Position');
        $(`#${p2GamePosition}`).addClass('p2Position');
        p1Points = [];
        $('.12Position').removeClass('p1Position');
        // $(`#${p2GamePosition}`).addClass('samePosition').addClass('p2Position');
    } else {
        $('.p2Position').removeClass('p2Position');
        // $('.p1Position').removeClass('samePosition');
        $(`#${p2GamePosition}`).addClass('p2Position');
    }

    if (p2Points.reduce(function(acc, a) {
        return acc + a;
        }, 0) > 20) {
        document.querySelector('aside h1').innerHTML = 'Player 2 has completed a life!';
        //use toggle on off for this sentence
        p2LivesCompl.push(1);
        document.querySelector('#play2 span').innerHTML = (p2LivesCompl.reduce(function(acc, a) {
            return acc + a
        }, 0));
        p2Points = [];
    }
    if (p2LivesCompl.reduce(function(acc, a) {
        return acc + a
        }, 0) === 2) {
        document.querySelector('header h1').innerHTML = 'Player 2 Wins!!';
        document.querySelector('header h1').style.color = 'blue';
        document.querySelector('aside h1').innerHTML = 'Player 2 Wins!!';
        document.querySelector('aside h1').style.color = 'blue';
        document.querySelector('#play1').disabled = true;
        document.querySelector('#play2').disabled = true;
    } else { 
        document.querySelector('#play2').disabled = true;
        document.querySelector('#play2').style.border = '5px solid blue';
        p2Retoss();
    }
}

function p2TossEnd() {
    document.querySelector('#play2').disabled = true;
    document.querySelector('#play2').style.border = '2px solid white';
    document.querySelector('#play1').disabled = false;
    document.querySelector('#play1').style.border = '5px solid red';
}
function p2Retoss() {
    
    if (playerResult === 'moh' || playerResult === 'yut') {
        (document.querySelector('#play2').disabled = false) &&
        p2Toss();
    } else {
        p2TossEnd();
    }
}

function playVideo() {
        sticks[playerResult].video.play();
    //     else sticks.PlayerResults.video.pause();
    }





























// Move player's piece "x" number of spaces
// Log lives completed for each player


// Pseudocode

// P1 tosses 4 sticks (button to toss)
// Sticks fall in random order
// P1 earns points from the toss
// One of P1's lives moves "x" number of spaces
// P2 tosses sticks
// Sticks fall in random order
// P2 earns points
// One of P2's lives moves "x" number of spaces
// If one of the player's lives moves past the other player's life, 
// the other player's life returns t     1. Face (rounded edge)
// o beginning position
// P1 and P2 continue to take turns tossing sticks
// Once a life returns to starting position, that life becomes a "point"

// Play & Point System:
// Sticks have 3 sides:
//     1. Face (flat edge)
//     2. Back (rounded edge)
//     3. Side (will require re-toss)
// DO - If sticks land 3 back-side up & 1 face-side up, token moves 1 position
// GAE - If sticks land 2 back-side and 2 face up, token moves 2 places
// GUHL - If sticks land 1 back-side and 3 face up, token moves 3 places
// YUUT - If sticks land 4 face up, token moves 4 positions && bonus throw triggers
// MOH - If sticks land 4 backside up, token can move 5 places && bonus throw triggers
// RE-TOSS - If one or more sticks land on side


// Dependent on Time:
//     1. If one player's life token passes another player's life token- other player's life token returns to beginning position
//     2. Score board will be a rectangle with a large horizontal X
//     3. If player's token lands on a corner of the original rectangle board, player can choose to move across gameboard diagonally
//     4. Player can choose to "piggy back" on another one of their tokens to move more than 1 life at one Time
