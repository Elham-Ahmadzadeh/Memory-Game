

//Global Variables

let deck = document.querySelector(".wrapper"),
  container = document.querySelector(".container"), //selecting the container which timeID is located in HTML.

  minutes = 0,
  seconds = 0,
 
  movesCount = document.getElementById("moves"), //selecting movesID in HTML
  moves = 0,
  gameStart = Date.now(); //the number of milliseconds since game started.


const restartButton = document.getElementById("restartButton"),
arrays = [
  "1",
  "1",
  "2",
  "2",
  "3",
  "3",
  "4",
  "4",
  "5",
  "5",
  "6",
  "6",
  "7",
  "7",
  "8",
  "8"
];
let front= document.getElementsByClassName('front'),
 everyCard = document.getElementsByClassName('card'),  //selecting card class of P tag which is created by Javasript
 back = document.getElementsByClassName('back'),
countUp = document.querySelector(".time");   //selecting the time in HTML

movesCount.innerHTML = 0;  // in order to moves become 0 in the browser.

let open = [], // array list for the cards that are turned (`.open`)
match = []; // array list for the pairs of cards that have the same symbol (`.match`)



function shuffle(array) {
  let currentIndex = array.length,
   temporaryValue,
   randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

  // set the time 

  let timer = function() {
    time = setInterval(function() {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      countUp.innerHTML = " Timer: " + minutes + " Min " + seconds + "sec";
    }, 1000);
  };



// set the moves.
let movesCounting = function() {
movesCount.innerHTML ++;
moves ++;
};

  /* the game starts with time counts up.clicking the first card.
  and the cards must be flipped back.moves counts  */

// Creates a shuffled deck (`.deck`)
const startMakeCards = function () {
	shuffle(arrays);
	let fragment = document.createDocumentFragment();
	arrays.forEach(function createCard(array) {
		let pi = document.createElement('p');
		pi.classList = "card";
		fragment.appendChild(pi);
		pi.innerHTML = `<number class="front">${array}</number><span class = "back"></span>`;
	});

	
	deck.appendChild(fragment);
};


// display victory message after the 16 cards are matched, with a wait of 800 milliseconds
const victory = function () {
	if (document.getElementsByClassName('match').length === 16) {
		let gameEnd = Date.now();
		//function totalGameTime () {
		let gameTime = gameEnd - gameStart;		
		//totalGameTime();
		let gameTimeTemp = gameTime /1000;
		gameTimeTemp >= 60 ? totalTime = (gameTimeTemp / 60).toFixed(2) + " minutes" : totalTime = gameTimeTemp.toFixed(0) + " seconds"; 
	
		setTimeout(function() {
			window.alert("Congratulations! You took " + totalTime + " to finish the game! " + "!\n\nPlay again?");
		}, 800);

		// if 16 cards are matching - which means the game is over - restarts game automatically, after waiting 2 seconds
		setTimeout(function() {
			restart();
		}, 2000);
	};
}


//Restart Button's function
const restart = function () {
	shuffle(arrays);
	moves = 0;
	movesCount.innerHTML = 0;
	seconds = 0;
	minutes = 0;
	timeStart = false,	
	//generate new shuffled array and restarts game
	match = [];
	open = [];
	removeCard(); // otherwise it makes dubble cards
	startMakeCards();					
	openshowcards();
};
const openshowcards = function() {
	for (let i = 0; i < everyCard.length; i++) {
		
				everyCard.item(i).addEventListener('click', function () {
					
				
			// Prevents matching the same card upon double click: checks if the open array item of index `i`, to be added in this iteration, holds the same symbol as the one provided in the previous iteration (`i - 1`). If it doesn't, then the code proceds to check if a pair of clicked cards matches the same symbol.
			if (!open.includes(everyCard.item(i))) {

				// Reveals each card on click, adding them to the `open` array list
				open.splice(0, 0, everyCard.item(i));
				open[0].classList.add("open", "show");

				if (open.length === 2) {
					
					// updates move counters each time a pair of cards is turned
					movesCounting();
					

					// checks if pair of cards have the same symbol and, if they do, adds them to the `match` array list
					if ((open[0].firstChild.outerHTML === open[1].firstChild.outerHTML)) {
						match = open.slice();
						match[0].classList.add("match");
						match[1].classList.add("match");
						open[0].classList.remove("open", "show");
						open[1].classList.remove("open", "show");
						match[0].classList.remove("open", "show");
						match[1].classList.remove("open", "show");
						open.splice(0, 2);

						// if 16 cards are matching its symbols, displays victory alert box
						victory();
					}

/*
				When a pair of cards is turned up, but their symbols are not the same, the cards are held up until the window is clicked again.	
				Also, if a single card is turned up at this point, it is turned down too, so the `game()` function iterates over and turns another card up, to see if it forms a pair of cards with the same symbol
*/
				window.addEventListener('click', function () {
					

					if (open.length > 2) {
						open[0].classList.remove("open", "show");
						open[1].classList.remove("open", "show");
						open[2].classList.remove("open", "show");
						open.splice(0, 3);
				}});
				}
			}
		});
		
	}
}
//as long as ul has a child node remove it
function removeCard() {
	while (deck.hasChildNodes()) {
		deck.removeChild(deck.firstChild)
	}
}

// calls function to create deck of shuffled cards
startMakeCards();

// runs timer function after 1 second
setTimeout(timer, 1000);

// starts the game's logic
openshowcards();

// makes the restart button work when clicked (`.restart`)
restartButton.addEventListener('click', restart) 



