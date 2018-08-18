/* *******************************
 * Global Variables
 ******************************* */
const three = document.querySelector('.three');
const two = document.querySelector('.two');
const one = document.querySelector('.one');
let cardArray = ['<li class="card"><i class="fa fa-diamond"></i></li>', '<li class="card"><i class="fa fa-diamond"></i></li>', '<li class="card"><i class="fa fa-paper-plane-o"></i></li>', '<li class="card"><i class="fa fa-paper-plane-o"></i></li>', '<li class="card"><i class="fa fa-anchor"></i></li>', '<li class="card"><i class="fa fa-anchor"></i></li>', '<li class="card"><i class="fa fa-bolt"></i></li>', '<li class="card"><i class="fa fa-bolt"></i></li>', '<li class="card"><i class="fa fa-cube"></i></li>', '<li class="card"><i class="fa fa-cube"></i></li>', '<li class="card"><i class="fa fa-leaf"></i></li>', '<li class="card"><i class="fa fa-leaf"></i></li>', '<li class="card"><i class="fa fa-bicycle"></i></li>', '<li class="card"><i class="fa fa-bicycle"></i></li>', '<li class="card"><i class="fa fa-bomb"></i></li>', '<li class="card"><i class="fa fa-bomb"></i></li>']
let starshtml = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
let deckUl = document.querySelector('.deck');
let cardslis = document.querySelector('ul');
let listItem = deckUl.getElementsByTagName('li');
let allCards = document.querySelectorAll('.card');
let finalstars = document.getElementById('finalstars');
let matchedCards = [];
let openCardList = [];
let moves = 0;
let movesCounter = document.querySelector('.moves');
let milliseconds = 0;
let h1 = document.getElementById('timerplace1'),
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;
let h2 = document.getElementById('timerplace2');
let nummoves = document.getElementById('nummoves');
let nummoves2 = document.getElementById('nummoves2');
h1.textContent = 'Timer: ' + "00:00:00";
h2.textContent = "00:00:00";
nummoves.textContent = '';
nummoves2.textContent = 'Number of moves: ';
seconds = 0;
minutes = 0;
hours = 0;
finalstars.innerHTML = starshtml;
timer();
//console.log(cardArray);
/* *******************************
 * Functions Related to Resetting the Game
 ******************************* */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// RESET THE GAME IF SOMEONE CLICKS REFRESH BUTTON ON MAIN SCREEN
const refreshButton = document.querySelector('.fa-repeat');
refreshButton.addEventListener('click', function() {
    deckUl.innerHTML = cardArray.join('');
    shuffledarray = shuffle(cardArray);
    //RESET TIMER
    clearTimeout(t);
    h1.textContent = "00:00:00";
    h2.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    // RESTART TIME
    timer();
    //RESET RATINGS
    starshtml = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    one.style.visibility = 'visible';
    two.style.visibility = 'visible';
    three.style.visibility = 'visible';
    moves = 0;
nummoves.textContent = '';
nummoves2.textContent = 'Number of moves: ';
});

// RESET THE GAME IF SOMEONE CLICKS REFRESH BUTTON IN MODAL

