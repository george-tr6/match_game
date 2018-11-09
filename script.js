const cardsArray = [{
        'name': 'daisy',
        'img': 'images/Daisy_Duck.png',
    },
    {
        'name': 'donald',
        'img': 'images/Donald_Duck.png',  
    },
    {
        'name': 'goofy',
        'img': 'images/Goofy.png',  
    },
    {
        'name': 'mickey',
        'img': 'images/Mickey.png',  
    },
    {
        'name': 'minnie',
        'img': 'images/Minnie-Mouse.png',  
    },
    {
        'name': 'piglet',
        'img': 'images/Piglet.png',  
    },
    {
        'name': 'pluto',
        'img': 'images/Pluto.png',  
    },
    {
        'name': 'tigger',
        'img': 'images/Tigger.png',  
    },
    {
        'name': 'pooh',
        'img': 'images/Winnie-the-pooh.png',  
    },
];

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

let matches = 0;
let attempts = 0;
let accuracy = 0;
let games_played = 0;
let total_possible_matches = 9;
let match_counter = 0; 

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

const createCards = () => {
  const gameGrid = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());

  gameGrid.forEach(item => {
    const { name, img } = item;
  
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
  
    const front = document.createElement('div');
    front.classList.add('front');
  
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;
  
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
}

createCards();

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      attempts = attempts + 1;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {

      if (firstGuess === secondGuess) {
        matches = matches + 1;
        match_counter = match_counter + 1;
        if(match_counter === total_possible_matches){
          toggleModal();
          games_played = games_played + 1;
      }
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

  displayStats();

});



const displayStats = () => {
document.querySelector('.games-played .value').innerHTML = games_played;
document.querySelector('.attempts .value').innerHTML = attempts;
if (attempts !== 0) {
  accuracy = (matches / attempts)*100;
 }else {
  attempts = 0;
 }
document.querySelector('.accuracy .value').innerHTML = accuracy.toFixed() + '%';
}

const resetStats = () => {
  accuracy = 0;
  matches = 0;
  attempts = 0;
  match_counter = 0;
}

const resetButtonClickHandler = () => {
  games_played = games_played + 1;
  resetStats();
  displayStats();
  restartGame();
}

let button = document.getElementById("btn");
button.addEventListener("click", function(event){
  resetButtonClickHandler(event.target);
});

restartGame = () => {
  let gameGrid = document.querySelector('.grid');
  while(gameGrid.firstChild) {
    gameGrid.removeChild(gameGrid.firstChild);
  }
  createCards();
}



// Modal Section

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
