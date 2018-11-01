// Globals

let toggledTheCards = []; 
let moves = 0;
let clockOff = true; 
let time = 0;
let clockId;
let matched = 0;
const pairs = 8
resetCards();  

/*
- First I need to listen for clicks by using a query selector in order to store all the values in a variable.
- Use const because I don't plan to reassign new values to a variable
- All the cards have a class name of .card
- Now to Create a list that holds all of the cards
 */

 /*
 const AllTheCards = document.querySelectorAll('.card');
 console.log(AllTheCards); 
 */

 // Got back a NodeList of all of the cards

 // Need to loop throught each card individually to add an event listener 
 // The for...of statement creates a loop iterating over NodeList or Array-like objects
 // addEventListener will let us listen for events and respond to them

 /*
 for (let card of AllTheCards) {
     card.addEventListener('click', function() {
        console.log("I am a card")
     }); 
 }
 */

 // Use event delegation because too many event handlers to all perform the same function
 // event.target gives us direct access to the deck

 // Select the parent element with a class of deck
 
 const deck = document.querySelector('.deck'); 

 // Add an event listener but now use classList to get the class of the event target (deck)
 
 deck.addEventListener('click', function(event){
    const clickTarget = event.target;
    // don't want the array to toggle or push a new card after the lenght of 2
    // use array .lenght property and && (AND operator evaluates to TRUE if entire expression evaluates to true)
    if (isClickValid(clickTarget)) {
        if (clockOff) { // add conditional check withing click handler after getting valid click - starts time function 
            startClock();
            clockOff = false; 
        }
        toggleTheCards(clickTarget);
        pushToggleCards(clickTarget);
        if (toggledTheCards.length === 2) {
            checkForMatch(clickTarget);
            makingMoves(); 
            starScore(); 
        }
        // The first click will toggle the card and add it to the array 
        // The second click will toggle the card and add it to the array
        // but because array now has a .lenght of 2 it will pass the conditional of You have 2 cards
        //The .includes Array method takes an array and returns a true of false value of the elements existence within the array.
    }
 }); 

 function isClickValid(clickTarget) {
    return (
    clickTarget.classList.contains('card') && 
    !clickTarget.classList.contains('match') && //check that the target does NOT contain the class of match 
    toggledTheCards.length < 2 && 
    !toggledTheCards.includes(clickTarget) // toggledTheCards array not include the clickTarget
    ); 
 }; 

 // Now to flip the cards we use the .toggle method (just replace with the .contains)
 // The classes applied to the cards are .open .show .match 
 // Create a new function and add to click listener

 /*
 function toggleTheCards(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
 }; 
 */
 
 function toggleTheCards(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
 }; 
 
 // Now we must add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // To do that we must store the cards in an Array 
 // Create a variable and declare it in the global scope with empty array and push cards into it
 // Use push() method to add elements to the end of an array

 // let toggledTheCards = []; added to Globals 
 
 // Create a new function which will the push clickTarget into the toggledTheCards array  

 function pushToggleCards(clickTarget) {
    toggledTheCards.push(clickTarget);
    console.log(toggledTheCards);
 };

 // Only want 2 cards added to the array and after a match need to clear the array
 // Now we need to check for a match 
 // Need to check if the first and second index of the toggledTheCards are the same
 // Each list item in the HTML has a child of i = that contains the icon
 // The firstElementChild contains the i element we looking for
 // The i then contains the className
 // Take all information and apply to the checkForMatch function
 // .firstElementChild will always return the first element
 // Call the function to the event handler 
 // Now we need to toggle the .match class on both elements and then reset the array again
 // If not a match we need to reset the array and toggle off the cards
 // setTimeOut() will run at a point later in time
 // Allows us to see both cards for a brief period of time 1000ms 
 // Only want unique card clicks
 // Want the clickTarget to only be toggled and added to toggledTheCards array IF it doesn’t already exist in that array

 function checkForMatch() {
    if (toggledTheCards[0].firstElementChild.className ===
        toggledTheCards[1].firstElementChild.className
        ){
            toggledTheCards[0].classList.toggle('match');
            toggledTheCards[1].classList.toggle('match');
            toggledTheCards = []; 
            // Calling the modal
            matched++;
            if (matched === pairs) {
                gameOver();
            }
        } else {
            setTimeout(function() { 
                toggleTheCards(toggledTheCards[0]);
                toggleTheCards(toggledTheCards[1]);
                toggledTheCards = [];
            }, 1000); 
        }
 };

 // Now to shuffle the cards
 // The elements to be shuffled are the list items (li) inside the deck element
 // Pass an argument into the shuffle function and store result in a new variable : cardsThatBeenShuffled
 // The shuffle function uses an array and needs to mutate/change that array before returning it 
 // A NodeList is a immutable object meaning it can't be changed 
 // Use Array.from() method to create a new copied array from the NodeList

 /* function shufflingTheDeck() {
     const cardsToShuffleInDeck = Array.from(document.querySelectorAll('.deck li'));
     console.log('Cards to Shuffle in Deck', cardsToShuffleInDeck); 
     const cardsThatBeenShuffled = shuffle(cardsToShuffleInDeck);
     console.log('Cards that has been shuffled', cardsThatBeenShuffled); 
 };

 shufflingTheDeck();
 */

 // Adding New Decks to the DOM
 // Use deck element created and move it up to the top  

 // Shuffling the cards
 // Each of the cards in the cardsThatBeenShuffled array - must be append to the deck element
 // Need to use appendChilc methed because the items in this array is ListNodes 
 // appendChild adds a specified node as a child node to its target

 function shufflingTheDeck() {
    const cardsToShuffleInDeck = Array.from(document.querySelectorAll('.deck li'));
    const cardsThatBeenShuffled = shuffle(cardsToShuffleInDeck);
    for (let card of cardsThatBeenShuffled) {
        deck.appendChild(card); 
    } 
}
shufflingTheDeck(); 

    const restart = document.querySelector('.restart');

    restart.addEventListener('click', function(event) {
        shufflingTheDeck();
    }); 