const refreshButton2 = document.querySelector('.restart2');
refreshButton2.addEventListener('click',function(){
    modal.style.display = "none";
    deckUl.innerHTML = cardArray.join('');
    shuffledarray = shuffle(cardArray);
    //RESET TIMER
    clearTimeout(t);
    h1.textContent = "00:00:00";
    h2.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    // RESTART TIME
    timer();
    //RESET RATINGS
    starshtml = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    one.style.visibility = 'visible';
    two.style.visibility = 'visible';
    three.style.visibility = 'visible';
    moves = 0;
nummoves.textContent = '';
nummoves2.textContent = 'Number of moves: ';
});
/* *******************************
 * Game Play Functions
 ******************************* */
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function respondToTheClick(evt) {
     console.log(evt.target.className);
    //console.log('inside click');
    //console.log(openCardList);
    if (openCardList.length === 0) {
        if (evt.target.nodeName === 'LI') {
            //console.log('inside if 0' + evt.target);
            //console.log('open card list:');
            //console.log(openCardList);
            openCardList.push(evt.target);
            evt.target.classList.add('open');
            evt.target.classList.add('show');
            firstcard = evt.target;
        }
        rating();
        stars();

    } else if (openCardList.length === 1) {
        //console.log('matching card list: ');
        //console.log(matchedCards);
        if (evt.target.nodeName === 'LI') {
            //If it's an open card don't increment moves
            
            if(evt.target.className.includes('open')){

        nummoves.textContent = moves;
        nummoves2.textContent = 'Number of moves: ' + moves;

    } else{
openCardList.push(evt.target);
                    moves++;
        nummoves.textContent = moves;
        nummoves2.textContent = 'Number of moves: ' + moves;
}
            evt.target.classList.add('open');
            evt.target.classList.add('show');
            //console.log('inside if 1' + evt.target);
            

            //console.log('open card list:');
            //console.log(openCardList);
            //console.log(openCardList[0].innerHTML)
            if (openCardList[0].innerHTML == openCardList[1].innerHTML) {
                //  console.log('inside matching condition');
                //    console.log(matchedCards);
                openCardList[0].classList.add("match");
                openCardList[1].classList.add("match");
                matchedCards.push(openCardList[0], openCardList[1]);
                openCardList = [];
                //console.log('open card list:');
                //console.log(openCardList);
                firstcard = '';
                if (matchedCards.length === 16) {
                    clearTimeout(t);
                    modal.style.display = "block";
                }
            } else {
                setTimeout(function() {
                    evt.target.classList.remove('open', 'show');
                    firstcard.classList.remove('open', 'show');
                    //console.log('inside else - ');
                    //console.log('open card list');
                    //console.log(openCardList);
                    //console.log('matched card list');
                    //console.log(matchedCards);
                    firstcard = '';
                    openCardList = [];
                }, 2000);
            }
        }
        rating();
        stars();
        console.log('stars' + starshtml);
        console.log('moves' + moves);
    }
}
deckUl.addEventListener('click', respondToTheClick);
/* *******************************
 * Game Rating and Notifications
 ******************************* */
function stars() {
    if (moves < 10) {
        starshtml = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        finalstars.innerHTML = starshtml;
    } else if (moves >= 10 && moves < 15) {
        starshtml = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        finalstars.innerHTML = starshtml;
    } else {
        starshtml = '<li><i class="fa fa-star"></i></li>';
        finalstars.innerHTML = starshtml;
    }
}

function rating() {
    if (moves === 10) {
        three.style.visibility = 'hidden';
        console.log('moves = 10');
    } else if (moves === 15) {
        two.style.visibility = 'hidden';
        console.log('moves = 15')
    } else if (moves === 20) {
        one.style.visibility = 'hidden';
        console.log('moves = 20')
    }
}
/* *******************************
 * Pop-up Modal
 ******************************* */
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal 
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    deckUl.innerHTML = cardArray.join('');
    shuffledarray = shuffle(cardArray);
    //RESET TIMER
    clearTimeout(t);
    h1.textContent = 'Timer: ' + "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    moves = 0;
    nummoves.textContent = '';
nummoves2.textContent = 'Number of moves: ';
    // RESTART TIME
    timer();
    //RESET RATINGS
    starshtml = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    one.style.visibility = 'visible';
    two.style.visibility = 'visible';
    three.style.visibility = 'visible';
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        deckUl.innerHTML = cardArray.join('');
        shuffledarray = shuffle(cardArray);
        //RESET TIMER
        clearTimeout(t);
        h1.textContent = 'Timer: ' + "00:00:00";
        seconds = 0;
        minutes = 0;
        hours = 0;
        moves = 0;
        nummoves.textContent = '';
nummoves2.textContent = 'Number of moves: ';
        // RESTART TIME
        timer();
        //RESET RATINGS
        starshtml = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        one.style.visibility = 'visible';
        two.style.visibility = 'visible';
        three.style.visibility = 'visible';
    }
}
/* *******************************
 * Stopwatch
 ******************************* */
//create a function to stop the time 
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h1.textContent = 'Timer: ' + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}