// Moves

// let moves = 0; //move to globals // each complete turn of opening both cards as 1 move 

function makingMoves() {
    moves++; // Adds a move and then change the .moves span in HTML for the scoreboard to refelect the new value
    const movingText = document.querySelector('.moves');
    movingText.innerHTML = moves; // Need to call this function within the click listener lenght conditional  
} 

// Stars
// In a HTML section with a class of score-panel with a child element ul with a class of stars  
// Determining the star score:
// Need to check the score and will use the moves variable declared in the global scope 
// Pick 2 random numbers of moves to represent the 2 star and 1 star score 
// For example if you move 16 times the 2 stars will show and 24 times the 1 star will show
// The OR logical || returns true if either value evaluates to true 
// If the conditional is true it will execute a follow up function which then removes a star

function starScore() {
    if (moves === 10 || moves === 20) {
        hidingStar();
    }
}

// Removing a Star
// Store the star elements in a variable with querySelectorAll

function hidingStar() {
    const stars = document.querySelectorAll('.stars li');
    for(let star of stars) {
        // Add a conditional to check current element display style
        // If element already display style of none - skip it - otherwise proceed to next star 
        // This will only remove a single star at a time
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }; 
    }
}

// Creating a timer 
// Create a function to start the timer 
// setTimeout : 1000ms === 1s (returns an integer value I can store and the call clearTimeOut to cancel the timeout)
// setInterval : repeatedly calls it's function between the delay 

function startClock() { 
    clockId = setInterval(function() {
        time++;
        displayTime();  
        console.log(time); 
    }, 1000); 
}

// let timerOff = true; // add to Global scope (whether the timer is on or off with a boolean value)
// let time = 0; // Need a variable to hold the incremented value of time and the set this value to 0
// Every new second we want to display the current time to the timer to the clock element in the score HTML

function displayTime() {
    const clock = document.querySelector('.clock'); 
    // console.log(clock);
    clock.innerHTML = time; 
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`; 
    } else {
        clock.innerHTML = `${minutes}:${seconds}`; 
    }  
}

// const minutes = Math.floor(time / 60); // Division operator to return how many times 60 goes into time variable
// const seconds = time % 60; // Remainder operator give what is leftover of how many times 60 goes into time
// Round off using Math method Math.floor()

// Stopping the Timer 

// Pass a clearInterval() method on the timerID

function stopClock() {
    clearInterval(clockId); 
}

// let timerID; // add to Globals 

// Create a new function to toggle the modal - this will toggle the hide class on and off 

function toggleModal() {
    const modal = document.querySelector('.modalbg'); 
    if(modal.classList.contains('hide')) {
		modal.classList.remove('hide');
	} else {
		modal.classList.add('hide');
	} 
}

 // toggleModal() // Open the modal
 // toggleModal() // Closes the model

function writeModalStats() {
    const timeStat = document.querySelector('.modal--time'); 
    const clockTime = document.querySelector('.clock').innerHTML;
    const moveStat = document.querySelector('.modal--moves');
    const starsStat = document.querySelector('.modal--stars');
    const stars = getStars();
    
    timeStat.innerHTML = `Time = ${clockTime}`; 
    moveStat.innerHTML = `Moves = ${moves}`; // set it's elements innerHTML property value to another template literal using moves 
    starsStat.innerHTML = `Stars = ${stars}`;
}

// Showing stars in modal

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0; 
    for (let star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount); // 2 
    return starCount;
}

// Modal buttons

document.querySelector('.modal--cancel').addEventListener('click', function() {
    toggleModal();
});

document.querySelector('.modal--replay').addEventListener('click', function() {
    replayGame();
});
    // query and attach an event listener that will listen for a click
    // reset the game

document.querySelector('.restart').addEventListener('click', function() {
    resetGame();
}); 

document.querySelector('.modal--replay').addEventListener('click', function() {
    resetGame();
});

// Resetting the Game

function resetGame() { 
    resetClockAndTime();
    resetMoves();
    resetStars();
    shufflingTheDeck(); 
    resetCards(); 
}

function resetClockAndTime() {
    stopClock(); // call the stopClock function
    clockOff = true; 
    time = 0;
    displayTime(); 
}

// Resetting the moves

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves; // change the score display of moves back to current value of 0 
}

// Resetting the stars

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (let star of starList) {
        star.style.display = 'inline'; 
    }
};

// Replaying the Game button

function replayGame() {
    resetGame();
    toggleModal();
    resetCards(); 
}

// Calling the Modal 

// let matched = 0; // Add to Globals

// Need to check the value after increment against what the winning number of matches would be = 16 cards / 2 so 8 pairs 
// set value to constant variable
// gameOver function will stop the clock, write the modal and toggle taht modal

function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}; 

// Resetting the cards to turn over 
// Selecting all the card elements and looping over each one and then resetting it's classes to just the card class

function resetCards() {
    const cards = document.querySelectorAll('.deck li'); 
    for (let card of cards) {
        card.className = 'card'; 
    }
};

 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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
